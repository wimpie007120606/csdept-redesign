import { fallbackPeople } from '@/content/fallback';

/** Normalize display name for matching: strip titles, lowercase, collapse spaces. */
function normalizeName(name: string): string {
  return name
    .replace(/\b(Prof\.|Dr\.|Mr\.|Ms\.)\s*/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/**
 * Resolve a member display name to a People profile slug, or null if not in People data.
 */
export function getSlugForMemberName(displayName: string): string | null {
  const normalized = normalizeName(displayName);
  const person = fallbackPeople.find((p) => normalizeName(p.name) === normalized);
  return person?.slug ?? null;
}

/** Known image paths from fallback (same as People page). */
const KNOWN_IMAGES: Record<string, string> = {
  [normalizeName('W. H. K. Bester')]: '/WillemPeople.jpg',
  [normalizeName('Lynette van Zijl')]: '/LynettePeople.webp',
  [normalizeName('Prof. Brink van der Merwe')]: '/BrinkPeople.jpeg',
  [normalizeName('Brink van der Merwe')]: '/BrinkPeople.jpeg',
  [normalizeName('Walter Schulze')]: '/WalterPeople.jpeg',
};

/**
 * Member photo base filename: "NameSurnamePeople" (e.g. LynetteVanZijlPeople).
 * Strip titles (Prof., Dr.), then capitalize each word and concatenate + "People".
 */
export function getMemberImageBaseName(displayName: string): string {
  const cleaned = displayName
    .replace(/\b(Prof\.|Dr\.|Mr\.|Ms\.)\s*/gi, '')
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  const pascal = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join('');
  return `${pascal}People`;
}

const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'] as const;

/**
 * Preferred image path for a member. Returns known path from People data if any,
 * otherwise /images/people/{BaseName}.jpg.
 */
export function getMemberImagePath(displayName: string): string {
  const normalized = normalizeName(displayName);
  const known = KNOWN_IMAGES[normalized];
  if (known) return known;
  const base = getMemberImageBaseName(displayName);
  return `/images/people/${base}.jpg`;
}

/**
 * Base URL without extension (for trying multiple extensions).
 * Known paths are returned as-is; others return path without extension.
 */
export function getMemberImagePathsToTry(displayName: string): string[] {
  const normalized = normalizeName(displayName);
  const known = KNOWN_IMAGES[normalized];
  if (known) return [known];
  const base = getMemberImageBaseName(displayName);
  const basePath = `/images/people/${base}`;
  return EXTENSIONS.map((ext) => basePath + ext);
}
