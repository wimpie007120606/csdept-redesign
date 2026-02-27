import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Language } from './types';
import { DEFAULT_LANGUAGE, STORAGE_KEY } from './types';
import { getNestedTranslation } from './i18n';

// Import JSON translations (Vite supports JSON import)
import en from './en.json';
import af from './af.json';
import xh from './xh.json';

const dictionaries: Record<Language, Record<string, unknown>> = { en, af, xh };

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (keyPath: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'af' || stored === 'xh') return stored;
  } catch {}
  return DEFAULT_LANGUAGE;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() =>
    typeof window !== 'undefined' ? readStoredLanguage() : DEFAULT_LANGUAGE
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'af' ? 'af' : lang === 'xh' ? 'xh' : 'en';
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = language === 'af' ? 'af' : language === 'xh' ? 'xh' : 'en';
  }, [language, mounted]);

  const t = useCallback(
    (keyPath: string): string => {
      const dict = dictionaries[language] as Record<string, unknown>;
      const fallback = dictionaries.en as Record<string, unknown>;
      return getNestedTranslation(
        dict as Record<string, string | Record<string, unknown>>,
        keyPath,
        fallback as Record<string, string | Record<string, unknown>>
      );
    },
    [language]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
