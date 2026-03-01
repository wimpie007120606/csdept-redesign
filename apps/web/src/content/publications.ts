/**
 * Single source of truth for Research page publications.
 * All entries are derived from real People profiles (Lynette, Willem, Brink, Walter).
 * No fake or placeholder publications.
 */

import { lynetteAchievementsByYear } from './lynette-achievements';
import { berndFischerPublications } from './bernd-fischer-publications';
import { jacoGeldenhuysPublications } from './jaco-geldenhuys-publications';
import { corneliaInggsPublications } from './cornelia-inggs-publications';
import { willemVisserPublications } from './willem-visser-publications';
import { steveKroonPublications } from './steve-kroon-publications';

/** Normalized publication for Research page. Citation-style (Lynette) or structured (others). */
export interface NormalizedPublication {
  id: string;
  year: number;
  personSlugs: string[];
  /** Citation-style: full text as stored (Lynette). When set, prefer this for display. */
  citation?: string;
  /** Award/note e.g. BEST PAPER AWARD, Accepted, to appear... */
  note?: string;
  /** Structured fields (Willem, Brink, Walter). */
  title?: string;
  authors?: string;
  venue?: string;
  details?: string;
  /** Only include when real URL exists in repo or API — no fake links. */
  links?: Array<{ label: string; url: string }>;
}

/** Person with display name and slug for filters and links. */
export interface PersonWithPublications {
  slug: string;
  name: string;
  publicationCount: number;
}

const LYNETTE_SLUG = 'lynette-van-zijl';
const WILLEM_SLUG = 'whk-bester';
const BRINK_SLUG = 'brink-van-der-merwe';
const WALTER_SLUG = 'walter-schulze';
const BERND_SLUG = 'bernd-fischer';
const JACO_SLUG = 'jaco-geldenhuys';
const CORNELIA_SLUG = 'cornelia-inggs';
const WILLEM_VISSER_SLUG = 'willem-visser';
const STEVE_KROON_SLUG = 'steve-kroon';

/** Willem Bester — from ProfileDetailPage static profile (real publications only). */
const willemPublications: Omit<NormalizedPublication, 'id' | 'personSlugs'>[] = [
  {
    year: 2023,
    title: 'Efficient Regular Expression Matching Using Finite Automata',
    authors: 'W. H. K. Bester, B. van der Merwe',
    venue: 'Journal of Universal Computer Science',
  },
  {
    year: 2020,
    title: 'A Study of Efficient Glushkov Automata Construction',
    authors: 'W. H. K. Bester, C. Inggs, W. Visser',
    venue: 'SAICSIT Conference Proceedings',
  },
];

/** Brink van der Merwe — from ProfileDetailPage static profile. */
const brinkPublications: Omit<NormalizedPublication, 'id' | 'personSlugs'>[] = [
  {
    year: 2011,
    title: 'Music generation with Markov models',
    authors: 'B. van der Merwe, et al.',
    venue: 'IEEE MultiMedia',
    details: 'citations: 142',
  },
  {
    year: 2012,
    title: 'Verifying Android applications using Java Pathfinder',
    authors: 'H. Muccini, A. Di Francesco, P. Esposito, B. van der Merwe',
    venue: 'ACM SIGSOFT Software Engineering Notes',
    details: 'citations: 89',
  },
  {
    year: 2016,
    title: 'A computationally inexpensive energy model for horizontal electrical water heaters',
    authors: 'M. J. Booysen, J. A. A. Engelbrecht, A. Molinaro, B. van der Merwe',
    venue: 'IEEE Transactions on Smart Grid',
    details: 'citations: 67',
  },
  {
    year: 2014,
    title: 'Analyzing catastrophic backtracking behavior in practical regular expression matching',
    authors: 'N. Weideman, B. van der Merwe, M. Berglund, W. Visser',
    venue: 'arXiv preprint',
    details: 'citations: 45',
  },
  {
    year: 2014,
    title: 'Execution and property specifications for jpf-android',
    authors: 'H. van der Merwe, B. van der Merwe, W. Visser',
    venue: 'ACM SIGSOFT Software Engineering Notes',
    details: 'citations: 38',
  },
];

/** Walter Schulze — from ProfileDetailPage static profile. */
const walterPublications: Omit<NormalizedPublication, 'id' | 'personSlugs'>[] = [
  {
    year: 2010,
    title: 'Music generation with Markov models',
    authors: 'A. Van Der Merwe, W. Schulze',
    venue: 'IEEE Multimedia 18(3), 78–85',
    details: 'citations: 138',
  },
  {
    year: 2010,
    title: 'A formal language theory approach to music generation',
    authors: 'W. Schulze',
    venue: 'Stellenbosch University',
    details: 'citations: 10',
  },
];

function buildLynettePublications(): NormalizedPublication[] {
  const out: NormalizedPublication[] = [];
  let index = 0;
  for (const group of lynetteAchievementsByYear) {
    for (const entry of group.publications) {
      out.push({
        id: `lynette-${group.year}-${index++}`,
        year: group.year,
        personSlugs: [LYNETTE_SLUG],
        citation: entry.citation,
        note: entry.award ?? undefined,
        links: [], // hasPdf is true but no real URL in repo — no fake links
      });
    }
  }
  return out;
}

function buildStructuredList(
  list: Omit<NormalizedPublication, 'id' | 'personSlugs'>[],
  slug: string
): NormalizedPublication[] {
  return list.map((p, i) => ({
    ...p,
    id: `${slug}-${p.year}-${i}`,
    personSlugs: [slug],
  }));
}

