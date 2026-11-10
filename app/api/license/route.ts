import { NextRequest, NextResponse } from "next/server";
import { verifyLicense, notifyTelegram, checkBinding, isLifetime } from "@/lib/licenseServer";

const TIER_LABELS = { "1M": "1 Ay", "6M": "6 Ay", "1Y": "1 İl" } as const;

// POST { code, phone, activate? } → { valid, expiry?, tier?, reason? }
// Kod serverdə yoxlanır və ilk aktivləşdirmədə telefon nömrəsinə bağlanır.
export async function POST(request: NextRequest) {
  let body: { code?: unknown; phone?: unknown; activate?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 });
  }
  const result = verifyLicense(body.code);
  if (!result.valid) return NextResponse.json({ valid: false });
  const code = String(body.code).trim().toUpperCase();

  if (!isLifetime(result)) {
    const bind = await checkBinding(code, body.phone, body.activate === true, { tier: result.tier, expiry: result.expiry });
    if (bind === "mismatch") return NextResponse.json({ valid: false, reason: "phone" });
    if (bind === "error") return NextResponse.json({ valid: false, reason: "server" }, { status: 503 });
    if (bind === "new") {
      const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 30) : "-";
      const expiry = result.expiry ? new Date(result.expiry).toLocaleDateString("az-AZ") : "-";
      await notifyTelegram(
        `🔑 Lisenziya aktivləşdirildi — ai-test (AN)\nKod: ${code}\nMüddət: ${result.tier ? TIER_LABELS[result.tier] : "-"}\nBitmə tarixi: ${expiry}\nTelefon: ${phone}`
      );
    }
  }
  return NextResponse.json(result);
}
