/**
 * BSc Computer Science programme structure – single source of truth.
 * Focal areas: General Computer Science, Computer Systems, Data Science.
 * Last verified: Yearbook 2026 (Engineering/Science).
 */

export type FocalAreaId = 'general' | 'systems' | 'data';

/** One row: subject name and module codes with credits, e.g. "114(16), 144(16)". */
export interface ModuleRow {
  subject: string;
  codes: string;
}

/** Compulsory block for a year. */
export interface CompulsoryBlock {
  credits: number;
  modules: ModuleRow[];
}

/** Elective block: optional rule text, optional "choose one of" list, main list, optional note. */
export interface ElectiveBlock {
  minCredits: number;
  maxCredits: number;
  /** e.g. "Choose at least one of:" */
  rule?: string;
  /** If set, show this list first (e.g. "Applied Mathematics 144(16), Mathematics 154(16)"). */
  chooseOneOf?: ModuleRow[];
  /** e.g. "Then choose additional modules from:" / "Choose any modules from the list below" */
  thenText?: string;
  modules: ModuleRow[];
  /** Inline note (e.g. Genetics AND Biometry). */
  note?: string;
  /** Footnote text for this block (e.g. "These modules may not be taken with Statistics 318 or 348."). */
  blockNote?: string;
}

/** Year 3 Data Science: elective is "Choose ONE of the following options". */
export interface ElectiveOption {
  label: string;
  /** e.g. "Option 1" */
  optionLabel: string;
  modules: ModuleRow[];
  /** Optional note (e.g. "only certain options possible depending on 2nd year elective"). */
  note?: string;
}

export interface ElectiveBlockWithOptions {
  minCredits: number;
  maxCredits: number;
  /** e.g. "Choose ONE of the following options (only certain options possible depending on 2nd year elective):" */
  intro?: string;
  options: ElectiveOption[];
}

/** One year's structure. */
export interface YearStructure {
  year: 1 | 2 | 3;
  minCredits: number;
  maxCredits: number;
  compulsory: CompulsoryBlock;
  elective?: ElectiveBlock | ElectiveBlockWithOptions;
}

/** Global footnote (e.g. Maths 378 replacement). */
export interface ProgrammeFootnote {
  id: string;
  marker: string;
  text: string;
}

/** Admission requirement bullet. */
export interface AdmissionRequirement {
  text: string;
}

/** Continued study possibility. */
export interface ContinuedStudy {
  intro?: string;
  programmes: string[];
  note?: string;
}

/** One focal area's full programme data. */
export interface FocalAreaProgramme {
  id: FocalAreaId;
  yearbookRef: string;
  title: string;
  admissionRequirements?: AdmissionRequirement[];
  admissionRequirementOr?: string;
  continuedStudy?: ContinuedStudy;
  years: YearStructure[];
  footnotes?: ProgrammeFootnote[];
  /** Top-level note (e.g. Engineering test week). */
  topNote?: string;
}

// ---------------------------------------------------------------------------
// General Computer Science (7.4.1)
// ---------------------------------------------------------------------------

