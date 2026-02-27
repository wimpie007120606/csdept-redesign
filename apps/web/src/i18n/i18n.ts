import type { Translations } from './types';

/**
 * Get nested value by dot path (e.g. "nav.home").
 * Falls back to fallbackDict (e.g. English) if key missing in current dict; never throws.
 */
export function getNestedTranslation(
  dict: Translations,
  keyPath: string,
  fallbackDict?: Translations
): string {
  const parts = keyPath.split('.');
  let current: unknown = dict;
  for (const part of parts) {
    if (current != null && typeof current === 'object' && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      if (typeof import.meta.env !== 'undefined' && import.meta.env.DEV) {
        console.warn(`[i18n] Missing key: "${keyPath}"`);
      }
      if (fallbackDict) return getNestedTranslation(fallbackDict, keyPath);
      return keyPath;
    }
  }
  return typeof current === 'string' ? current : (fallbackDict ? getNestedTranslation(fallbackDict, keyPath) : keyPath);
}
