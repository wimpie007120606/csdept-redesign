/**
 * Dr. Cornelia P. Inggs — publication list.
 * Single source for profile timeline and site-wide publications.
 */

export interface CorneliaInggsPublicationEntry {
  year: number;
  title: string;
  authors?: string;
  venue?: string;
  note?: string;
  links?: Array<{ label: string; url: string }>;
}

export const corneliaInggsPublications: CorneliaInggsPublicationEntry[] = [
  // 2017
  {
    year: 2017,
    title: 'Learning concurrency via games',
    authors: 'Taun Gadd, Justin Giffard',
    venue: 'CSEDU',
  },
  // 2012
  {
    year: 2012,
    title: 'Symbolic execution test-case generation',
    authors: 'Willem H.K. Bester',
    venue: 'SAICSIT',
    note: 'Best Paper',
  },
  {
    year: 2012,
    title: 'Reducing communication in distributed model checking',
    authors: 'Jaco Geldenhuys, Jean Fourie',
    venue: 'SAICSIT',
  },
  {
    year: 2012,
    title: 'Automated coverage calculation',
    authors: 'G. Campbell Morrison',
    venue: 'MSc',
  },
  {
    year: 2012,
    title: 'Monte-Carlo Tree Search for Go',
    venue: 'SAICSIT, International Go Symposium',
  },
  // 2009
  {
    year: 2009,
    title: 'Reducing communication in distributed model checking',
    authors: 'Jaco Geldenhuys, Jean Fourie',
    venue: 'SAICSIT',
  },
  // 2006
  {
    year: 2006,
    title: 'CTL* model checking',
    venue: 'FMSD',
  },
  // 2004
  {
    year: 2004,
    title: 'Parallel model checking',
    venue: 'PhD, The University of Manchester',
  },
  // 2002
  {
    year: 2002,
    title: 'Effective state exploration',
    venue: 'ENTCS',
  },
  // 1999
  {
    year: 1999,
    title: 'LTL verification system',
    venue: 'MSc, Stellenbosch University',
  },
];

/** Build year groups for AchievementsTimeline (newest first). */
export function getCorneliaInggsYearGroups(): Array<{
  year: number;
  publications: Array<{ title: string; authors?: string; venue?: string; year: number; award?: string }>;
}> {
  const byYear = new Map<number, CorneliaInggsPublicationEntry[]>();
  for (const p of corneliaInggsPublications) {
    if (!byYear.has(p.year)) byYear.set(p.year, []);
    byYear.get(p.year)!.push(p);
  }
  return Array.from(byYear.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, pubs]) => ({
      year,
      publications: pubs.map((pub) => ({
        title: pub.title,
        authors: pub.authors,
        venue: pub.venue,
        year: pub.year,
        award: pub.note ?? undefined,
      })),
    }));
}
