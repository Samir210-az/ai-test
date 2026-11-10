import { NextResponse } from 'next/server';
import { getPwaInfo } from '@/lib/pwa';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const info = getPwaInfo(id);
  if (!info) return new NextResponse('Not found', { status: 404 });

  const isApp = info.id === 'app';

  const icon = (size: number, maskable: boolean) => ({
    src: `/api/pwa/${info.id}/icon?size=${size}${maskable ? '&maskable=1' : ''}`,
    sizes: `${size}x${size}`,
    type: 'image/png',
    purpose: maskable ? 'maskable' : 'any',
  });

  const manifest = {
    id: isApp ? '/' : `/questionnaire/${info.id}`,
    name: info.title,
    short_name: info.shortName,
    description: info.title,
    lang: 'az',
    start_url: isApp ? '/' : `/questionnaire/${info.id}`,
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    theme_color: '#2B5EA8',
    background_color: '#0A1830',
    icons: [icon(192, false), icon(512, false), icon(512, true)],
  };

  return new NextResponse(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
