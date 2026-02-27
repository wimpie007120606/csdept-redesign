/**
 * Links page data. Edit hrefs and copy here; the /links page renders from this array.
 */

export const STELLENBOSCH_UNIVERSITY_URL = 'https://su.ac.za/en';
/** Change to faculty URL when available; same as SU for now. */
export const SCIENCE_FACULTY_URL = STELLENBOSCH_UNIVERSITY_URL;

export interface LinkCardItem {
  id: string;
  title: string;
  description: string;
  href: string;
  external: boolean;
}

export const linksPageCards: LinkCardItem[] = [
  {
    id: 'stellenbosch-university',
    title: 'Stellenbosch University',
    description: 'Official Stellenbosch University website.',
    href: STELLENBOSCH_UNIVERSITY_URL,
    external: true,
  },
  {
    id: 'science-faculty',
    title: 'Science Faculty',
    description: 'Faculty of Science information and resources.',
    href: SCIENCE_FACULTY_URL,
    external: true,
  },
  {
    id: 'institute-applied-cs',
    title: 'Institute of Applied Computer Science',
    description: 'About the Institute, objectives, members, contact, and past projects.',
    href: '/institute/applied-computer-science',
    external: false,
  },
];
