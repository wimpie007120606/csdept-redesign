/**
 * Bridging Course data (single source of truth).
 * All files are under public/bridging/ and served at /bridging/...
 * ZIP structure: BridgingCourse/README.md, Day1/Java|Python|C/..., Day2/..., Day3/..., Exercises/...
 */

export type BridgingProgramType = 'java' | 'python' | 'c';
export type BridgingResourceType = 'pdf' | 'txt' | BridgingProgramType;
export type BridgingDayId = 'day1' | 'day2' | 'day3';

export interface BridgingResource {
  label: string;
  path: string;
  type: 'pdf' | 'txt';
}

/** A single program file (code) with type and day for filtering. */
export interface BridgingDayProgram {
  filename: string;
  path: string;
  description?: string;
  type: BridgingProgramType;
}

export interface BridgingDay {
  dayLabel: string;
  dayId: BridgingDayId;
  programs: BridgingDayProgram[];
}

/** Entry for ZIP: public path + path inside the ZIP. */
export interface BridgingZipEntry {
  /** URL path to fetch (e.g. /bridging/Day1/Java/HelloWorld.java) */
  fetchPath: string;
  /** Path inside the ZIP (e.g. BridgingCourse/Day1/Java/HelloWorld.java) */
  zipPath: string;
}

export interface BridgingCourseManifest {
  title: string;
  description: string;
  overviewResource: { label: string; path: string };
  exercises: BridgingResource[];
  days: BridgingDay[];
  /** All files to include in the ZIP, in order (README first, then by day/language). */
  zipEntries: BridgingZipEntry[];
}

const BASE = '/bridging';

/** All materials for ZIP download: README + Day1–3 + Exercises. */
function buildZipEntries(): BridgingZipEntry[] {
  const entries: BridgingZipEntry[] = [
    { fetchPath: `${BASE}/README.md`, zipPath: 'BridgingCourse/README.md' },
  ];
  const days = ['Day1', 'Day2', 'Day3'] as const;
  const langs = ['Java', 'Python', 'C'] as const;
  const dayFiles: Record<string, string[]> = {
    Day1: ['HelloWorld.java', 'hello_world.py', 'hello_world.c'],
    Day2: ['ControlFlow.java', 'Functions.java', 'control_flow.py', 'functions.py', 'control_flow.c', 'functions.c'],
    Day3: ['ArraysAndLoops.java', 'MiniProject.java', 'lists_and_loops.py', 'mini_project.py', 'arrays_and_loops.c', 'mini_project.c'],
  };
  for (const day of days) {
    for (const lang of langs) {
      const files = dayFiles[day].filter((f) =>
        (lang === 'Java' && f.endsWith('.java')) ||
        (lang === 'Python' && f.endsWith('.py')) ||
        (lang === 'C' && f.endsWith('.c'))
      );
      for (const file of files) {
        entries.push({
          fetchPath: `${BASE}/${day}/${lang}/${file}`,
          zipPath: `BridgingCourse/${day}/${lang}/${file}`,
        });
      }
    }
  }
  entries.push({ fetchPath: `${BASE}/Exercises/Day1_Exercises.txt`, zipPath: 'BridgingCourse/Exercises/Day1_Exercises.txt' });
  entries.push({ fetchPath: `${BASE}/Exercises/Day2_Exercises.txt`, zipPath: 'BridgingCourse/Exercises/Day2_Exercises.txt' });
  entries.push({ fetchPath: `${BASE}/Exercises/Day3_Exercises.txt`, zipPath: 'BridgingCourse/Exercises/Day3_Exercises.txt' });
  return entries;
}

export const bridgingCourseManifest: BridgingCourseManifest = {
  title: 'Bridging Course',
  description: 'A 3-day mini bridge course: absolute basics, control flow and functions, arrays and a mini project. Java, Python, and C.',
  overviewResource: {
    label: 'README.md',
    path: `${BASE}/README.md`,
  },
  exercises: [
    { label: 'Day 1 Exercises', path: `${BASE}/Exercises/Day1_Exercises.txt`, type: 'txt' },
    { label: 'Day 2 Exercises', path: `${BASE}/Exercises/Day2_Exercises.txt`, type: 'txt' },
    { label: 'Day 3 Exercises', path: `${BASE}/Exercises/Day3_Exercises.txt`, type: 'txt' },
  ],
  days: [
    {
      dayId: 'day1',
      dayLabel: 'Day 1 – Absolute basics',
      programs: [
        { filename: 'HelloWorld.java', path: `${BASE}/Day1/Java/HelloWorld.java`, type: 'java', description: 'Prints, variables, basic input' },
        { filename: 'hello_world.py', path: `${BASE}/Day1/Python/hello_world.py`, type: 'python', description: 'Prints, variables, input' },
        { filename: 'hello_world.c', path: `${BASE}/Day1/C/hello_world.c`, type: 'c', description: 'printf, variables, scanf' },
      ],
    },
    {
      dayId: 'day2',
      dayLabel: 'Day 2 – Control flow and functions',
      programs: [
        { filename: 'ControlFlow.java', path: `${BASE}/Day2/Java/ControlFlow.java`, type: 'java', description: 'if/else, loops' },
        { filename: 'Functions.java', path: `${BASE}/Day2/Java/Functions.java`, type: 'java', description: 'Methods' },
        { filename: 'control_flow.py', path: `${BASE}/Day2/Python/control_flow.py`, type: 'python', description: 'if/else, loops' },
        { filename: 'functions.py', path: `${BASE}/Day2/Python/functions.py`, type: 'python', description: 'Functions' },
        { filename: 'control_flow.c', path: `${BASE}/Day2/C/control_flow.c`, type: 'c', description: 'if/else, loops' },
        { filename: 'functions.c', path: `${BASE}/Day2/C/functions.c`, type: 'c', description: 'Functions' },
      ],
    },
    {
      dayId: 'day3',
      dayLabel: 'Day 3 – Arrays and mini project',
      programs: [
        { filename: 'ArraysAndLoops.java', path: `${BASE}/Day3/Java/ArraysAndLoops.java`, type: 'java', description: 'Arrays and iteration' },
        { filename: 'MiniProject.java', path: `${BASE}/Day3/Java/MiniProject.java`, type: 'java', description: 'Simple menu calculator' },
        { filename: 'lists_and_loops.py', path: `${BASE}/Day3/Python/lists_and_loops.py`, type: 'python', description: 'Lists and loops' },
        { filename: 'mini_project.py', path: `${BASE}/Day3/Python/mini_project.py`, type: 'python', description: 'Simple grade analyzer' },
        { filename: 'arrays_and_loops.c', path: `${BASE}/Day3/C/arrays_and_loops.c`, type: 'c', description: 'Arrays and loops' },
        { filename: 'mini_project.c', path: `${BASE}/Day3/C/mini_project.c`, type: 'c', description: 'Simple menu program' },
      ],
    },
  ],
  zipEntries: buildZipEntries(),
};
