import { useLanguage } from './LanguageProvider';

/**
 * useTranslation hook — returns t(keyPath), language, and setLanguage.
 * Use nested keys like "nav.home" or "home.welcomeTitle".
 * Falls back to English if the key is missing in the current language.
 */
export function useTranslation() {
  const { t, language, setLanguage } = useLanguage();
  return { t, language, setLanguage };
}
