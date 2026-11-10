import { ImageResponse } from 'next/og';
import { NextRequest, NextResponse } from 'next/server';
import { getPwaInfo } from '@/lib/pwa';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const info = getPwaInfo(id);
  if (!info) return new NextResponse('Not found', { status: 404 });

  const sp = req.nextUrl.searchParams;
  const size = Math.min(Math.max(parseInt(sp.get('size') || '192', 10) || 192, 48), 512);
  const maskable = sp.get('maskable') === '1';

  const isApp = info.id === 'app';
  const lines = info.shortName.split(' ');
  const longest = Math.max(...lines.map((l) => l.length));
  const usable = size * (maskable ? 0.56 : 0.8);
  const fontSize = Math.min(size * (lines.length > 1 ? 0.3 : 0.34), usable / (longest * 0.62));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #0A1830 0%, #2B5EA8 100%)',
          color: '#ffffff',
          borderRadius: maskable ? 0 : size * 0.2,
        }}
      >
        {lines.map((line) => (
          <div key={line} style={{ fontSize, fontWeight: 800, letterSpacing: -1, display: 'flex', lineHeight: 1.1 }}>
            {line}
          </div>
        ))}
        {!isApp && (
          <div
            style={{
              display: 'flex',
              marginTop: size * 0.04,
              fontSize: size * 0.11,
              fontWeight: 700,
              color: '#7EC8FF',
              letterSpacing: size * 0.01,
            }}
          >
            AN
          </div>
        )}
      </div>
    ),
    {
      width: size,
      height: size,
      headers: { 'Cache-Control': 'public, max-age=86400' },
    },
  );
}
