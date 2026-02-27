#!/usr/bin/env node
/**
 * Compare en.json keys with xh.json and af.json. Report missing keys.
 * Run from repo root: node apps/web/scripts/check-i18n-keys.mjs
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const localesDir = join(__dirname, '../src/i18n');

function loadJson(name) {
  const path = join(localesDir, `${name}.json`);
  return JSON.parse(readFileSync(path, 'utf8'));
}

function allKeys(obj, prefix = '') {
  const keys = [];
  for (const key of Object.keys(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (val != null && typeof val === 'object' && !Array.isArray(val)) {
      keys.push(...allKeys(val, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

function hasKey(obj, keyPath) {
  const parts = keyPath.split('.');
  let current = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return false;
    current = current[part];
  }
  return current !== undefined;
}

const en = loadJson('en');
const xh = loadJson('xh');
const af = loadJson('af');

const enKeys = allKeys(en);
const missingXh = enKeys.filter((k) => !hasKey(xh, k));
const missingAf = enKeys.filter((k) => !hasKey(af, k));

console.log(`Total keys in en: ${enKeys.length}`);
console.log(`Missing xh keys: ${missingXh.length}`);
if (missingXh.length > 0) {
  const byNs = {};
  missingXh.forEach((k) => {
    const ns = k.split('.')[0] || 'root';
    if (!byNs[ns]) byNs[ns] = [];
    byNs[ns].push(k);
  });
  Object.keys(byNs)
    .sort()
    .forEach((ns) => {
      console.log(`  ${ns}: ${byNs[ns].length}`);
      byNs[ns].slice(0, 5).forEach((k) => console.log(`    - ${k}`));
      if (byNs[ns].length > 5) console.log(`    ... and ${byNs[ns].length - 5} more`);
    });
}
console.log(`Missing af keys: ${missingAf.length}`);
if (missingAf.length > 0) {
  const byNs = {};
  missingAf.forEach((k) => {
    const ns = k.split('.')[0] || 'root';
    if (!byNs[ns]) byNs[ns] = [];
    byNs[ns].push(k);
  });
  Object.keys(byNs)
    .sort()
    .forEach((ns) => {
      console.log(`  ${ns}: ${byNs[ns].length}`);
    });
}
process.exit(missingXh.length > 0 ? 1 : 0);
