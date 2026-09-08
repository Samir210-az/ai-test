'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { sgTrackPageView } from '@/lib/sgAnalytics';

// Renders nothing - just reports each route change to SG Insight so
// ai-test's traffic shows up in the existing cross-project dashboard.
export function SgAnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    sgTrackPageView(pathname);
  }, [pathname]);

  return null;
}
