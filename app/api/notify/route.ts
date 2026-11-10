import { NextRequest, NextResponse } from "next/server";
import { notifyTelegram } from "@/lib/licenseServer";

const ALLOWED_ORIGINS = [
  "https://samir210-az.github.io",
  "https://hazirliq.aze-ai.az",
  "https://neuro.aze-ai.az",
];
const TOOLS: Record<string, string> = {
  hazirliq: "Məktəbə Hazırlıq",
  neurocbt: "NeuroCBT",
};
const MAX_TEXT = 600;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

function cors(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function limited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin") || "";
  return new NextResponse(null, {
    status: 204,
    headers: ALLOWED_ORIGINS.includes(origin) ? cors(origin) : {},
  });
}

// POST { tool, text } → Telegram bildirişi (token yalnız serverdə saxlanılır)
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin") || "";
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }
  const headers = cors(origin);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "-";
  if (limited(ip)) return NextResponse.json({ ok: false }, { status: 429, headers });

  let body: { tool?: unknown; text?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400, headers });
  }
  const label = typeof body.tool === "string" ? TOOLS[body.tool] : undefined;
  if (!label || typeof body.text !== "string" || !body.text.trim()) {
    return NextResponse.json({ ok: false }, { status: 400, headers });
  }
  await notifyTelegram(`${label}\n${body.text.trim().slice(0, MAX_TEXT)}`);
  return NextResponse.json({ ok: true }, { headers });
}