/** Bernd Fischer — from SU publications page / Google Scholar (bernd-fischer-publications.ts). */
function buildBerndPublications(): NormalizedPublication[] {
  return berndFischerPublications.map((p, i) => ({
    id: `bernd-fischer-${p.year}-${i}`,
    year: p.year,
    personSlugs: [BERND_SLUG],
    title: p.title,
    authors: p.authors,
    venue: p.venue,
    details: p.note ?? undefined,
    links: p.links,
  }));
}

/** Jaco Geldenhuys — from profile (jaco-geldenhuys-publications.ts). */
function buildJacoPublications(): NormalizedPublication[] {
  return jacoGeldenhuysPublications.map((p, i) => ({
    id: `jaco-geldenhuys-${p.year}-${i}`,
    year: p.year,
    personSlugs: [JACO_SLUG],
    title: p.title,
    authors: p.authors,
    venue: p.venue,
    details: p.note ?? undefined,
    links: p.links,
  }));
}

/** Cornelia Inggs — from profile (cornelia-inggs-publications.ts). */
function buildCorneliaPublications(): NormalizedPublication[] {
  return corneliaInggsPublications.map((p, i) => ({
    id: `cornelia-inggs-${p.year}-${i}`,
    year: p.year,
    personSlugs: [CORNELIA_SLUG],
    title: p.title,
    authors: p.authors,
    venue: p.venue,
    details: p.note ?? undefined,
    links: p.links,
  }));
}

/** Willem Visser (Professor) — from profile (willem-visser-publications.ts). */
function buildWillemVisserPublications(): NormalizedPublication[] {
  return willemVisserPublications.map((p, i) => ({
    id: `willem-visser-${p.year}-${i}`,
    year: p.year,
    personSlugs: [WILLEM_VISSER_SLUG],
    title: p.title,
    authors: p.authors,
    venue: p.venue,
    details: p.note ?? undefined,
    links: p.links,
  }));
}

/** Steve Kroon (Associate Professor) — from profile (steve-kroon-publications.ts). */
function buildSteveKroonPublications(): NormalizedPublication[] {
  return steveKroonPublications.map((p, i) => ({
    id: `steve-kroon-${p.year}-${i}`,
    year: p.year,
    personSlugs: [STEVE_KROON_SLUG],
    title: p.title,
    authors: p.authors,
    venue: p.venue,
    details: p.details ?? p.note ?? undefined,
    links: p.links,
  }));
}

/** De-duplicate by (citation or title) + year + first author; merge personSlugs. */
function deduplicate(publications: NormalizedPublication[]): NormalizedPublication[] {
  const byKey = new Map<string, NormalizedPublication>();
  for (const p of publications) {
    const key = p.citation
      ? `citation:${p.year}:${p.citation.slice(0, 80)}`
      : `struct:${p.year}:${(p.title ?? '').trim()}:${(p.authors ?? '').slice(0, 40)}`;
    const existing = byKey.get(key);
    if (existing) {
      const mergedSlugs = [...new Set([...existing.personSlugs, ...p.personSlugs])];
      byKey.set(key, { ...existing, personSlugs: mergedSlugs });
    } else {
      byKey.set(key, { ...p });
    }
  }
  return Array.from(byKey.values());
}

/**
 * Returns all real publications from People profiles, de-duplicated, sorted by year descending.
 * Single source for the Research page Publications section.
 */
export function getAllPublications(): NormalizedPublication[] {
  const lynette = buildLynettePublications();
  const willem = buildStructuredList(willemPublications, WILLEM_SLUG);
  const brink = buildStructuredList(brinkPublications, BRINK_SLUG);
  const walter = buildStructuredList(walterPublications, WALTER_SLUG);
  const bernd = buildBerndPublications();
  const jaco = buildJacoPublications();
  const cornelia = buildCorneliaPublications();
  const willemVisser = buildWillemVisserPublications();
  const steveKroon = buildSteveKroonPublications();
  const combined = [...lynette, ...willem, ...brink, ...walter, ...bernd, ...jaco, ...cornelia, ...willemVisser, ...steveKroon];
  const deduped = deduplicate(combined);
  return deduped.sort((a, b) => b.year - a.year);
}

/** People who have at least one publication (for author filter). */
export function getPeopleWithPublications(): PersonWithPublications[] {
  const all = getAllPublications();
  const countBySlug = new Map<string, number>();
  const nameBySlug = new Map<string, string>([
    [LYNETTE_SLUG, 'Lynette van Zijl'],
    [WILLEM_SLUG, 'W. H. K. Bester'],
    [BRINK_SLUG, 'Prof. Brink van der Merwe'],
    [WALTER_SLUG, 'Walter Schulze'],
    [BERND_SLUG, 'Prof. Bernd Fischer'],
    [JACO_SLUG, 'Dr. Jaco Geldenhuys'],
    [CORNELIA_SLUG, 'Dr. Cornelia P. Inggs'],
    [WILLEM_VISSER_SLUG, 'Prof. Willem Visser'],
    [STEVE_KROON_SLUG, 'Prof. Steve Kroon'],
  ]);
  for (const p of all) {
    for (const slug of p.personSlugs) {
      countBySlug.set(slug, (countBySlug.get(slug) ?? 0) + 1);
    }
  }
  return Array.from(countBySlug.entries())
    .map(([slug, publicationCount]) => ({
      slug,
      name: nameBySlug.get(slug) ?? slug,
      publicationCount,
    }))
    .sort((a, b) => b.publicationCount - a.publicationCount);
}
