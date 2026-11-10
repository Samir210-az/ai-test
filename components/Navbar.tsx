'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import ToggleLang from './ToggleLang';
import { Suspense, useRef } from 'react';
import { useScopedI18n } from '@/locales/client';

export function Navbar() {
  const pathname = usePathname();
  const t = useScopedI18n('component.navBar');
  const router = useRouter();
  const taps = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Loqoya 5 dəfə ardıcıl toxunuş admin səhifəsini açır; tək toxunuş əvvəlki kimi anket siyahısına aparır.
  const onLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    taps.current += 1;
    if (tapTimer.current) clearTimeout(tapTimer.current);
    if (taps.current >= 5) {
      taps.current = 0;
      window.location.href = '/admin-lisenziya.html';
      return;
    }
    tapTimer.current = setTimeout(() => {
      const single = taps.current > 0;
      taps.current = 0;
      if (single) router.push('/questionnaire');
    }, 900);
  };

  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-14 px-4 max-w-6xl mx-auto">
        <div className="flex items-center">
          <Link
            href="/questionnaire"
            onClick={onLogoClick}
            className="text-lg font-medium flex items-center gap-2"
          >
            <Image
              src="/brand/an-logo.png"
              alt="AN Psixoloji Dəstək və Reabilitasiya Mərkəzi"
              width={36}
              height={27}
              className="h-9 w-auto"
              priority
            />
          </Link>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/questionnaire"
            className={`${pathname.startsWith('/questionnaire')
              ? 'font-medium'
              : 'text-muted-foreground'
              } hover:text-foreground transition-colors`}
          >
            {t('questionsList')}
          </Link>

          <Suspense fallback={<div className="w-8 h-8" />}>
            <ToggleLang />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
