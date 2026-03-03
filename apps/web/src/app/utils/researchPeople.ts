import { fallbackPeople } from '@/content/fallback';
import { getStudentSlugByName } from '@/content/people/students';
import { normalizeName as normalizeNameSlug } from '@/app/utils/slugifyName';

/** Re-export for callers that need the same normalizer (strip titles, lowercase, collapse spaces). */
export const normalizeName = normalizeNameSlug;

/**
 * Resolve a member display name to a People (staff) profile slug, or null if not in People data.
 */
export function getSlugForMemberName(displayName: string): string | null {
  const normalized = normalizeName(displayName);
  const person = fallbackPeople.find((p) => normalizeName(p.name) === normalized);
  return person?.slug ?? null;
}

/** Staff preferred: if name matches both staff and student, return staff. */
export type ResolvedPersonLink = { type: 'staff'; slug: string } | { type: 'student'; slug: string };

export function resolvePersonLink(displayName: string): ResolvedPersonLink | null {
  const staffSlug = getSlugForMemberName(displayName);
  if (staffSlug) return { type: 'staff', slug: staffSlug };
  const studentSlug = getStudentSlugByName(displayName);
  if (studentSlug) return { type: 'student', slug: studentSlug };
  return null;
}

/** Known image paths under public/people (prefer resolving via content/people.ts peopleBySlug in UI). */
const KNOWN_IMAGES: Record<string, string> = {
  [normalizeName('W. H. K. Bester')]: '/people/WillemPeople.jpg',
  [normalizeName('Lynette van Zijl')]: '/people/LynettePeople.webp',
  [normalizeName('Prof. Brink van der Merwe')]: '/people/BrinkPeople.jpeg',
  [normalizeName('Brink van der Merwe')]: '/people/BrinkPeople.jpeg',
  [normalizeName('Walter Schulze')]: '/people/WalterPeople.jpeg',
};

/**
 * Standard staff image filename: First_Last_People.jpg (e.g. Cornelia_Ings_People.jpg).
 * Strip titles, then capitalize each word and join with underscore + _People.jpg.
 */
function getStaffImageFilename(displayName: string): string {
  const cleaned = displayName
    .replace(/\b(Prof\.|Dr\.|Mr\.|Ms\.)\s*/gi, '')
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  const pascal = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join('_');
  return `${pascal}_People.jpg`;
}

/** Legacy: "NameSurnamePeople" (no underscore) for backwards compatibility. */
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
 * Preferred image path for a member. Returns known path if any,
 * otherwise /people/First_Last_People.jpg (matches public/people/ naming).
 */
export function getMemberImagePath(displayName: string): string {
  const normalized = normalizeName(displayName);
  const known = KNOWN_IMAGES[normalized];
  if (known) return known;
  const filename = getStaffImageFilename(displayName);
  return `/people/${filename}`;
}

/**
 * Base URL without extension (for trying multiple extensions).
 * Known paths are returned as-is; others use First_Last_People base.
 */
export function getMemberImagePathsToTry(displayName: string): string[] {
  const normalized = normalizeName(displayName);
  const known = KNOWN_IMAGES[normalized];
  if (known) return [known];
  const filename = getStaffImageFilename(displayName);
  const basePath = `/people/${filename.replace(/\.(jpg|jpeg|png|webp)$/i, '')}`;
  return EXTENSIONS.map((ext) => basePath + ext);
}