const generalCS: FocalAreaProgramme = {
  id: 'general',
  yearbookRef: '7.4.1',
  title: 'General Computer Science',
  admissionRequirements: [
    { text: 'Afrikaans or English (Home Language or First Additional Language) – minimum 50%' },
    { text: 'Mathematics – minimum 70%' },
    { text: 'Any other school subject from the designated subject list for university admission – minimum 50%' },
  ],
  admissionRequirementOr: 'Physical Sciences – minimum 50% (if you are planning to take Physics or Chemistry)',
  continuedStudy: {
    intro: 'If you take applicable elective modules, this focal area leads to honours programmes in:',
    programmes: [
      'Applied Mathematics',
      'Computer Science',
      'Economics',
      'General Linguistics',
      'Genetics',
      'GeoInformatics',
      'Mathematical Statistics',
      'Mathematics',
      'Operations Research',
      'Statistics',
    ],
    note: 'If continuing to Honours in GeoInformatics, you must complete: Physics 114(16) and Physics 144(16). Without these Physics modules, you may still register with SACNASP as a Natural Scientist in Geospatial Science.',
  },
  years: [
    {
      year: 1,
      minCredits: 124,
      maxCredits: 140,
      compulsory: {
        credits: 92,
        modules: [
          { subject: 'Computer Science', codes: '114(16), 144(16)' },
          { subject: 'Mathematics', codes: '114(16), 144(16)' },
          { subject: 'Probability Theory and Statistics', codes: '114(16)' },
          { subject: 'Science in Context', codes: '179(12)' },
        ],
      },
      elective: {
        minCredits: 32,
        maxCredits: 48,
        rule: 'Choose at least one of:',
        chooseOneOf: [
          { subject: 'Applied Mathematics', codes: '144(16)' },
          { subject: 'Mathematics', codes: '154(16)' },
        ],
        thenText: 'plus (choose any modules from list below to reach required credits):',
        modules: [
          { subject: 'Applied Mathematics', codes: '144(16)' },
          { subject: 'Biology', codes: '124(16), 144(16) or 154(16)' },
          { subject: 'Chemistry', codes: '124(16), 144(16)' },
          { subject: 'Economics', codes: '114(12), 144(12)' },
          { subject: 'General Linguistics', codes: '178(24)' },
          { subject: 'Geo-Environmental Science', codes: '124(16), 154(16)' },
          { subject: 'Geographical Information Technology', codes: '141(16)' },
          { subject: 'Mathematics', codes: '154(16)' },
          { subject: 'Music Technology', codes: '112(6), 142(6)' },
          { subject: 'Physics', codes: '114(16), 144(16)' },
        ],
      },
    },
    {
      year: 2,
      minCredits: 128,
      maxCredits: 128,
      compulsory: {
        credits: 32,
        modules: [
          { subject: 'Computer Science', codes: '214(16), 244(16)' },
        ],
      },
      elective: {
        minCredits: 96,
        maxCredits: 96,
        thenText: 'Choose any modules from the list below to reach required credit total:',
        note: 'Genetics 214(16), 244(16) AND Biometry 212(8), 242(8) must be taken together.',
        modules: [
          { subject: 'Applied Mathematics', codes: '214(16), 244(16)' },
          { subject: 'Chemistry', codes: '214(16), 234(16), 254(16), 264(16)' },
          { subject: 'Economics', codes: '217(16), 248(16)' },
          { subject: 'General Linguistics', codes: '278(32)' },
          { subject: 'Genetics', codes: '214(16), 244(16)' },
          { subject: 'Biometry', codes: '212(8), 242(8)' },
          { subject: 'Geographical Information Technology', codes: '211(16), 214(16), 241(16), 242(16)' },
          { subject: 'Mathematical Statistics', codes: '214(16), 245(8), 246(8)' },
          { subject: 'Mathematics', codes: '214(16), 244(16), 279(16)' },
          { subject: 'Music Technology', codes: '222(8), 252(8)' },
          { subject: 'Operations Research', codes: '214(16), 244(16)' },
          { subject: 'Physics', codes: '224(16), 254(16)' },
        ],
      },
    },
    {
      year: 3,
      minCredits: 128,
      maxCredits: 128,
      compulsory: {
        credits: 64,
        modules: [
          { subject: 'Computer Science', codes: '313(16), 314(16), 343(16), 344(16)' },
        ],
      },
      elective: {
        minCredits: 64,
        maxCredits: 64,
        thenText: 'Choose any modules from the list below to reach required credit total:',
        modules: [
          { subject: 'Applied Mathematics', codes: '314(16), 324(16), 354(16), 364(16)' },
          { subject: 'Biomathematics', codes: '374(16)' },
          { subject: 'Chemistry', codes: '344(16)' },
          { subject: 'Computer Science', codes: '315(16), 345(16)' },
          { subject: 'Economics', codes: '318(24), 348(24)' },
          { subject: 'General Linguistics', codes: '318(24), 348(24)' },
          { subject: 'Genetics', codes: '314(16), 324(16), 344(16), 354(16)' },
          { subject: 'Geographical Information Technology', codes: '311(16), 312(16), 341(16), 342(16)' },
          { subject: 'Mathematical Statistics', codes: '312(16), 316(16), 344(16), 364(16)' },
          { subject: 'Mathematics', codes: '314(16), 324(16), 344(16), 345(16), 365(16), 378(32)*' },
          { subject: 'Music Technology', codes: '379(48)' },
          { subject: 'Operations Research', codes: '314(16), 322(16), 344(16), 352(16)' },
          { subject: 'Physics', codes: '314(16), 334(16), 344(16), 384(16)' },
          { subject: 'Statistics', codes: '318(24), 348(24)' },
        ],
        blockNote: 'NOTE: Mathematical Statistics modules above may not be taken with Statistics 318 or 348.',
      },
    },
  ],
  footnotes: [
    { id: 'math378', marker: '*', text: 'Mathematics 378(32) will be replaced with Mathematics 318(16) in 2027.' },
  ],
};

