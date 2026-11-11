import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { NextRequest, NextResponse } from 'next/server';
import { getPwaInfo } from '@/lib/pwa';

const fontPromise = readFile(join(process.cwd(), 'lib', 'fonts', 'Inter-ExtraBold.otf')).then(
  (buf) => buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer,
);

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
  const title = info.shortName;
  const subtitle = isApp ? 'Anketlər' : 'AI TEST';
  const k = maskable ? 0.74 : 1;
  const fontSize = Math.min(size * 0.215 * k, (size * 0.8 * k) / (title.length * 0.66));
  const radius = maskable ? 0 : size * 0.3;
  const lip = size * 0.035;
  const font = await fontPromise;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          borderRadius: radius,
          background: 'linear-gradient(180deg, #7A3366 0%, #4E1F42 100%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: maskable ? 0 : lip,
            borderRadius: radius,
            background: 'linear-gradient(180deg, #B0629A 0%, #8E4278 55%, #763363 100%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: size * 0.07,
            left: size * 0.07,
            width: size * 0.86,
            height: size * 0.86,
            borderRadius: size * 0.43,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 100%)',
            border: `${Math.max(1, size * 0.006)}px solid rgba(255,255,255,0.10)`,
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: lip,
            fontFamily: 'Inter',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize,
              fontWeight: 800,
              color: '#E8E8EA',
              letterSpacing: -fontSize * 0.02,
              lineHeight: 1,
              textShadow: `0 ${size * 0.014}px 0 rgba(40,10,32,0.55), 0 ${size * 0.03}px ${size * 0.03}px rgba(0,0,0,0.25)`,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: size * 0.05 * k,
              padding: `${size * 0.014}px ${size * 0.055}px`,
              borderRadius: size * 0.06,
              background: 'rgba(236,222,232,0.88)',
              color: '#5A2349',
              fontSize: size * 0.066 * k,
              fontWeight: 800,
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: [{ name: 'Inter', data: font, weight: 800, style: 'normal' }],
      headers: { 'Cache-Control': 'public, max-age=86400' },
    },
  );
}
