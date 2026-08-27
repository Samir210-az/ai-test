import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest, NextResponse } from "next/server";

const I18nMiddleware = createI18nMiddleware({
    locales: ["az", "ru"],
    defaultLocale: "az",
    urlMappingStrategy: "rewrite",
    // Always default to Azerbaijani for first-time visitors, regardless of
    // their browser/OS language (Accept-Language). Russian remains available
    // as an explicit choice via the language switcher, which sets a
    // Next-Locale cookie that this resolver is skipped for on later visits.
    resolveLocaleFromRequest: () => "az",
});

export function middleware(request: NextRequest) {
    // Skip i18n processing for SEO-related files, PWA manifest, service worker,
    // app icons, and static brand assets (logos etc. under /brand/, served
    // directly and referenced by next/image, which resolves them via an
    // internal request that must not be locale-rewritten)
    if (
        request.nextUrl.pathname === '/sitemap.xml' ||
        request.nextUrl.pathname === '/robots.txt' ||
        request.nextUrl.pathname === '/manifest.json' ||
        request.nextUrl.pathname === '/sw.js' ||
        request.nextUrl.pathname === '/apple-icon.png' ||
        request.nextUrl.pathname === '/icon0.svg' ||
        request.nextUrl.pathname === '/icon1.png' ||
        request.nextUrl.pathname.startsWith('/brand/')
    ) {
        return NextResponse.next();
    }

    // Create a special path prefix /share/ to bypass language routing
    if (request.nextUrl.pathname.startsWith('/share/')) {
        // Redirect request to actual static resource location
        const newPath = request.nextUrl.pathname.replace('/share', '');
        return NextResponse.rewrite(new URL(newPath, request.url));
    }

    return I18nMiddleware(request);
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap\\.xml|robots\\.txt|manifest\\.json|sw\\.js|apple-icon\\.png|icon0\\.svg|icon1\\.png|brand/).*)",
        "/share/:path*"
    ],
};
