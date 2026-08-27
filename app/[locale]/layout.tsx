import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { I18nProviderClient } from '@/locales/client';
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const SITE_URL = 'https://ai-test-az.vercel.app';

export const metadata: Metadata = {
  title: 'LXScale - Pulsuz Psixi Sağlamlıq Qiymətləndirmə Vasitələri | Peşəkar Psixoloji Şkalalar',
  description: 'Pulsuz, peşəkar psixi sağlamlıq qiymətləndirmə platforması. Depressiya şkalaları (PHQ-9, BDI-II, SDS), narahatlıq şkalaları (GAD-7, DASS-21), OKB şkalası (Y-BOCS), yuxu şkalası (ISI), stress şkalası (PSS-10) və psixoloji simptom şkalası (SCL-90) daxildir.',
  keywords: [
    'psixi sağlamlıq', 'depressiya şkalası', 'narahatlıq şkalası', 'psixoloji qiymətləndirmə',
    'pulsuz psixi sağlamlıq testi', 'onlayn psixoloji qiymətləndirmə',
    'PHQ-9', 'BDI-II', 'SDS', 'GAD-7', 'DASS-21', 'Y-BOCS', 'SCL-90', 'ISI', 'PSS-10',
    'depressiya skrininqi', 'narahatlıq skrininqi', 'OKB qiymətləndirməsi', 'yuxu keyfiyyəti', 'stress testi',
    'психическое здоровье', 'психологические шкалы', 'тест на депрессию', 'тест на тревожность'
  ].join(', '),
  authors: [{ name: 'LXScale Team' }],
  creator: 'LXScale',
  publisher: 'LXScale',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
    languages: {
      'az': '/',
      'az-AZ': '/',
      'ru': '/ru',
      'ru-RU': '/ru',
      'x-default': '/',
    },
  },
  openGraph: {
    title: 'LXScale - Pulsuz Psixi Sağlamlıq Qiymətləndirmə Vasitələri',
    description: 'Peşəkar psixoloji qiymətləndirmə platforması. Pulsuz depressiya, narahatlıq, OKB və stress testləri. Nəticələri dərhal alın.',
    url: SITE_URL,
    siteName: 'LXScale',
    locale: 'az_AZ',
    type: 'website',
    images: [
      {
        url: '/apple-icon.png',
        width: 180,
        height: 180,
        alt: 'LXScale - Pulsuz Psixi Sağlamlıq Qiymətləndirmə Platforması',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LXScale - Pulsuz Psixi Sağlamlıq Qiymətləndirmə Vasitələri',
    description: 'Peşəkar psixoloji şkalalar | Dərhal nəticələr | Tamamilə pulsuz — indi başlayın!',
    images: {
      url: '/apple-icon.png',
      alt: 'LXScale - Pulsuz Psixi Sağlamlıq Qiymətləndirmə Platforması',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID,
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LXScale',
    description: 'Pulsuz, peşəkar psixi sağlamlıq qiymətləndirmə platforması',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/questionnaire?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'LXScale',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`
      }
    },
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="apple-mobile-web-app-title" content="LXScale" />

        {/* Additional social media optimization */}
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="180" />
        <meta property="og:image:height" content="180" />

        <link rel="alternate" hrefLang="az" href={SITE_URL} />
        <link rel="alternate" hrefLang="ru" href={`${SITE_URL}/ru`} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProviderClient locale={locale}>
          <Navbar />
          <main>{children}</main>
        </I18nProviderClient>
        <Toaster />

        {/* TODO: öz Google Analytics ID-ni əlavə et */}
      </body>
    </html>
  );
}
