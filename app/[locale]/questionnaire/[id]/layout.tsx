import type { Metadata } from 'next';
import { getPwaInfo } from '@/lib/pwa';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const info = getPwaInfo(id);
  if (!info) return {};

  return {
    manifest: `/api/pwa/${info.id}/manifest`,
    icons: {
      icon: [{ url: `/api/pwa/${info.id}/icon?size=192`, sizes: '192x192', type: 'image/png' }],
      apple: [{ url: `/api/pwa/${info.id}/icon?size=180`, sizes: '180x180', type: 'image/png' }],
    },
    appleWebApp: { capable: true, title: info.shortName },
  };
}

export default function QuestionnaireLayout({ children }: { children: React.ReactNode }) {
  return children;
}
