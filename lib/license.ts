// Client-side license verification for the ai-test platform.
//
// Mirrors the code format already used by the Cbt1 license generator
// (github.com/Samir210-az/lisenziya) - LIC-{TIER}-{expiryDayBase36}-{checksum} -
// but with a distinct salt so codes are not interchangeable between
// products. As with Cbt1, this is intentionally NOT real security: there
// is no backend and no per-device binding, it only deters casual
// guessing/sharing. A valid code, once entered, is stored in
// localStorage and unlocks the whole platform until it expires.

export type LicenseTier = '1M' | '6M' | '1Y';

const SALT = 'AN-AITEST-2026';
const STORAGE_KEY = 'an_ai_test_license';

export interface LicenseStatus {
  valid: boolean;
  expiryDate?: Date;
  tier?: LicenseTier;
}

// Same notification bot Samir already uses across his other projects
// (Toy, Əmlak CRM, Repetitor CRM, etc.) - fire-and-forget, no backend.
function notifyTelegram(text: string) {
  const token = '8936900898:AAG4_jlATIsIPe4fbk8U5iOJAKK08hQtK_o';
  const chatId = '1315001188';
  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  }).catch(() => {});
}

const TIER_LABELS: Record<LicenseTier, string> = {
  '1M': '1 Ay',
  '6M': '6 Ay',
  '1Y': '1 İl',
};

function computeChecksum(tier: string, expiryDay: number): string {
  const str = `${tier}-${expiryDay}-${SALT}`;
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum = (sum * 31 + str.charCodeAt(i)) >>> 0;
  }
  return sum.toString(36).toUpperCase().padStart(4, '0').slice(-4);
}

function isTier(value: string): value is LicenseTier {
  return value === '1M' || value === '6M' || value === '1Y';
}

export function verifyLicenseCode(rawCode: string): LicenseStatus {
  const code = rawCode.trim().toUpperCase();
  const parts = code.split('-');
  if (parts.length !== 4 || parts[0] !== 'LIC') return { valid: false };

  const [, tier, expiryDayB36, checksum] = parts;
  if (!isTier(tier)) return { valid: false };

  const expiryDay = parseInt(expiryDayB36, 36);
  if (!Number.isFinite(expiryDay)) return { valid: false };
  if (computeChecksum(tier, expiryDay) !== checksum) return { valid: false };

  const today = Math.floor(Date.now() / 86400000);
  return {
    valid: today <= expiryDay,
    expiryDate: new Date(expiryDay * 86400000),
    tier,
  };
}

export function getStoredLicenseStatus(): LicenseStatus {
  if (typeof window === 'undefined') return { valid: false };
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return { valid: false };
  return verifyLicenseCode(stored);
}

// Verifies and, if valid, persists the code so future visits stay unlocked.
export function activateLicenseCode(rawCode: string): LicenseStatus {
  const result = verifyLicenseCode(rawCode);
  if (result.valid && typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, rawCode.trim().toUpperCase());
    const expiry = result.expiryDate?.toLocaleDateString('az-AZ') ?? '-';
    const tierLabel = result.tier ? TIER_LABELS[result.tier] : '-';
    notifyTelegram(
      `🔑 Lisenziya aktivləşdirildi — ai-test (AN)\nKod: ${rawCode.trim().toUpperCase()}\nMüddət: ${tierLabel}\nBitmə tarixi: ${expiry}`
    );
  }
  return result;
}
