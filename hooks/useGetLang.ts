import { useCurrentLocale } from '@/locales/client';

// Get current language hook - using next-international language detection
export default function useGetLang(): string {
  return useCurrentLocale();
}

// Multi-language text processing hook
export function useT() {
  const lang = useGetLang();
  // Since lang is string type, cannot directly access langObj as index, type assertion processing here
  return (langObj: { az: string; ru: string }) => {
    const safeLang: "az" | "ru" = lang === "ru" ? "ru" : "az";
    return langObj[safeLang];
  };
}

export function useHref() {
  const lang = useGetLang();

  return (href: string) => {
    return lang === 'az' ? href : `/${lang}${href}`;
  };
}
