import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ locale: string }>;
}

// The homepage is the questionnaire list — there is no separate marketing/landing page.
export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  redirect(locale === 'az' ? '/questionnaire' : `/${locale}/questionnaire`);
}
