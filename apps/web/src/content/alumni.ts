/**
 * Alumni data for the People → Alumni page.
 * Single source of truth for faculty, doctoral, and masters graduates.
 */

export type AlumniCategory = 'faculty' | 'doctoral' | 'masters';

export interface AlumniFacultyEntry {
  category: 'faculty';
  name: string;
  /** e.g. "Prof", "Dr" in brackets */
  titleInBrackets?: string;
}

export interface AlumniGraduateEntry {
  category: 'doctoral' | 'masters';
  name: string;
  /** Thesis/project title */
  title: string;
  year: number;
}

export type AlumniEntry = AlumniFacultyEntry | AlumniGraduateEntry;

function isGraduate(e: AlumniEntry): e is AlumniGraduateEntry {
  return e.category === 'doctoral' || e.category === 'masters';
}

/** Alumni faculty — display as multi-column list. */
export const alumniFaculty: AlumniFacultyEntry[] = [
  { category: 'faculty', name: 'Bagula', titleInBrackets: 'BA' },
  { category: 'faculty', name: 'Cloete, I', titleInBrackets: 'Prof' },
  { category: 'faculty', name: 'Ackerman, C' },
  { category: 'faculty', name: 'de Villiers PJA', titleInBrackets: 'Prof' },
  { category: 'faculty', name: 'de Villiers H', titleInBrackets: 'Dr' },
  { category: 'faculty', name: 'Dodds, RMcD' },
  { category: 'faculty', name: 'Du Toit, C' },
  { category: 'faculty', name: 'Eloff, J' },
  { category: 'faculty', name: 'Engelbrecht, JA' },
  { category: 'faculty', name: 'Geldenhuys, J', titleInBrackets: 'Prof' },
  { category: 'faculty', name: 'Gouws, EH', titleInBrackets: 'Dr' },
  { category: 'faculty', name: 'Hayter, J' },
  { category: 'faculty', name: 'Hoffmann, M', titleInBrackets: 'Dr' },
  { category: 'faculty', name: 'Lezar, E' },
  { category: 'faculty', name: 'Ludik, J', titleInBrackets: 'Dr' },
  { category: 'faculty', name: 'Omlin, CW', titleInBrackets: 'Dr' },
  { category: 'faculty', name: 'Scheffler, K', titleInBrackets: 'Prof' },
  { category: 'faculty', name: 'Uys, JB' },
  { category: 'faculty', name: 'Van Deventer, MH' },
  { category: 'faculty', name: 'Van der Walt, APJ', titleInBrackets: 'Prof' },
];

