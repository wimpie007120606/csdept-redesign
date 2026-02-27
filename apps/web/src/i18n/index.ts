import type { Language } from './types';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, STORAGE_KEY } from './types';

export { LanguageProvider, useLanguage } from './LanguageProvider';
export { useTranslation } from './useTranslation';
export { getNestedTranslation } from './i18n';
export type { Language, Translations } from './types';
export { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, STORAGE_KEY };

export const supportedLanguages = SUPPORTED_LANGUAGES as unknown as readonly [Language, ...Language[]];
export const defaultLanguage = DEFAULT_LANGUAGE;

/**
 * Returns the initial language: from localStorage if set, otherwise default.
 * Optionally pass navigator.language to prefer browser language on first visit (e.g. "xh" -> "xh").
 * Does not override a user's saved choice.
 */
export function getInitialLanguage(browserLang?: string): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'af' || stored === 'xh') return stored;
    if (browserLang) {
      const code = browserLang.slice(0, 2).toLowerCase();
      if (code === 'xh') return 'xh';
      if (code === 'af') return 'af';
    }
  } catch {}
  return DEFAULT_LANGUAGE;
}
