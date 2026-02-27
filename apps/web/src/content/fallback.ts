const willemBesterImage = '/WillemPeople.jpg';
const lynetteVanZijlImage = '/LynettePeople.webp';
const brinkVanDerMerweImage = '/BrinkPeople.jpeg';
const walterSchulzeImage = '/WalterPeople.jpeg';

/** Canonical slugs — single source of truth for list/detail routing. */
export const PEOPLE_SLUGS = ['whk-bester', 'lynette-van-zijl', 'brink-van-der-merwe', 'walter-schulze'] as const;
export type PeopleSlug = (typeof PEOPLE_SLUGS)[number];

export const fallbackPeople = [
  { id: 'whk-bester', slug: 'whk-bester', name: 'W. H. K. Bester', primaryTitle: 'Technical Officer', secondaryTitle: 'Junior Lecturer (since 2014)', department: 'Computer Science Division, Department of Mathematical Sciences', office: 'A508, General Engineering Building', email: 'whkbester@cs.sun.ac.za', secondaryEmail: 'whkbester@gmail.com', phone: '+27 21 808 4232', image: willemBesterImage, researchAreas: ['Formal Languages & Automata Theory', 'Software Engineering (System Programming)', 'Regular Expression Matching', 'Algorithms & Data Structures Efficiency'] },
  { id: 'lynette-van-zijl', slug: 'lynette-van-zijl', name: 'Lynette van Zijl', primaryTitle: 'Professor', secondaryTitle: 'Academic Staff', department: 'Computer Science Division, Department of Mathematical Sciences', office: 'A520, General Engineering Building', email: 'lvzijl@cs.sun.ac.za', secondaryEmail: 'lvzijl@sun.ac.za', phone: '+27 21 808 4232', phoneNote: 'secretary', image: lynetteVanZijlImage, researchAreas: ['Automata Theory', 'Formal Languages', 'Nature Conservation Applications', 'Assistive Technologies'] },
  { id: 'brink-van-der-merwe', slug: 'brink-van-der-merwe', name: 'Prof. Brink van der Merwe', primaryTitle: 'Professor', secondaryTitle: 'Academic Staff', department: 'Computer Science Division, Department of Mathematical Sciences', office: 'General Engineering Building', email: 'abvdm@cs.sun.ac.za', image: brinkVanDerMerweImage, researchAreas: ['Automata Theory', 'Formal Languages', 'Regular Expression Matching', 'Program Verification'] },
  { id: 'walter-schulze', slug: 'walter-schulze', name: 'Walter Schulze', primaryTitle: 'Researcher', secondaryTitle: 'Informatics Division', department: 'Computer Science Division, Department of Mathematical Sciences', office: 'General Engineering Building', email: 'walter@walterschulze.org', image: walterSchulzeImage, researchAreas: ['Lean Systems', 'Regular Expression Derivatives', 'Serialization', 'Music & Programming Languages', 'Formal Language Theory'] },
];

const fallbackSlugs = fallbackPeople.map((p) => p.slug);
if (new Set(fallbackSlugs).size !== fallbackSlugs.length) {
  throw new Error('[fallback] Duplicate people slugs detected. Ensure each slug is unique.');
}

export const campusBg = '/background.jpg';
