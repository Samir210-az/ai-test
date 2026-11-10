import { NextRequest, NextResponse } from "next/server";
import { verifyLicense, notifyTelegram } from "@/lib/licenseServer";

const TIER_LABELS = { "1M": "1 Ay", "6M": "6 Ay", "1Y": "1 İl" } as const;

// POST { code, phone?, activate? } → { valid, expiry?, tier? }
// Kodun yoxlanması yalnız serverdədir; aktivləşdirmə bildirişi də buradan gedir.
export async function POST(request: NextRequest) {
  let body: { code?: unknown; phone?: unknown; activate?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 });
  }
  const result = verifyLicense(body.code);
  if (result.valid && body.activate === true) {
    const phone = typeof body.phone === "string" && body.phone.trim() ? body.phone.trim().slice(0, 30) : "göstərilməyib";
    const expiry = result.expiry ? new Date(result.expiry).toLocaleDateString("az-AZ") : "-";
    await notifyTelegram(
      `🔑 Lisenziya aktivləşdirildi — ai-test (AN)\nKod: ${String(body.code).trim().toUpperCase()}\nMüddət: ${result.tier ? TIER_LABELS[result.tier] : "-"}\nBitmə tarixi: ${expiry}\nTelefon: ${phone}`
    );
  }
  return NextResponse.json(result);
}
