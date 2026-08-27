export type LangObj = 'az' | 'ru';

export function getLang(language?: string): LangObj {
    let lang: LangObj = 'az';
    if (language && ['az', 'ru'].includes(language)) {
        lang = language as 'az' | 'ru';
    }

    if (typeof window !== 'undefined') {
        const pathname = window.location.pathname || "";
        lang = pathname.startsWith('/ru') ? 'ru' : 'az';
    }
    return lang;
}

export default function getT(language?: string) {
    const lang = getLang(language);
    return (langObj: { az: string; ru: string }) => langObj[lang];
}

export function getHref(language?: string) {
    const lang = getLang(language);
    return (href: string) => lang === 'az' ? href : `/${lang}${href}`;
}
