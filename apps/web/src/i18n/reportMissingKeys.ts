/**
 * Dev-only: compare locale keys and report missing keys in xh (and optionally af) vs en.
 * Run from app init in development to get "Missing xh keys: N" and list of keys.
 */

import en from './en.json';
import xh from './xh.json';
import af from './af.json';

type Dict = Record<string, unknown>;

function allKeys(obj: Dict, prefix = ''): string[] {
  const keys: string[] = [];
  for (const key of Object.keys(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (val != null && typeof val === 'object' && !Array.isArray(val)) {
      keys.push(...allKeys(val as Dict, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

function hasKey(obj: Dict, keyPath: string): boolean {
  const parts = keyPath.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return false;
    current = (current as Record<string, unknown>)[part];
  }
  return current !== undefined;
}

export function reportMissingTranslationKeys(): void {
  if (typeof import.meta.env === 'undefined' || !import.meta.env.DEV) return;

  const enKeys = allKeys(en as Dict);
  const enSet = new Set(enKeys);

  const missingXh = enKeys.filter((k) => !hasKey(xh as Dict, k));
  const missingAf = enKeys.filter((k) => !hasKey(af as Dict, k));

  const groupByNamespace = (keys: string[]) => {
    const m: Record<string, string[]> = {};
    for (const k of keys) {
      const ns = k.split('.')[0] ?? 'root';
      if (!m[ns]) m[ns] = [];
      m[ns].push(k);
    }
    return m;
  };

  if (missingXh.length > 0) {
    console.groupCollapsed(
      `[i18n] Missing xh keys: ${missingXh.length} (of ${enKeys.length} total)`
    );
    const byNs = groupByNamespace(missingXh);
    for (const [ns, keys] of Object.entries(byNs).sort(([a], [b]) => a.localeCompare(b))) {
      console.group(ns);
      keys.forEach((k) => console.log(k));
      console.groupEnd();
    }
    console.groupEnd();
  } else {
    console.log('[i18n] Missing xh keys: 0 — all keys have isiXhosa translations.');
  }

  if (missingAf.length > 0) {
    console.groupCollapsed(
      `[i18n] Missing af keys: ${missingAf.length} (of ${enKeys.length} total)`
    );
    const byNs = groupByNamespace(missingAf);
    for (const [ns, keys] of Object.entries(byNs).sort(([a], [b]) => a.localeCompare(b))) {
      console.group(ns);
      keys.slice(0, 20).forEach((k) => console.log(k));
      if (keys.length > 20) console.log(`... and ${keys.length - 20} more`);
      console.groupEnd();
    }
    console.groupEnd();
  }
}
