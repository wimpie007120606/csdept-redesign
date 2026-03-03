/**
 * Best-effort profile image path for a staff name.
 * Tries convention First_Last_People.ext; UI should fall back to placeholder on error.
 */

const PLACEHOLDER = '/people/placeholder.jpg';

/** Known name -> path mappings for files that exist in public/people (e.g. different naming). */
const KNOWN_PATHS: Record<string, string> = {
  'w. h. k. bester': '/people/WillemPeople.jpg',
  'willem bester': '/people/WillemPeople.jpg',
  'lynette van zijl': '/people/LynettePeople.webp',
  'brink van der merwe': '/people/BrinkPeople.jpeg',
  'prof. brink van der merwe': '/people/BrinkPeople.jpeg',
  'bernd fischer': '/people/Bernd_Fischer_People.jpg',
  'prof. bernd fischer': '/people/Bernd_Fischer_People.jpg',
  'jaco geldenhuys': '/people/Jaco_Geldenhuys_People.jpg',
  'dr. jaco geldenhuys': '/people/Jaco_Geldenhuys_People.jpg',
  'cornelia inggs': '/people/Cornelia_Ings_People.jpg',
  'dr. cornelia p. inggs': '/people/Cornelia_Ings_People.jpg',
  'willem visser': '/people/Willem_Visser_People.jpg',
  'prof. willem visser': '/people/Willem_Visser_People.jpg',
  'steve kroon': '/people/Steve_Kroon_People.jpg',
  'prof. steve kroon': '/people/Steve_Kroon_People.jpg',
  'trienko grobler': '/people/Trienko_Grobler_People.jpg',
};

function normalizeForLookup(name: string): string {
  return name
    .replace(/\b(Prof\.|Dr\.|Mr\.|Ms\.)\s*/gi, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

/**
 * Returns a path to try for the staff photo (e.g. /people/Marcel_Dunaiski_People.jpg).
 * If no known mapping, uses naming convention; UI should use placeholder on load error.
 */
export function getStaffImagePath(fullName: string): string {
  if (!fullName || typeof fullName !== 'string') return PLACEHOLDER;
  const key = normalizeForLookup(fullName);
  if (KNOWN_PATHS[key]) return KNOWN_PATHS[key];
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return PLACEHOLDER;
  const pascal = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join('_');
  return `/people/${pascal}_People.jpg`;
}
