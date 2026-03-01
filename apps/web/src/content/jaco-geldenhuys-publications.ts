/**
 * Dr. Jaco Geldenhuys — publication list.
 * Single source for profile timeline and site-wide publications.
 */

export interface JacoPublicationEntry {
  year: number;
  title: string;
  authors?: string;
  venue?: string;
  note?: string;
  links?: Array<{ label: string; url: string }>;
}

export const jacoGeldenhuysPublications: JacoPublicationEntry[] = [
  // 2016
  {
    year: 2016,
    title: 'Evaluating paper and author ranking algorithms using impact and contribution awards',
    venue: 'JI',
  },
  {
    year: 2016,
    title: 'Texture Synthesis Using Convolutional Neural Networks With Long-Range Consistency and Spectral Constraints',
    venue: 'PRASA',
  },
  // 2015
  {
    year: 2015,
    title: 'BLISS: Improved Symbolic Execution by Bounded Lazy Initialization with SAT Support',
    venue: 'TSE',
  },
  // 2014
  {
    year: 2014,
    title: 'Ambiguity and structural ambiguity of symmetric difference NFAs',
    venue: 'TCS',
  },
  {
    year: 2014,
    title: 'Statistical Symbolic Execution with Informed Sampling',
    venue: 'FSE',
  },
  // 2013
  {
    year: 2013,
    title: 'Symbolic PathFinder: Integrating Symbolic Execution with Model Checking for Java Bytecode Analysis',
    venue: 'ASE',
  },
  {
    year: 2013,
    title: 'Integrating JPF into Impendulo',
    venue: 'JPFW',
  },
  {
    year: 2013,
    title: 'Counting Minimal Symmetric Difference NFAs',
    venue: 'LATA',
  },
  {
    year: 2013,
    title: 'Bounded Lazy Initialization',
    venue: 'NFM',
  },
  // 2012
  {
    year: 2012,
    title: 'Probabilistic Symbolic Execution',
    venue: 'ISSTA',
  },
  {
    year: 2012,
    title: 'Green: Reducing, Reusing and Recycling Constraints in Program Analysis',
    venue: 'FSE',
  },
  {
    year: 2012,
    title: 'Analyzing The Software Bug Lifecycle',
    venue: 'SATNAC',
  },
  {
    year: 2012,
    title: 'Improving Communication for Distributed Model Checking',
    venue: 'SAICSIT',
  },
  {
    year: 2012,
    title: 'Symbolic execution of programs with strings',
    venue: 'SAICSIT',
  },
];

/** Build year groups for AchievementsTimeline (newest first). */
export function getJacoGeldenhuysYearGroups(): Array<{
  year: number;
  publications: Array<{ title: string; authors?: string; venue?: string; year: number; award?: string }>;
}> {
  const byYear = new Map<number, JacoPublicationEntry[]>();
  for (const p of jacoGeldenhuysPublications) {
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