// Fix duplicate key in Genetics row - year 2 elective has "Genetics ... AND Biometry" as one combined row
// The user data says: "Genetics: 214(16), 244(16) AND Biometry: 212(8), 242(8)" - so one row with two subjects
generalCS.years[1].elective!.modules = [
  { subject: 'Applied Mathematics', codes: '214(16), 244(16)' },
  { subject: 'Chemistry', codes: '214(16), 234(16), 254(16), 264(16)' },
  { subject: 'Economics', codes: '217(16), 248(16)' },
  { subject: 'General Linguistics', codes: '278(32)' },
  { subject: 'Genetics', codes: '214(16), 244(16)' },
  { subject: 'Biometry', codes: '212(8), 242(8)' },
  { subject: 'Geographical Information Technology', codes: '211(16), 214(16), 241(16), 242(16)' },
  { subject: 'Mathematical Statistics', codes: '214(16), 245(8), 246(8)' },
  { subject: 'Mathematics', codes: '214(16), 244(16), 279(16)' },
  { subject: 'Music Technology', codes: '222(8), 252(8)' },
  { subject: 'Operations Research', codes: '214(16), 244(16)' },
  { subject: 'Physics', codes: '224(16), 254(16)' },
];

// ---------------------------------------------------------------------------
// Computer Systems (7.4.2)
// ---------------------------------------------------------------------------

