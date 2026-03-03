/**
 * Normalized staff entries from academic and administrative JSON.
 * Merged and deduped by normalized name in fallback.ts.
 */

import { parseContact } from '../app/utils/parseContact';
import { slugifyName, normalizedNameKey } from '../app/utils/slugifyName';
import { getStaffImagePath } from '../app/utils/staffImagePath';

export interface JsonStaffRow {
  name: string;
  contact: string;
  research?: string;
}

export interface NormalizedStaffCard {
  id: string;
  slug: string;
  name: string;
  primaryTitle: string;
  secondaryTitle: string | null;
  department: string;
  office: string;
  email: string;
  phone: string | null;
  image: string;
  researchAreas: string[];
  category: 'academic' | 'administrative';
}

const DEPARTMENT = 'Computer Science Division, Department of Mathematical Sciences';

function parseNameAndTitle(nameField: string): { fullName: string; primaryTitle: string } {
  const lines = nameField.split(/\n/).map((s) => s.trim()).filter(Boolean);
  const fullName = lines[0] ?? '';
  const primaryTitle = lines[1] ?? '';
  return { fullName, primaryTitle };
}

/** If research looks like contact (office/email), return empty array. */
function parseResearch(research: string | undefined): string[] {
  if (!research || typeof research !== 'string') return [];
  const t = research.trim();
  if (/^Office:\s/i.test(t) || /@/.test(t) && /^(Office:)?\s*[^,]+@/.test(t)) return [];
  return t.split(',').map((s) => s.trim()).filter(Boolean);
}

function normalizeRow(row: JsonStaffRow, category: 'academic' | 'administrative'): NormalizedStaffCard | null {
  const { fullName, primaryTitle } = parseNameAndTitle(row.name);
  if (!fullName) return null;
  const slug = slugifyName(fullName);
  if (!slug) return null;
  const contact = parseContact(row.contact);
  const researchAreas = category === 'academic' ? parseResearch(row.research) : [];
  return {
    id: slug,
    slug,
    name: fullName,
    primaryTitle: primaryTitle || (category === 'administrative' ? 'Staff' : 'Academic'),
    secondaryTitle: category === 'academic' ? 'Academic Staff' : 'Administrative Staff',
    department: DEPARTMENT,
    office: contact.office ?? '',
    email: contact.email ?? '',
    phone: contact.phone ?? null,
    image: getStaffImagePath(fullName),
    researchAreas,
    category,
  };
}

/** Build all staff from JSON; dedupe by normalized name key is done in fallback. */
export function buildStaffFromJson(
  academicRows: JsonStaffRow[],
  administrativeRows: JsonStaffRow[]
): NormalizedStaffCard[] {
  const byKey = new Map<string, NormalizedStaffCard>();
  for (const row of administrativeRows) {
    const card = normalizeRow(row, 'administrative');
    if (card) byKey.set(normalizedNameKey(card.name), card);
  }
  for (const row of academicRows) {
    const card = normalizeRow(row, 'academic');
    if (card) {
      const key = normalizedNameKey(card.name);
      if (!byKey.has(key)) byKey.set(key, card);
    }
  }
  return Array.from(byKey.values());
}
