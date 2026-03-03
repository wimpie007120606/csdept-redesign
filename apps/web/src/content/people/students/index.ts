/**
 * Postgraduate students (Doctoral + Masters).
 * Data in doctoral.json and masters.json; slug generated on load.
 */

import { slugifyName, normalizeName } from '../../../app/utils/slugifyName';
import doctoralJson from './doctoral.json';
import mastersJson from './masters.json';

export type Student = {
  name: string;
  supervisor: string;
  topic: string;
  level: 'doctoral' | 'masters';
  slug: string;
};

export type StudentRow = {
  name: string;
  supervisor: string;
  topic: string;
};

function withSlug(row: StudentRow, level: Student['level']): Student {
  return {
    ...row,
    level,
    slug: slugifyName(row.name) || `student-${level}-${Math.random().toString(36).slice(2, 9)}`,
  };
}

const doctoralData = Array.isArray(doctoralJson) ? (doctoralJson as StudentRow[]) : [];
const mastersData = Array.isArray(mastersJson) ? (mastersJson as StudentRow[]) : [];

if (doctoralData.length === 0 || mastersData.length === 0) {
  const msg = `[students] Students data must be non-empty: doctoral=${doctoralData.length} masters=${mastersData.length}. Populate doctoral.json and masters.json in apps/web/src/content/people/students/.`;
  console.error(msg);
  throw new Error(msg);
}

export function getDoctoralStudents(): Student[] {
  return doctoralData.map((row) => withSlug(row, 'doctoral'));
}

export function getMastersStudents(): Student[] {
  return mastersData.map((row) => withSlug(row, 'masters'));
}

export function getAllStudents(): Student[] {
  return [...getDoctoralStudents(), ...getMastersStudents()];
}

function buildSlugMap(): Map<string, Student> {
  const map = new Map<string, Student>();
  for (const s of getAllStudents()) {
    map.set(s.slug, s);
  }
  return map;
}

export function getStudentBySlug(slug: string): Student | undefined {
  return buildSlugMap().get(slug);
}

/** Check if a display name matches a known student (same normalizer as staff for consistent linking). */
export function getStudentSlugByName(displayName: string): string | null {
  const normalized = normalizeName(displayName);
  for (const s of getAllStudents()) {
    if (normalizeName(s.name) === normalized) return s.slug;
  }
  return null;
}