const computerSystems: FocalAreaProgramme = {
  id: 'systems',
  yearbookRef: '7.4.2',
  title: 'Computer Systems',
  topNote: 'Includes modules assessed during Engineering test week. If timetable clashes occur, consult the divisional head during the first two weeks of the semester.',
  admissionRequirements: [
    { text: 'Afrikaans or English – minimum 50%' },
    { text: 'Mathematics – minimum 70%' },
    { text: 'Any other designated subject – minimum 50%' },
  ],
  admissionRequirementOr: 'Physical Sciences – minimum 50% (if planning to take Physics)',
  continuedStudy: {
    intro: 'Leads to Honours in Computer Science.',
    programmes: [],
  },
  years: [
    {
      year: 1,
      minCredits: 139,
      maxCredits: 139,
      compulsory: {
        credits: 139,
        modules: [
          { subject: 'Applied Mathematics', codes: '144(16)' },
          { subject: 'Computer Science', codes: '114(16), 144(16)' },
          { subject: 'Electrotechnique', codes: '143(15)' },
          { subject: 'Mathematics', codes: '114(16), 144(16)' },
          { subject: 'Physics', codes: '114(16)' },
          { subject: 'Probability Theory and Statistics', codes: '114(16)' },
          { subject: 'Science in Context', codes: '179(12)' },
        ],
      },
    },
    {
      year: 2,
      minCredits: 130,
      maxCredits: 130,
      compulsory: {
        credits: 130,
        modules: [
          { subject: 'Applied Mathematics B', codes: '224(15)' },
          { subject: 'Computer Science', codes: '214(16), 244(16)' },
          { subject: 'Computer Systems', codes: '214(15), 245(15)' },
          { subject: 'Engineering Mathematics', codes: '214(15), 242(8)' },
          { subject: 'Systems and Signals', codes: '214(15), 244(15)' },
        ],
      },
    },
    {
      year: 3,
      minCredits: 127,
      maxCredits: 127,
      compulsory: {
        credits: 127,
        modules: [
          { subject: 'Applied Mathematics', codes: '324(16), 364(16)' },
          { subject: 'Computer Science', codes: '313(16), 314(16), 343(16), 344(16), 345(16)' },
          { subject: 'Design E', codes: '314(15)' },
        ],
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Data Science (7.4.3)
// ---------------------------------------------------------------------------
// Year 2 compulsory: verified from yearbook 2026 structure (112 credits compulsory, 12–16 elective = 124–128 total).
// Compulsory modules: Computer Science 214(16), 244(16); Mathematics 214(16), 244(16); Applied Mathematics 214(16); Mathematical Statistics 214(16), 245(8), 246(8) = 32+32+16+32 = 112.

const dataScience: FocalAreaProgramme = {
  id: 'data',
  yearbookRef: '7.4.3',
  title: 'Data Science',
  topNote: 'Includes Engineering test week modules.',
  admissionRequirements: [
    { text: 'Afrikaans or English – minimum 50%' },
    { text: 'Mathematics – minimum 70%' },
    { text: 'Any other designated subject – minimum 50%' },
  ],
  admissionRequirementOr: 'Physical Sciences – minimum 50% (if planning to take Physics)',
  continuedStudy: {
    intro: 'Leads to Honours in Computer Science.',
    programmes: [],
  },
  years: [
    {
      year: 1,
      minCredits: 124,
      maxCredits: 140,
      compulsory: {
        credits: 108,
        modules: [
          { subject: 'Computer Science', codes: '114(16), 144(16)' },
          { subject: 'Data Science', codes: '141(16)' },
          { subject: 'Mathematics', codes: '114(16), 144(16)' },
          { subject: 'Probability Theory and Statistics', codes: '114(16)' },
          { subject: 'Science in Context', codes: '179(12)' },
        ],
      },
      elective: {
        minCredits: 16,
        maxCredits: 32,
        thenText: 'Choose any modules from the list below to reach required credit total:',
        modules: [
          { subject: 'Applied Mathematics', codes: '144(16)' },
          { subject: 'Economics', codes: '114(12), 144(12)' },
          { subject: 'Mathematics', codes: '154(16)' },
          { subject: 'Physics', codes: '114(16), 144(16)' },
        ],
      },
    },
    {
      year: 2,
      minCredits: 124,
      maxCredits: 128,
      compulsory: {
        credits: 112,
        modules: [
          { subject: 'Computer Science', codes: '214(16), 244(16)' },
          { subject: 'Mathematics', codes: '214(16), 244(16)' },
          { subject: 'Applied Mathematics', codes: '214(16)' },
          { subject: 'Mathematical Statistics', codes: '214(16), 245(8), 246(8)' },
        ],
      },
      elective: {
        minCredits: 12,
        maxCredits: 16,
        rule: 'Choose ONE:',
        modules: [
          { subject: 'Data Engineering', codes: '245(12)' },
          { subject: 'Data Science', codes: '241(16)' },
        ],
      },
    },
    {
      year: 3,
      minCredits: 127,
      maxCredits: 128,
      compulsory: {
        credits: 64,
        modules: [
          { subject: 'Computer Science', codes: '314(16), 315(16), 343(16), 344(16)' },
        ],
      },
      elective: {
        minCredits: 63,
        maxCredits: 64,
        intro: 'Choose ONE of the following options (only certain options possible depending on 2nd year elective):',
        options: [
          {
            optionLabel: 'Option 1',
            label: 'Option 1',
            modules: [
              { subject: 'Computer Science', codes: '345(16)' },
              { subject: 'Data Science', codes: '316(16), 346(16)' },
            ],
          },
          {
            optionLabel: 'Option 2',
            label: 'Option 2',
            modules: [
              { subject: 'Data Engineering', codes: '314(15)' },
              { subject: 'Statistics', codes: '318(24), 348(24)' },
            ],
          },
          {
            optionLabel: 'Option 3',
            label: 'Option 3',
            modules: [
              { subject: 'Mathematical Statistics', codes: '312(16), 316(16), 344(16), 364(16)' },
            ],
          },
        ],
      } as ElectiveBlockWithOptions,
    },
  ],
};

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const bscProgrammeByFocalArea: Record<FocalAreaId, FocalAreaProgramme> = {
  general: generalCS,
  systems: computerSystems,
  data: dataScience,
};

export function getBscProgramme(focalArea: FocalAreaId): FocalAreaProgramme {
  return bscProgrammeByFocalArea[focalArea];
}

/** All compulsory module rows for General CS (for use on Undergraduate overview page). */
export function getGeneralCSCompulsoryModulesFlat(): { year: number; subject: string; codes: string; credits: number }[] {
  const prog = generalCS;
  const out: { year: number; subject: string; codes: string; credits: number }[] = [];
  for (const y of prog.years) {
    for (const m of y.compulsory.modules) {
      const parts = m.codes.split(/[,\s]+/).filter(Boolean);
      for (const p of parts) {
        const match = p.match(/^(\d+)\((\d+)\)/);
        if (match) {
          out.push({ year: y.year, subject: m.subject, codes: p, credits: parseInt(match[2], 10) });
        }
      }
    }
  }
  return out;
}

/** Simple list of compulsory modules for General CS by year (for Undergraduate page summary). */
export function getGeneralCSCompulsoryByYear(): { year: number; code: string; name: string; credits: number; type: 'compulsory' }[] {
  const list: { year: number; code: string; name: string; credits: number; type: 'compulsory' }[] = [];
  const prog = generalCS;
  for (const y of prog.years) {
    for (const m of y.compulsory.modules) {
      const parts = m.codes.split(',').map((s) => s.trim());
      for (const p of parts) {
        const match = p.match(/^(\d+)\((\d+)\)$/);
        if (match) {
          const code = match[1];
          const credits = parseInt(match[2], 10);
          list.push({
            year: y.year,
            code: `${m.subject.includes('Computer Science') ? 'CS' : m.subject.includes('Mathematics') ? 'MATH' : m.subject.includes('Probability') ? 'STAT' : m.subject.includes('Science in Context') ? 'SCI' : 'MOD'} ${code}`,
            name: `${m.subject} ${code}`,
            credits,
            type: 'compulsory',
          });
        }
      }
    }
  }
  return list;
}
