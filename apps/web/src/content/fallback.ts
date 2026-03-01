const willemBesterImage = '/people/WillemPeople.jpg';
const lynetteVanZijlImage = '/people/LynettePeople.webp';
const brinkVanDerMerweImage = '/people/BrinkPeople.jpeg';
const walterSchulzeImage = '/people/WalterPeople.jpeg';
const berndFischerImage = '/people/Bernd_Fischer_People.jpg';
const jacoGeldenhuysImage = '/people/Jaco_Geldenhuys_People.jpg';
const corneliaInggsImage = '/people/Cornelia_Ings_People.jpg';
const willemVisserImage = '/people/Willem_Visser_People.jpg';
const steveKroonImage = '/people/Steve_Kroon_People.jpg';

/** Canonical slugs — single source of truth for list/detail routing. */
export const PEOPLE_SLUGS = ['whk-bester', 'lynette-van-zijl', 'brink-van-der-merwe', 'walter-schulze', 'bernd-fischer', 'jaco-geldenhuys', 'cornelia-inggs', 'willem-visser', 'steve-kroon'] as const;
export type PeopleSlug = (typeof PEOPLE_SLUGS)[number];

export const fallbackPeople = [
  { id: 'whk-bester', slug: 'whk-bester', name: 'W. H. K. Bester', primaryTitle: 'Technical Officer', secondaryTitle: 'Junior Lecturer (since 2014)', department: 'Computer Science Division, Department of Mathematical Sciences', office: 'A508, General Engineering Building', email: 'whkbester@cs.sun.ac.za', secondaryEmail: 'whkbester@gmail.com', phone: '+27 21 808 4232', image: willemBesterImage, researchAreas: ['Formal Languages & Automata Theory', 'Software Engineering (System Programming)', 'Regular Expression Matching', 'Algorithms & Data Structures Efficiency'] },
  { id: 'lynette-van-zijl', slug: 'lynette-van-zijl', name: 'Lynette van Zijl', primaryTitle: 'Professor', secondaryTitle: 'Academic Staff', department: 'Computer Science Division, Department of Mathematical Sciences', office: 'A520, General Engineering Building', email: 'lvzijl@cs.sun.ac.za', secondaryEmail: 'lvzijl@sun.ac.za', phone: '+27 21 808 4232', phoneNote: 'secretary', image: lynetteVanZijlImage, researchAreas: ['Automata Theory', 'Formal Languages', 'Nature Conservation Applications', 'Assistive Technologies'] },
  { id: 'brink-van-der-merwe', slug: 'brink-van-der-merwe', name: 'Prof. Brink van der Merwe', primaryTitle: 'Professor', secondaryTitle: 'Academic Staff', department: 'Computer Science Division, Department of Mathematical Sciences', office: 'General Engineering Building', email: 'abvdm@cs.sun.ac.za', image: brinkVanDerMerweImage, researchAreas: ['Automata Theory', 'Formal Languages', 'Regular Expression Matching', 'Program Verification'] },
  { id: 'walter-schulze', slug: 'walter-schulze', name: 'Walter Schulze', primaryTitle: 'Researcher', secondaryTitle: 'Informatics Division', department: 'Computer Science Division, Department of Mathematical Sciences', office: 'General Engineering Building', email: 'walter@walterschulze.org', image: walterSchulzeImage, researchAreas: ['Lean Systems', 'Regular Expression Derivatives', 'Serialization', 'Music & Programming Languages', 'Formal Language Theory'] },
  { id: 'bernd-fischer', slug: 'bernd-fischer', name: 'Prof. Bernd Fischer', primaryTitle: 'Professor', secondaryTitle: 'Head of Division', department: 'Division of Computer Science, Department of Mathematical Sciences', office: 'General Engineering Building', email: 'bfischer@cs.sun.ac.za', phone: '+27 21 808 4232', image: berndFischerImage, researchAreas: ['Automated software engineering', 'Logic-based techniques', 'Program synthesis / program generation', 'Program verification', 'Annotation inference', 'Model checking', 'Human-oriented presentation of verification results'] },
  { id: 'jaco-geldenhuys', slug: 'jaco-geldenhuys', name: 'Dr. Jaco Geldenhuys', primaryTitle: 'Associate Professor', secondaryTitle: 'Academic Staff', department: 'Computer Science Division, Department of Mathematical Sciences', office: 'A519, General Engineering Building', address: 'Private Bag X1, 7602 Matieland, South Africa', email: 'geld@sun.ac.za', phone: '+27 21 808 4232', image: jacoGeldenhuysImage, researchAreas: ['Formal methods (model checking and process algebra)', 'Static analysis', 'Testing', 'Open source software', 'Automata and language theory', 'Data structures and algorithms'] },
  { id: 'cornelia-inggs', slug: 'cornelia-inggs', name: 'Dr. Cornelia P. Inggs', primaryTitle: 'Senior Lecturer (part-time)', secondaryTitle: 'Academic Staff', department: 'Computer Science Division, Department of Mathematical Sciences', institution: 'Stellenbosch University', office: 'Room A509, General Engineering Building', address: 'Computer Science, Stellenbosch University, Private Bag X1, 7602 Matieland, South Africa', email: 'cinggs@sun.ac.za', image: corneliaInggsImage, researchAreas: ['Software verification and analysis', 'Program performance and scalability', 'Parallel and distributed software', 'Efficient search and planning algorithms for AI and machine learning', 'Dynamic and static analysis of code'] },
  { id: 'willem-visser', slug: 'willem-visser', name: 'Prof. Willem Visser', primaryTitle: 'Professor', secondaryTitle: 'Academic Staff', department: 'Computer Science Division, Department of Mathematical Sciences', institution: 'Stellenbosch University', office: '', address: 'Computer Science Division, Stellenbosch University, Private Bag X1, 7602 Matieland, South Africa', email: 'wvisser@cs.sun.ac.za', secondaryEmail: 'visserw@sun.ac.za', phone: '+27 21 808 4232', image: willemVisserImage, researchAreas: ['Testing', 'Program analysis', 'Symbolic execution', 'Probabilistic symbolic execution', 'Model checking', 'Java PathFinder (JPF)', 'Symbolic PathFinder (SPF)'] },
  { id: 'steve-kroon', slug: 'steve-kroon', name: 'Prof. Steve Kroon', primaryTitle: 'Associate Professor', secondaryTitle: 'Academic Staff', department: 'Computer Science Division, Department of Mathematical Sciences', institution: 'Stellenbosch University', office: 'A515, General Engineering Building', email: 'kroon@sun.ac.za', phone: '+27 21 808 9375', image: steveKroonImage, researchAreas: ['Artificial intelligence / machine learning', 'Statistical learning theory', 'Probability and computing', 'Generative modeling', 'Bayesian methods', 'Planning under uncertainty'] },
];

const fallbackSlugs = fallbackPeople.map((p) => p.slug);
if (new Set(fallbackSlugs).size !== fallbackSlugs.length) {
  throw new Error('[fallback] Duplicate people slugs detected. Ensure each slug is unique.');
}

export const campusBg = '/background.jpg';
