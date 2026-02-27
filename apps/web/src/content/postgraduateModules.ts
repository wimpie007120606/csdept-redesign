/**
 * Single source of truth for Honours/Postgraduate modules.
 * Used by Honours Roadmaps and any other module listings.
 */

export interface PostgraduateModule {
  code: string;
  title: string;
  credits?: number;
  lecturers?: string[];
  prerequisiteNote?: string;
}

export const HONOURS_PROJECT_CODE = '63444-771';

export const postgraduateModules: PostgraduateModule[] = [
  { code: '64947-712', title: 'Advanced Algorithms' },
  { code: '14232-791', title: 'Artificial Intelligence' },
  { code: '14195-742', title: 'Machine Learning A' },
  { code: '11788-741', title: 'Machine Learning' },
  { code: '14531-771', title: 'Principles of Data Science' },
  { code: '64963-714', title: 'Concurrent Programming I' },
  { code: '14065-796', title: 'Software Testing and Analysis' },
  { code: '65021-745', title: 'Software Construction - Compilers' },
  { code: '14530-711', title: 'Computer Networks' },
  { code: '63452-711', title: 'Automata Theory & Applications' },
  { code: '13944-795', title: 'Functional Programming' },
  { code: '64971-716', title: 'Adv. Topics I - Vulnerability Discovery and Exploitation' },
  { code: '65048-746', title: 'Adv. Topics II - Ontology Engineering' },
  { code: '14066-791', title: 'Space Science Algorithms' },
  { code: '14888-743', title: 'Machine Learning and Artificial Intelligence I - Cognitive Robotics' },
  { code: '14533-771', title: 'Computing and Society' },
  {
    code: HONOURS_PROJECT_CODE,
    title: 'Honours Project in Computer Science',
    credits: 32,
  },
];

const modulesByCode = new Map(postgraduateModules.map((m) => [m.code, m]));

export function getModuleByCode(code: string): PostgraduateModule | undefined {
  return modulesByCode.get(code);
}

export function getModulesByCodes(codes: string[]): PostgraduateModule[] {
  return codes
    .map((code) => modulesByCode.get(code))
    .filter((m): m is PostgraduateModule => m != null);
}
