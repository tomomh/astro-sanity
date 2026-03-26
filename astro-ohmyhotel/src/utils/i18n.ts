export const languages = ['en', 'ja', 'ko', 'vi'] as const;
export type Language = typeof languages[number];
export const defaultLang: Language = 'en';

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (languages.includes(lang as Language)) return lang as Language;
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return function t(key: string): string {
    // This will be populated with actual translations later
    // For now, return the key as fallback
    return key;
  }
}
