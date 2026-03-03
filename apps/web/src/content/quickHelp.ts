/**
 * Quick Help chatbot: predefined Q&A with site links (no AI).
 * Paths are locale-agnostic; prefix with current lang in the widget.
 */

export interface QuickHelpLink {
  label: string;
  path: string; // e.g. /study/undergraduate (no leading locale)
}

export interface QuickHelpItem {
  id: string;
  question: string; // chip label
  answer: string; // short answer text
  links: QuickHelpLink[];
}

/** Webmaster/contact email for "Report a website issue" (use site contact if available). */
export const QUICK_HELP_CONTACT_EMAIL = 'webmaster@cs.sun.ac.za';

export const QUICK_HELP_ITEMS: QuickHelpItem[] = [
  // A) Study / Degrees
  {
    id: 'undergrad-roadmap',
    question: 'Undergraduate roadmap',
    answer: 'Explore our 3-year undergraduate programme structure, focal areas, and module guidelines.',
    links: [{ label: 'Undergraduate studies', path: '/study/undergraduate' }],
  },
  {
    id: 'postgrad-options',
    question: 'Postgraduate options',
    answer: 'We offer Honours, MSc, and PhD programmes in Computer Science with world-class supervision.',
    links: [{ label: 'Postgraduate programmes', path: '/postgraduate' }],
  },
  {
    id: 'honours-info',
    question: 'Honours information',
    answer: 'Honours in Computer Science is a one-year programme. Details and roadmaps are on our Postgraduate page.',
    links: [{ label: 'Postgraduate (Honours, MSc & PhD)', path: '/postgraduate' }],
  },
  {
    id: 'bridging-course',
    question: 'Bridging Course',
    answer: 'A 3-day mini bridge course covering basics, control flow, functions, and arrays. Materials in Java, Python, and C.',
    links: [{ label: 'Bridging Course', path: '/bridging' }],
  },
  // B) People
  {
    id: 'academic-staff',
    question: 'Academic staff',
    answer: 'Browse our academic and administrative staff profiles, research areas, and contact details.',
    links: [{ label: 'People', path: '/people' }],
  },
  {
    id: 'postgrad-students',
    question: 'Postgraduate students',
    answer: 'Meet our Doctoral and Masters students and their research topics.',
    links: [{ label: 'Postgraduate students', path: '/people/students' }],
  },
  // C) Research
  {
    id: 'research-groups',
    question: 'Research groups',
    answer: 'Explore our research groups, members, and publications.',
    links: [{ label: 'Research groups', path: '/research#groups' }],
  },
  {
    id: 'contact-supervisor',
    question: 'How to contact a supervisor?',
    answer: 'Browse our People page for staff profiles and contact details, or use the Contact page for general enquiries.',
    links: [
      { label: 'People', path: '/people' },
      { label: 'Contact', path: '/contact' },
    ],
  },
  // D) Events / Calendar
  {
    id: 'upcoming-events',
    question: 'Upcoming events',
    answer: 'View seminars, workshops, and department events. You can add events to your calendar from the Events page.',
    links: [{ label: 'Events', path: '/events' }],
  },
  {
    id: 'add-to-calendar',
    question: 'Add events to my calendar',
    answer: 'Open the Events page and use the "Add to Calendar" action on each event to download an .ics file or copy the link.',
    links: [{ label: 'Events', path: '/events' }],
  },
  // E) Contact
  {
    id: 'where-located',
    question: 'Where are you located?',
    answer: 'We are in the General Engineering Building on Banghoek Road, Stellenbosch. The map and address are on our Contact page.',
    links: [{ label: 'Contact & map', path: '/contact' }],
  },
  {
    id: 'email-phone',
    question: 'Email / phone',
    answer: 'Department contact details, office hours, and enquiry forms are on the Contact page.',
    links: [{ label: 'Contact', path: '/contact' }],
  },
  {
    id: 'report-issue',
    question: 'Report a website issue',
    answer: `Please email the webmaster at ${QUICK_HELP_CONTACT_EMAIL} with a short description of the issue.`,
    links: [],
  },
  {
    id: 'nothing-helps',
    question: 'Nothing here helps',
    answer: 'No problem — get in touch with us directly. Our Contact page has enquiry forms and details.',
    links: [{ label: 'Contact us', path: '/contact' }],
  },
];

export const QUICK_HELP_GREETING = 'Hi! How can I help you today?';
