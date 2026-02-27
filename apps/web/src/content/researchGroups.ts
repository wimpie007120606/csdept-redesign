/**
 * Single source of truth for research groups.
 * Category images: place in public/images/research/ (e.g. automata-grammars.jpg).
 * Member photos: place in public/ with naming NameSurnamePeople.jpg (e.g. LynetteVanZijlPeople.jpg).
 */

export interface ResearchGroupLink {
  label: string;
  url: string;
}

export interface ResearchGroup {
  slug: string;
  title: string;
  /** Path under public/ e.g. /images/research/automata-grammars.jpg */
  categoryImage: string;
  summary: string;
  /** Full display names; match to People by name for profile links. */
  members: Array<{ name: string; role?: string }>;
  links?: ResearchGroupLink[];
}

const RESEARCH_IMAGE_DIR = '/images/research';

export const researchGroups: ResearchGroup[] = [
  {
    slug: 'automata-grammars',
    title: 'Theory and Applications of Automata and Grammars',
    categoryImage: `${RESEARCH_IMAGE_DIR}/automata-grammars.jpg`,
    summary:
      'We work on formal languages, automata theory, and their applications—including descriptional complexity, symmetric difference NFAs, and connections to verification and natural language processing.',
    members: [
      { name: 'Lynette van Zijl', role: 'Professor' },
      { name: 'Prof. Brink van der Merwe', role: 'Professor' },
      { name: 'W. H. K. Bester', role: 'Junior Lecturer' },
      { name: 'Walter Schulze', role: 'Researcher' },
    ],
    links: [],
  },
  {
    slug: 'software-verification',
    title: 'Software Engineering and Verification',
    categoryImage: `${RESEARCH_IMAGE_DIR}/software-verification.jpg`,
    summary:
      'Research in program verification, testing, and software engineering—including symbolic execution, regular expression matching, and tools for correctness and security.',
    members: [
      { name: 'Prof. Brink van der Merwe', role: 'Professor' },
      { name: 'W. H. K. Bester', role: 'Junior Lecturer' },
      { name: 'Prof. David Chen', role: 'Professor' },
    ],
    links: [],
  },
  {
    slug: 'ml-ai',
    title: 'Machine Learning and Artificial Intelligence',
    categoryImage: `${RESEARCH_IMAGE_DIR}/ml-ai.jpg`,
    summary:
      'Advancing artificial intelligence through deep learning, reinforcement learning, and neural architecture search. Applications in vision, NLP, and data analytics.',
    members: [
      { name: 'Prof. Sarah Anderson', role: 'Professor' },
      { name: 'Dr. Robert Taylor', role: 'Senior Researcher' },
    ],
    links: [],
  },
  {
    slug: 'networks-broadband',
    title: 'Broadband and Mobile Networks',
    categoryImage: `${RESEARCH_IMAGE_DIR}/networks-broadband.jpg`,
    summary:
      'Research on scalable distributed systems, cloud and edge computing, and mobile and broadband network technologies.',
    members: [
      { name: 'Dr. James Wilson', role: 'Senior Lecturer' },
    ],
    links: [],
  },
  {
    slug: 'robotics-vision',
    title: 'Robotics and Computer Vision',
    categoryImage: `${RESEARCH_IMAGE_DIR}/robotics-vision.jpg`,
    summary:
      'Developing intelligent robots and autonomous systems: perception, path planning, human–robot interaction, and manipulation for real-world applications.',
    members: [
      { name: 'Prof. Michael Lee', role: 'Professor' },
    ],
    links: [],
  },
  {
    slug: 'nlp',
    title: 'Natural Language Processing',
    categoryImage: `${RESEARCH_IMAGE_DIR}/nlp.jpg`,
    summary:
      'Work on natural language processing, computational linguistics, and assistive technologies that bridge language and computation.',
    members: [
      { name: 'Lynette van Zijl', role: 'Professor' },
    ],
    links: [],
  },
];
