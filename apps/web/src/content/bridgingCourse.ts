/**
 * Bridging Course data (single source of truth).
 * Edit this file to add/change overview, exercises, and day programs.
 * Place actual files in: apps/web/public/bridging/
 *   - bridge.txt (or bridge.pdf)
 *   - exercises1.pdf, exercises2.pdf, exercises3.pdf
 *   - day1/*.java
 *   - day2/*.java
 */

export interface BridgingResource {
  label: string;
  path: string;
  type: 'pdf' | 'txt';
}

export interface BridgingDayProgram {
  filename: string;
  path: string;
  description?: string;
}

export interface BridgingDay {
  dayLabel: string;
  dayId: string;
  programs: BridgingDayProgram[];
}

export interface BridgingCourseManifest {
  title: string;
  description: string;
  overviewResource: { label: string; path: string };
  exercises: BridgingResource[];
  days: BridgingDay[];
}

const BASE = '/bridging';

export const bridgingCourseManifest: BridgingCourseManifest = {
  title: 'Bridging Course',
  description: 'Start strong: exercises, starter programs, and quick references for newcomers.',
  overviewResource: {
    label: 'Bridge.txt',
    path: `${BASE}/bridge.txt`,
  },
  exercises: [
    { label: 'Exercises 1', path: `${BASE}/exercises1.pdf`, type: 'pdf' },
    { label: 'Exercises 2', path: `${BASE}/exercises2.pdf`, type: 'pdf' },
    { label: 'Exercises 3', path: `${BASE}/exercises3.pdf`, type: 'pdf' },
  ],
  days: [
    {
      dayId: 'day1',
      dayLabel: 'Day 1 programs',
      programs: [
        { filename: 'HelloWorld.java', path: `${BASE}/day1/HelloWorld.java`, description: 'Classic first program' },
        { filename: 'Variables.java', path: `${BASE}/day1/Variables.java`, description: 'Variables and types' },
        { filename: 'Loops.java', path: `${BASE}/day1/Loops.java`, description: 'Loops and control flow' },
      ],
    },
    {
      dayId: 'day2',
      dayLabel: 'Day 2 programs',
      programs: [
        { filename: 'Arrays.java', path: `${BASE}/day2/Arrays.java`, description: 'Arrays and iteration' },
        { filename: 'Methods.java', path: `${BASE}/day2/Methods.java`, description: 'Methods and parameters' },
        { filename: 'InputOutput.java', path: `${BASE}/day2/InputOutput.java`, description: 'Reading input and printing' },
      ],
    },
  ],
};
