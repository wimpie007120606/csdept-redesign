/**
 * Honours study roadmaps (tracks). References module codes from postgraduateModules only.
 * Do not duplicate module text; resolve via getModuleByCode().
 */

export interface HonoursRoadmap {
  trackId: string;
  title: string;
  description: string;
  recommended: {
    firstSemester: string[];
    secondSemester: string[];
  };
  alternatives: {
    firstSemester: string[];
    secondSemester: string[];
  };
}

export const honoursRoadmaps: HonoursRoadmap[] = [
  {
    trackId: 'ml-ai',
    title: 'Machine Learning & AI Track',
    description: 'Focus on artificial intelligence, machine learning, and cognitive systems.',
    recommended: {
      firstSemester: ['14232-791', '14195-742', '11788-741'],
      secondSemester: ['14888-743', '14531-771', '65048-746'],
    },
    alternatives: {
      firstSemester: ['14533-771'],
      secondSemester: ['14066-791'],
    },
  },
  {
    trackId: 'data-science',
    title: 'Data Science Track',
    description: 'Focus on data science principles, machine learning, and analytical methods.',
    recommended: {
      firstSemester: ['14531-771', '11788-741', '14232-791'],
      secondSemester: ['14195-742', '14066-791', '14533-771'],
    },
    alternatives: {
      firstSemester: ['14888-743'],
      secondSemester: ['65048-746'],
    },
  },
  {
    trackId: 'software-verification',
    title: 'Software Engineering & Verification Track',
    description: 'Focus on software construction, testing, verification, and concurrent systems.',
    recommended: {
      firstSemester: ['14065-796', '64963-714', '13944-795'],
      secondSemester: ['65021-745', '63452-711', '64947-712'],
    },
    alternatives: {
      firstSemester: [],
      secondSemester: ['65048-746'],
    },
  },
  {
    trackId: 'cybersecurity-systems',
    title: 'Cybersecurity & Systems Track',
    description: 'Focus on security, vulnerability analysis, networks, and systems programming.',
    recommended: {
      firstSemester: ['64971-716', '14530-711', '64963-714'],
      secondSemester: ['65021-745', '64947-712', '14065-796'],
    },
    alternatives: {
      firstSemester: ['13944-795'],
      secondSemester: [],
    },
  },
  {
    trackId: 'theory-algorithms',
    title: 'Theory, Algorithms & Formal Methods Track',
    description: 'Focus on automata theory, algorithms, formal methods, and functional programming.',
    recommended: {
      firstSemester: ['63452-711', '64947-712', '13944-795'],
      secondSemester: ['14065-796', '65048-746', '64963-714'],
    },
    alternatives: {
      firstSemester: [],
      secondSemester: ['65021-745'],
    },
  },
  {
    trackId: 'networks-distributed',
    title: 'Networks & Distributed Systems Track',
    description: 'Focus on computer networks, distributed and concurrent systems.',
    recommended: {
      firstSemester: ['14530-711', '64963-714', '14531-771'],
      secondSemester: ['65021-745', '64947-712', '64971-716'],
    },
    alternatives: {
      firstSemester: ['11788-741'],
      secondSemester: ['14065-796'],
    },
  },
];
