/**
 * Prof. Willem Visser — publication list.
 * Single source for profile timeline and site-wide publications.
 * Older publications: see DBLP.
 */

export interface WillemVisserPublicationEntry {
  year: number;
  title: string;
  authors?: string;
  venue?: string;
  note?: string;
  links?: Array<{ label: string; url: string }>;
}

export const willemVisserPublications: WillemVisserPublicationEntry[] = [
  // 2014
  {
    year: 2014,
    title: 'Exact and approximate probabilistic symbolic execution',
    venue: 'ASE',
  },
  {
    year: 2014,
    title: 'Software engineering and automated deduction',
    venue: 'ICSE FOSE',
  },
  {
    year: 2014,
    title: 'Compositional solution space quantification',
    venue: 'PLDI',
  },
  {
    year: 2014,
    title: 'Execution and property specifications for JPF-android',
    venue: 'ACM',
  },
  // 2013
  {
    year: 2013,
    title: 'Symbolic PathFinder',
    venue: 'ASE Journal',
  },
  {
    year: 2013,
    title: 'Reliability analysis in SPF',
    venue: 'ICSE',
  },
  {
    year: 2013,
    title: 'Bounded Lazy Initialization',
    venue: 'NFM',
  },
  {
    year: 2013,
    title: 'SE 2004 curriculum revision',
    venue: 'SIGCSE',
  },
  // 2012
  {
    year: 2012,
    title: 'Verifying Android applications using Java PathFinder',
    venue: 'ACM SIGSOFT Software Engineering Notes',
  },
  {
    year: 2012,
    title: 'Hidden models of model checking',
    venue: '',
  },
  {
    year: 2012,
    title: 'Probabilistic symbolic execution',
    venue: 'ISSTA',
  },
  {
    year: 2012,
    title: 'Green: Reducing, Reusing and Recycling Constraints in Program Analysis',
    venue: 'FSE',
  },
  {
    year: 2012,
    title: 'Symbolic execution of programs with strings',
    venue: 'SAICSIT',
  },
  {
    year: 2012,
    title: 'Evaluating paper and author ranking algorithms',
    venue: 'SAICSIT',
  },
  {
    year: 2012,
    title: 'Symbolic execution test-case generation',
    venue: 'SAICSIT',
    note: 'Best Paper',
  },
  {
    year: 2012,
    title: 'Automated coverage calculation',
    venue: 'SAICSIT',
  },
];

/** Build year groups for AchievementsTimeline (newest first). */
export function getWillemVisserYearGroups(): Array<{
  year: number;
  publications: Array<{ title: string; authors?: string; venue?: string; year: number; award?: string }>;
}> {
  const byYear = new Map<number, WillemVisserPublicationEntry[]>();
  for (const p of willemVisserPublications) {
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
