// Usage analytics for ai-test, reporting into the same SG Insight system
// (Firebase project an-psixoloji-33442, path menyu_analytics/events)
// already used across Samir's other ~37 repos, viewable in the existing
// hidden dashboard (sg-insight-x92q.html in Samir210-az/menyu). This lets
// ai-test's traffic and test completions show up alongside everything
// else instead of needing a brand new dashboard.
//
// Implemented via plain Firebase REST calls (Auth REST API + Realtime
// Database REST API) rather than the firebase npm SDK, to avoid adding a
// new dependency/bundle weight for what other integrations do with a
// handful of fetch() calls.

const FIREBASE_API_KEY = 'AIzaSyCBhyGNzZRGgQShP_C9kwAzTm_g_0zJlzg';
const DATABASE_URL = 'https://an-psixoloji-33442-default-rtdb.firebaseio.com';
const PROJECT_NAME = 'ai-test (AN)';
const SID_KEY = 'sg_sid_v1';

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sid = localStorage.getItem(SID_KEY);
  if (!sid) {
    sid = 's_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(SID_KEY, sid);
  }
  return sid;
}

interface Geo {
  ip: string;
  city: string;
  region: string;
  country: string;
}

let geoCache: Geo | null = null;
async function getGeo(): Promise<Geo> {
  if (geoCache) return geoCache;
  try {
    const res = await fetch('https://ipwho.is/');
    const data = await res.json();
    if (data && data.success !== false) {
      geoCache = {
        ip: data.ip || 'naməlum',
        city: data.city || '',
        region: data.region || '',
        country: data.country || '',
      };
    }
  } catch {
    geoCache = { ip: 'naməlum', city: '', region: '', country: '' };
  }
  return geoCache || { ip: 'naməlum', city: '', region: '', country: '' };
}

// Anonymous sign-in via the Identity Toolkit REST API (equivalent to the
// SDK's signInAnonymously). Cached so we only authenticate once per page
// load, regardless of how many events fire afterwards.
let authTokenPromise: Promise<string | null> | null = null;
function ensureAuthToken(): Promise<string | null> {
  if (!authTokenPromise) {
    authTokenPromise = fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ returnSecureToken: true }),
      }
    )
      .then((res) => res.json())
      .then((data) => (typeof data.idToken === 'string' ? data.idToken : null))
      .catch(() => null);
  }
  return authTokenPromise;
}

export async function sgTrackEvent(type: string, data: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  try {
    const token = await ensureAuthToken();
    if (!token) return;
    const geo = await getGeo();
    const payload = {
      type,
      source: PROJECT_NAME,
      data,
      sid: getSessionId(),
      ip: geo.ip,
      city: geo.city,
      region: geo.region,
      country: geo.country,
      ua: navigator.userAgent,
      lang: navigator.language,
      screen: window.screen ? `${window.screen.width}x${window.screen.height}` : '',
      ts: Date.now(),
      tsHuman: new Date().toISOString(),
    };
    await fetch(`${DATABASE_URL}/menyu_analytics/events.json?auth=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Silent - analytics must never affect the actual user experience.
  }
}

export function sgTrackPageView(path: string) {
  void sgTrackEvent('page_view', { path });
}

// Fired once per completed assessment, final score/severity only - no
// per-question data, matching how the other 37 repos report test results.
export function sgTrackTest(testName: string, result: string) {
  void sgTrackEvent('test_result', { test: testName, result });
}
