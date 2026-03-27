export const languages = ['en', 'ja', 'ko', 'vi'] as const;
export type Language = typeof languages[number];
export const defaultLang: Language = 'en';

export function getLangFromUrl(url: URL): Language {
  // Get language from ?hl= query param
  const hlParam = url.searchParams.get('hl');
  if (hlParam && languages.includes(hlParam as Language)) {
    return hlParam as Language;
  }
  return defaultLang;
}

export function buildUrlWithLang(pathname: string, lang: Language): string {
  // Build URL with ?hl= query param (omit for default language)
  if (lang === defaultLang) {
    return pathname;
  }
  return `${pathname}?hl=${lang}`;
}

export function useTranslations(lang: Language) {
  return function t(key: string): string {
    // This will be populated with actual translations later
    // For now, return the key as fallback
    return key;
  }
}
