import { NextRequest, NextResponse } from "next/server";
import { generateLicense, LicenseTier } from "@/lib/licenseServer";

const ADMIN_EMAIL = "samir.akhundoff@gmail.com";
const FIREBASE_API_KEY = "AIzaSyCBhyGNzZRGgQShP_C9kwAzTm_g_0zJlzg";

// Firebase ID token-i Google-un öz xidmətində yoxlayır: yalnız təsdiqlənmiş admin e-poçtu kod yarada bilər.
async function isAdmin(idToken: unknown): Promise<boolean> {
  if (typeof idToken !== "string" || idToken.length < 20) return false;
  try {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    const user = data?.users?.[0];
    return !!user && user.email === ADMIN_EMAIL && user.emailVerified === true;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  let body: { idToken?: unknown; tier?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad-request" }, { status: 400 });
  }
  if (!(await isAdmin(body.idToken))) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const tier = body.tier;
  if (tier !== "1M" && tier !== "6M" && tier !== "1Y") return NextResponse.json({ error: "bad-tier" }, { status: 400 });
  try {
    return NextResponse.json(generateLicense(tier as LicenseTier));
  } catch {
    return NextResponse.json({ error: "not-configured" }, { status: 503 });
  }
}
