/**
 * Generate a URL-safe slug from a person's full name for profile routes.
 * e.g. "W. H. K. Bester" -> "whk-bester", "Brink van der Merwe" -> "brink-van-der-merwe"
 */

const ACCENTS: Record<string, string> = { ö: 'o', ü: 'u', ä: 'a', ß: 'ss', é: 'e', è: 'e', ê: 'e', ñ: 'n' };

export function slugifyName(fullName: string): string {
  if (!fullName || typeof fullName !== 'string') return '';
  let s = fullName
    .trim()
    .toLowerCase()
    .replace(/[öüäßéèêñ]/g, (c) => ACCENTS[c] ?? c)
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return s;
}

/**
 * Normalize name for duplicate detection: strip titles, lowercase, collapse spaces.
 * Used to match "Prof. Bernd Fischer" with "Bernd Fischer".
 */
export function normalizeName(name: string): string {
  return name
    .replace(/\b(Prof\.|Dr\.|Mr\.|Ms\.)\s*/gi, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

/**
 * Normalized key for deduplication: "surname firstInitial" so that
 * "W. H. K. Bester" and "Willem Bester" both yield "bester w".
 */
export function normalizedNameKey(name: string): string {
  const n = normalizeName(name);
  const parts = n.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return n;
  const surname = parts[parts.length - 1];
  const firstInitial = parts[0].charAt(0);
  return `${surname} ${firstInitial}`;
}
