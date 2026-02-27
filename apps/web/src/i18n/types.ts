export type Language = 'en' | 'af' | 'xh';

export const DEFAULT_LANGUAGE: Language = 'en';

export const SUPPORTED_LANGUAGES: readonly Language[] = ['en', 'af', 'xh'] as const;

export const STORAGE_KEY = 'csdept-lang';

export type Translations = Record<string, string | Record<string, unknown>>;