/** Doctoral graduates — year grouped, newest first. */
export const alumniDoctoral: AlumniGraduateEntry[] = [
  { category: 'doctoral', name: 'Erwin, W', title: 'Landscape aware algorithm selection for feature selection', year: 2025 },
  { category: 'doctoral', name: 'Baker Effendi, S', title: 'An Approach to Modern Static Analysis with Property Graphs', year: 2025 },
  { category: 'doctoral', name: 'Werner, W', title: 'Landscape aware algorithm selection for feature selection', year: 2023 },
  { category: 'doctoral', name: 'Moeketsi, RI', title: 'Fault Localization and Repair for Grammarware', year: 2023 },
  { category: 'doctoral', name: 'Omomule, TG', title: 'Mixtures of heterogeneous experts', year: 2022 },
  { category: 'doctoral', name: 'Masakuna, JF', title: 'Active strategies for coordination of solitary robots', year: 2020 },
  { category: 'doctoral', name: 'Pretorius, A', title: 'On noise regularised neural networks: initialisation, learning and inference', year: 2019 },
  { category: 'doctoral', name: 'Dunaiski, MP', title: 'Using test data to evaluate rankings of entities in large scholarly citation networks', year: 2019 },
  { category: 'doctoral', name: 'Marais, L', title: 'Generalised acceptance conditions for symmetric difference nondeterministic finite automata', year: 2018 },
  { category: 'doctoral', name: 'Greene, GJ', title: 'Concept-Based Exploration of Rich Semi-Structured Data Collections', year: 2017 },
  { category: 'doctoral', name: 'Botha, H-M', title: 'Verifying Android Applications Using Java PathFinder', year: 2017 },
  { category: 'doctoral', name: 'Murrell, BS', title: 'Improved Models of Biological Sequence Evolution', year: 2012 },
  { category: 'doctoral', name: 'Viktor, HL', title: 'Learning by Cooperation: An Approach to Rule Induction and Knowledge Fusion', year: 1999 },
  { category: 'doctoral', name: 'Theron, PZ', title: 'Automatic Acquisition of Two-Level Morphological Rules', year: 1999 },
  { category: 'doctoral', name: 'Ewert, SG', title: 'Random Context Picture Grammars', year: 1999 },
  { category: 'doctoral', name: 'Engelbrecht, AP', title: 'Sensitivity Analysis of Multilayer Neural Networks', year: 1999 },
  { category: 'doctoral', name: 'De Villiers, PJA', title: 'Validation of a Microkernel: A Case Study', year: 1999 },
  { category: 'doctoral', name: 'Van Zijl, L', title: 'Generalized Nondeterminism and the Succinct Representation of Regular Languages', year: 1997 },
  { category: 'doctoral', name: 'Van der Poel, E', title: 'A Generalization of the Hopfield Single-Layer Recurrent Neural Network', year: 1997 },
  { category: 'doctoral', name: 'Ludik, J', title: 'Training, Dynamics, and Complexity of Architecture-Specific Recurrent Neural Networks', year: 1994 },
  { category: 'doctoral', name: 'Theron, H', title: 'Specialization by Exclusion: An Approach to Concept Learning', year: 1994 },
];

/** Masters graduates — year grouped, newest first. Add entries here. */
export const alumniMasters: AlumniGraduateEntry[] = [
  // Example: { category: 'masters', name: 'Surname, N', title: 'Thesis title', year: 2024 },
];

/** All alumni entries for search/filter. */
export const allAlumniEntries: AlumniEntry[] = [
  ...alumniFaculty,
  ...alumniDoctoral,
  ...alumniMasters,
];

/** Doctoral entries grouped by year (newest first). */
export function getDoctoralByYear(): Map<number, AlumniGraduateEntry[]> {
  const map = new Map<number, AlumniGraduateEntry[]>();
  for (const e of alumniDoctoral) {
    if (!map.has(e.year)) map.set(e.year, []);
    map.get(e.year)!.push(e);
  }
  return new Map([...map.entries()].sort((a, b) => b[0] - a[0]));
}

/** Masters entries grouped by year (newest first). */
export function getMastersByYear(): Map<number, AlumniGraduateEntry[]> {
  const map = new Map<number, AlumniGraduateEntry[]>();
  for (const e of alumniMasters) {
    if (!map.has(e.year)) map.set(e.year, []);
    map.get(e.year)!.push(e);
  }
  return new Map([...map.entries()].sort((a, b) => b[0] - a[0]));
}

/** Search/filter: match query against name, title, year. */
export function filterAlumniEntries(
  entries: AlumniEntry[],
  query: string,
  categoryFilter: AlumniCategory | 'all'
): AlumniEntry[] {
  const q = query.trim().toLowerCase();
  return entries.filter((e) => {
    if (categoryFilter !== 'all' && e.category !== categoryFilter) return false;
    if (!q) return true;
    const nameMatch = e.name.toLowerCase().includes(q);
    const titleMatch = isGraduate(e) && e.title.toLowerCase().includes(q);
    const yearMatch = isGraduate(e) && String(e.year).includes(q);
    const titleInBracketsMatch = 'titleInBrackets' in e && e.titleInBrackets?.toLowerCase().includes(q);
    return nameMatch || titleMatch || yearMatch || titleInBracketsMatch;
  });
}
