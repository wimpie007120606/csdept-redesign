/**
 * Parse the scraped "contact" string into office, email, and phone.
 * Contact format is typically newline-separated: "Office: A508\nemail@cs.sun.ac.za\nTelephone: +27 ..."
 */

export interface ParsedContact {
  office: string | null;
  email: string | null;
  phone: string | null;
}

const OFFICE_PREFIX = /^Office:\s*(.+)$/im;
const TELEPHONE_PREFIX = /^Telephone:\s*(.+)$/im;
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

export function parseContact(contact: string): ParsedContact {
  if (!contact || typeof contact !== 'string') {
    return { office: null, email: null, phone: null };
  }
  const lines = contact.split(/\n/).map((s) => s.trim()).filter(Boolean);
  let office: string | null = null;
  let email: string | null = null;
  let phone: string | null = null;

  for (const line of lines) {
    const officeMatch = line.match(OFFICE_PREFIX);
    if (officeMatch) {
      office = officeMatch[1].trim();
      continue;
    }
    const telMatch = line.match(TELEPHONE_PREFIX);
    if (telMatch) {
      phone = telMatch[1].trim();
      continue;
    }
    // Standalone email line
    if (!officeMatch && !telMatch && EMAIL_REGEX.test(line)) {
      const match = line.match(EMAIL_REGEX);
      if (match) email = match[0];
    }
  }
  return { office, email, phone };
}
