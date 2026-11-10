import { NextRequest, NextResponse } from "next/server";
import { verifyLicense, notifyTelegram, checkBinding, isLifetime } from "@/lib/licenseServer";

const ALLOWED_ORIGINS = ["https://samir210-az.github.io"];

function corsHeaders(request: NextRequest): Record<string, string> {
  const origin = request.headers.get("origin");
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request) });
}

const TIER_LABELS = { "1M": "1 Ay", "6M": "6 Ay", "1Y": "1 İl" } as const;

// POST { code, phone, activate? } → { valid, expiry?, tier?, reason? }
// Kod serverdə yoxlanır və ilk aktivləşdirmədə telefon nömrəsinə bağlanır.
export async function POST(request: NextRequest) {
  const headers = corsHeaders(request);
  let body: { code?: unknown; phone?: unknown; activate?: unknown; product?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ valid: false }, { status: 400, headers });
  }
  const result = verifyLicense(body.code);
  if (!result.valid) return NextResponse.json({ valid: false }, { headers });
  const code = String(body.code).trim().toUpperCase();

  if (!isLifetime(result)) {
    const bind = await checkBinding(code, body.phone, body.activate === true, { tier: result.tier, expiry: result.expiry });
    if (bind === "mismatch") return NextResponse.json({ valid: false, reason: "phone" }, { headers });
    if (bind === "error") return NextResponse.json({ valid: false, reason: "server" }, { status: 503, headers });
    if (bind === "new") {
      const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 30) : "-";
      const expiry = result.expiry ? new Date(result.expiry).toLocaleDateString("az-AZ") : "-";
      await notifyTelegram(
        `🔑 Lisenziya aktivləşdirildi — ${body.product === "cbt1" ? "Cbt1" : "ai-test (AN)"}\nKod: ${code}\nMüddət: ${result.tier ? TIER_LABELS[result.tier] : "-"}\nBitmə tarixi: ${expiry}\nTelefon: ${phone}`
      );
    }
  }
  return NextResponse.json(result, { headers });
}
