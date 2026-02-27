/**
 * Single source of truth for research groups.
 * Category images: place in public/images/research/ (e.g. automata-grammars.jpg).
 */

export interface ResearchGroupLink {
  label: string;
  url: string;
  /** True for external links (open in new tab). */
  external?: boolean;
}

export interface ResearchGroup {
  slug: string;
  title: string;
  /** Path under public/ e.g. /images/research/automata-grammars.jpg */
  categoryImage: string;
  summary: string;
  /**
   * Member identifiers referencing PersonMeta.id from content/people.ts.
   * This avoids name matching at render time.
   */
  memberIds: string[];
  /**
   * Optional per-member roles for display, keyed by member id.
   */
  memberRoles?: Record<string, string>;
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
    memberIds: [
      'whk-bester',
      'walter-schulze',
      'brink-van-der-merwe',
      'steyn-van-litsenborgh',
      'lynette-van-zijl',
    ],
    memberRoles: {
      'whk-bester': 'Junior Lecturer',
      'walter-schulze': 'Researcher',
      'brink-van-der-merwe': 'Professor',
      'steyn-van-litsenborgh': 'Researcher',
      'lynette-van-zijl': 'Professor',
    },
    links: [
      {
        label: 'Theory and Applications of Automata and Grammars',
        url: '#automata-grammars',
        external: false,
      },
      // Keep regular-expression project description link here if/when a stable URL exists.
    ],
  },
  {
    slug: 'software-verification',
    title: 'Software Engineering and Verification',
    categoryImage: `${RESEARCH_IMAGE_DIR}/software-verification.jpg`,
    summary:
      'Research in program verification, testing, and software engineering—including symbolic execution, regular expression matching, and tools for correctness and security.',
    memberIds: [
      'andrew-collett',
      'bernd-fischer',
      'jaco-geldenhuys',
      'cornelia-inggs',
      'zhunaid-mohamed',
      'jan-taljaard',
      'phillip-van-heerden',
      'willem-visser',
    ],
    memberRoles: {
      'andrew-collett': 'Lecturer',
      'bernd-fischer': 'Professor',
      'jaco-geldenhuys': 'Senior Lecturer',
      'cornelia-inggs': 'Senior Lecturer',
      'zhunaid-mohamed': 'Lecturer',
      'jan-taljaard': 'Lecturer',
      'phillip-van-heerden': 'Lecturer',
      'willem-visser': 'Professor',
    },
    links: [
      { label: 'COASTAL', url: 'https://deepseaplatform.github.io/coastal/', external: true },
      { label: 'ESBMC', url: 'https://esbmc.github.io/', external: true },
      { label: 'CSeq', url: 'https://www.southampton.ac.uk/~gp1y10/cseq/', external: true },
    ],
  },
  {
    slug: 'ml-ai',
    title: 'Machine Learning and Artificial Intelligence',
    categoryImage: `${RESEARCH_IMAGE_DIR}/ml-ai.jpg`,
    summary:
      'Advancing artificial intelligence through deep learning, reinforcement learning, and neural architecture search. Applications in vision, NLP, and data analytics.',
    memberIds: [
      'burger-becker',
      'marc-christoph',
      'dirko-coetsee',
      'trienko-grobler',
      'steve-kroon',
      'jordan-masakuna',
      'arnu-pretorius',
      'charl-steyl',
      'elan-van-biljon',
    ],
    links: [],
  },
  {
    slug: 'networks-broadband',
    title: 'Telkom–Siemens Centre of Excellence in ATM and Broadband Networks and their Applications',
    categoryImage: `${RESEARCH_IMAGE_DIR}/networks-broadband.jpg`,
    summary:
      'Research on scalable distributed systems, cloud and edge computing, and broadband network technologies with strong industry collaboration.',
    memberIds: ['jaco-geldenhuys', 'anthony-e-krzesinski', 'willem-visser'],
    memberRoles: {
      'jaco-geldenhuys': 'Researcher',
      'anthony-e-krzesinski': 'Professor',
      'willem-visser': 'Professor',
    },
    links: [],
  },
  {
    slug: 'robotics-vision',
    title: 'Robotics and Computer Vision',
    categoryImage: `${RESEARCH_IMAGE_DIR}/robotics-vision.jpg`,
    summary:
      'Developing intelligent robots and autonomous systems: perception, path planning, human–robot interaction, and manipulation for real-world applications.',
    memberIds: [],
    links: [],
  },
  {
    slug: 'nlp',
    title: 'Natural Language Processing',
    categoryImage: `${RESEARCH_IMAGE_DIR}/nlp.jpg`,
    summary:
      'Work on natural language processing, computational linguistics, and assistive technologies that bridge language and computation.',
    memberIds: ['lynette-van-zijl'],
    memberRoles: {
      'lynette-van-zijl': 'Professor',
    },
    links: [],
  },
];
