export type Language = 'en' | 'af';

export const DEFAULT_LANGUAGE: Language = 'en';

export const STORAGE_KEY = 'csdept-lang';

export type Translations = Record<string, string | Record<string, unknown>>;
