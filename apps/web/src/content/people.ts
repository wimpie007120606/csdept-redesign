import { fallbackPeople } from './fallback';

export interface PersonMeta {
  /** Stable identifier used by researchGroups memberIds. */
  id: string;
  /** Human-readable name for display. */
  name: string;
  /** Optional profile slug for /:lang/people/:slug routes. */
  slug?: string;
  /** Explicit photo path under public/people (e.g. /people/Andrew_ColletPeople.jpg). */
  photo?: string | null;
}

// Seed from fallbackPeople so core profiles stay in sync with People + Profile pages.
const basePeople: PersonMeta[] = fallbackPeople.map((p) => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  photo: p.image ?? null,
}));

// Additional people that appear in research groups but may not yet have full profiles.
// Slugs are only provided where we know they exist; otherwise we omit slug so the UI
// can fall back to a “profile coming soon” state instead of a broken link.
const extraPeople: PersonMeta[] = [
  { id: 'steyn-van-litsenborgh', name: 'Steyn van Litsenborgh' },
  { id: 'andrew-collett', name: 'Andrew Collett', photo: '/people/Andrew_ColletPeople.jpg' },
  { id: 'bernd-fischer', name: 'Bernd Fischer', photo: '/people/Bernd_Fischer_People.jpg' },
  { id: 'jaco-geldenhuys', name: 'Jaco Geldenhuys', photo: '/people/Jaco_Geldenhuys_People.jpg' },
  { id: 'cornelia-inggs', name: 'Cornelia Inggs', photo: '/people/Cornelia_Ings_People.jpg' },
  { id: 'zhunaid-mohamed', name: 'Zhunaid Mohamed', photo: '/people/Zhunaid_Mohamed_People.jpg' },
  { id: 'jan-taljaard', name: 'Jan Taljaard', photo: '/people/Jan_Taljaard_People.jpg' },
  { id: 'phillip-van-heerden', name: 'Phillip van Heerden', photo: '/people/Phillip_van_Heerden_People.jpg' },
  { id: 'willem-visser', name: 'Willem Visser', photo: '/people/Willem_Visser_People.jpg' },
  { id: 'burger-becker', name: 'Burger Becker', photo: '/people/Burger_Becker_People.jpg' },
  { id: 'marc-christoph', name: 'Marc Christoph', photo: '/people/Marc_Christoph_People.jpg' },
  { id: 'dirko-coetsee', name: 'Dirko Coetsee', photo: '/people/Dirko_Coetsee_People.jpg' },
  { id: 'trienko-grobler', name: 'Trienko Grobler', photo: '/people/Trienko_Grobler_People.jpg' },
  { id: 'steve-kroon', name: 'Steve Kroon', photo: '/people/Steve_Kroon_People.jpg' },
  { id: 'jordan-masakuna', name: 'Jordan Masakuna', photo: '/people/Jordan_Masakuna_People.jpg' },
  { id: 'arnu-pretorius', name: 'Arnu Pretorius', photo: '/people/Arnu_Pretorius_People.jpg' },
  { id: 'charl-steyl', name: 'Charl Steyl', photo: '/people/Charl_Steyl_People.jpg' },
  { id: 'elan-van-biljon', name: 'Elan van Biljon', photo: '/people/Elan_van_Biljon_People.jpg' },
  { id: 'anthony-e-krzesinski', name: 'Anthony E Krzesinski' },
];

export const peopleMeta: PersonMeta[] = [...basePeople, ...extraPeople];

export const peopleById: Map<string, PersonMeta> = new Map(
  peopleMeta.map((p) => [p.id, p])
);

export function getPersonMetaById(id: string): PersonMeta | undefined {
  return peopleById.get(id);
}

export const peopleBySlug: Map<string, PersonMeta> = new Map(
  peopleMeta
    .filter((p) => p.slug)
    .map((p) => [p.slug as string, p])
);

// Dev-only validation to prevent inconsistent people data.
if (typeof import.meta !== 'undefined' && (import.meta as any).env?.DEV) {
  const ids = new Set<string>();
  const slugs = new Set<string>();

  for (const p of peopleMeta) {
    if (ids.has(p.id)) {
      // eslint-disable-next-line no-console
      console.warn(`[people] Duplicate person id detected: "${p.id}"`);
    }
    ids.add(p.id);

    if (p.slug) {
      if (slugs.has(p.slug)) {
        // eslint-disable-next-line no-console
        console.warn(`[people] Duplicate person slug detected: "${p.slug}"`);
      }
      slugs.add(p.slug);
    }
  }
}

