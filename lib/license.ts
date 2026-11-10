// Client-side license verification for the ai-test platform.
//
// Mirrors the code format already used by the Cbt1 license generator
// (github.com/Samir210-az/lisenziya) - LIC-{TIER}-{expiryDayBase36}-{checksum} -
// but with a distinct salt so codes are not interchangeable between
// products. As with Cbt1, this is intentionally NOT real security: there
// is no backend and no per-device binding, it only deters casual
// guessing/sharing. A valid code, once entered, is stored in
// localStorage and unlocks the whole platform until it expires.

import { sgTrackEvent } from './sgAnalytics';

export type LicenseTier = '1M' | '6M' | '1Y';

const STORAGE_KEY = 'an_ai_test_license';

export interface LicenseStatus {
  valid: boolean;
  expiryDate?: Date;
  tier?: LicenseTier;
}

const TIER_LABELS: Record<LicenseTier, string> = {
  '1M': '1 Ay',
  '6M': '6 Ay',
  '1Y': '1 İl',
};

// Kod artıq brauzerdə yox, serverdə (/api/license) yoxlanır — gizli açar heç vaxt brauzerə gəlmir.
async function checkOnServer(code: string, phone?: string, activate = false): Promise<{ valid: boolean; expiry?: number; tier?: LicenseTier }> {
  try {
    const res = await fetch('/api/license', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, phone, activate }),
    });
    if (!res.ok) return { valid: false };
    return await res.json();
  } catch {
    return { valid: false };
  }
}

export function getStoredLicenseCode(): string {
  if (typeof window === 'undefined') return '';
  const stored = localStorage.getItem(STORAGE_KEY) || '';
  try {
    const parsed = JSON.parse(stored);
    if (parsed && typeof parsed.code === 'string') return parsed.code;
  } catch {
    /* köhnə format: yalnız kodun özü saxlanırdı */
  }
  return stored;
}

// Saxlanmış kodu serverdə yoxlayır (bitmə tarixi və etibarlılıq).
export async function getStoredLicenseStatus(): Promise<LicenseStatus> {
  const code = getStoredLicenseCode();
  if (!code) return { valid: false };
  const r = await checkOnServer(code);
  if (!r.valid) return { valid: false };
  return { valid: true, expiryDate: r.expiry ? new Date(r.expiry) : undefined, tier: r.tier };
}

// phone is whatever the customer typed into the activation form - stored
// nowhere except the activation notification/log, purely so Samir can match an
// activation back to who paid for it.
export async function activateLicenseCode(rawCode: string, phone: string): Promise<LicenseStatus> {
  const code = rawCode.trim().toUpperCase();
  const r = await checkOnServer(code, phone, true);
  if (!r.valid || typeof window === 'undefined') return { valid: false };
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ code, expiry: r.expiry, tier: r.tier }));
  const expiry = r.expiry ? new Date(r.expiry).toLocaleDateString('az-AZ') : '-';
  const tierLabel = r.tier ? TIER_LABELS[r.tier] : '-';
  void sgTrackEvent('license_activated', {
    code,
    tier: tierLabel,
    expiry,
    phone: phone.trim() || 'göstərilməyib',
  });
  return { valid: true, expiryDate: r.expiry ? new Date(r.expiry) : undefined, tier: r.tier };
}
