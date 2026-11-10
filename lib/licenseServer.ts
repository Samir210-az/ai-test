// Server-only license logic. The salt lives in a Vercel environment variable
// (LICENSE_SALT) and never reaches the browser, so codes cannot be minted
// from the client bundle anymore.

import { createHash } from 'crypto';

export type LicenseTier = '1M' | '6M' | '1Y';
export const DURATIONS: Record<LicenseTier, number> = { '1M': 30, '6M': 182, '1Y': 365 };

// Codes issued by the old public generator used this salt. They stay valid
// only until LEGACY_LICENSE_UNTIL (YYYY-MM-DD) so existing customers have time
// to receive a new code; after that date only LICENSE_SALT codes work.
const LEGACY_SALT = 'AN-AITEST-2026';
const LEGACY_UNTIL = process.env.LEGACY_LICENSE_UNTIL || '2026-12-31';

function checksum(tier: string, expiryDay: number, salt: string): string {
  const str = `${tier}-${expiryDay}-${salt}`;
  let sum = 0;
  for (let i = 0; i < str.length; i++) sum = (sum * 31 + str.charCodeAt(i)) >>> 0;
  return sum.toString(36).toUpperCase().padStart(4, '0').slice(-4);
}

function isTier(v: string): v is LicenseTier {
  return v === '1M' || v === '6M' || v === '1Y';
}

export interface VerifiedLicense {
  valid: boolean;
  expiry?: number; // ms timestamp
  tier?: LicenseTier;
}

export function verifyLicense(raw: unknown): VerifiedLicense {
  if (typeof raw !== 'string' || raw.length > 40) return { valid: false };
  const parts = raw.trim().toUpperCase().split('-');
  if (parts[0] !== 'LIC' || (parts.length !== 4 && parts.length !== 5)) return { valid: false };
  // Yeni format: LIC-{tier}-{gün}-{təsadüfi}-{yoxlama} — hər kod unikaldır.
  if (parts.length === 5) {
    const [, t5, d5, rnd, sum5] = parts;
    const salt5 = process.env.LICENSE_SALT;
    if (!salt5 || !isTier(t5) || !/^[0-9A-Z]{4}$/.test(rnd)) return { valid: false };
    const day5 = parseInt(d5, 36);
    if (!Number.isFinite(day5) || checksum(`${t5}-${rnd}`, day5, salt5) !== sum5) return { valid: false };
    return { valid: Math.floor(Date.now() / 86400000) <= day5, expiry: day5 * 86400000, tier: t5 };
  }
  const [, tier, dayB36, sum] = parts;
  if (!isTier(tier)) return { valid: false };
  const expiryDay = parseInt(dayB36, 36);
  if (!Number.isFinite(expiryDay)) return { valid: false };

  const salt = process.env.LICENSE_SALT;
  const today = Math.floor(Date.now() / 86400000);
  const matchesNew = !!salt && checksum(tier, expiryDay, salt) === sum;
  const legacyOpen = new Date().toISOString().slice(0, 10) <= LEGACY_UNTIL;
  const matchesLegacy = legacyOpen && checksum(tier, expiryDay, LEGACY_SALT) === sum;
  if (!matchesNew && !matchesLegacy) return { valid: false };
  return { valid: today <= expiryDay, expiry: expiryDay * 86400000, tier };
}

// lifetime=true: yalnız admin üçün, 100 illik kod (format eynidir, server onu adi kod kimi tanıyır)
export function generateLicense(tier: LicenseTier, lifetime = false): { code: string; expiry: number } {
  const salt = process.env.LICENSE_SALT;
  if (!salt) throw new Error('LICENSE_SALT is not configured');
  const day = Math.floor(Date.now() / 86400000) + (lifetime ? 36500 : DURATIONS[tier]);
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  const rnd = Array.from(bytes, (b) => '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'[b % 36]).join('');
  return { code: `LIC-${tier}-${day.toString(36).toUpperCase()}-${rnd}-${checksum(`${tier}-${rnd}`, day, salt)}`, expiry: day * 86400000 };
}

export async function notifyTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch {
    /* bildiriş alınmasa da aktivləşdirmə dayanmır */
  }
}

// ---- Kodun telefona bağlanması ----
// Kod ilk aktivləşdirildiyi nömrəyə bağlanır; sonra yalnız həmin nömrə ilə işləyir.
// Qeyd Firebase-də ai_test_licenses/{hash} altında saxlanır; açar kodun və gizli açarın
// hash-idir, ona görə kodu bilməyən heç kim qeydi tapa və ya əvvəlcədən yarada bilməz.
const DB_URL = 'https://an-psixoloji-33442-default-rtdb.firebaseio.com';

export function normalizePhone(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  let d = raw.replace(/[^0-9]/g, '');
  if (d.startsWith('00')) d = d.slice(2);
  if (d.startsWith('994')) d = d.slice(3);
  if (d.startsWith('0')) d = d.slice(1);
  return /^[0-9]{9}$/.test(d) ? '994' + d : (d.length >= 7 && d.length <= 15 ? d : null);
}

function bindingKey(code: string): string {
  return createHash('sha256').update(`${process.env.LICENSE_SALT || ''}|${code.trim().toUpperCase()}`).digest('hex');
}

export function isLifetime(v: VerifiedLicense): boolean {
  return !!v.expiry && v.expiry - Date.now() > 20 * 365 * 86400000;
}

export type BindResult = 'ok' | 'new' | 'mismatch' | 'error';

// activate=true olanda qeyd yoxdursa yaradılır; yoxdursa və activate=false-dursa rədd edilir.
export async function checkBinding(code: string, phoneRaw: unknown, activate: boolean, meta?: { tier?: string; expiry?: number }): Promise<BindResult> {
  const phone = normalizePhone(phoneRaw);
  if (!phone) return 'mismatch';
  const url = `${DB_URL}/ai_test_licenses/${bindingKey(code)}.json`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return 'error';
    const rec = await res.json();
    if (rec && typeof rec.phone === 'string') return rec.phone === phone ? 'ok' : 'mismatch';
    if (!activate) return 'mismatch';
    const put = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone, ts: Date.now(), code: code.trim().toUpperCase(), tier: meta?.tier || null, expiry: meta?.expiry || null }) });
    if (put.ok) return 'new';
    // Eyni anda başqası bağlayıbsa, yenidən oxu
    const again = await (await fetch(url, { cache: 'no-store' })).json();
    return again && again.phone === phone ? 'ok' : 'mismatch';
  } catch {
    return 'error';
  }
}
