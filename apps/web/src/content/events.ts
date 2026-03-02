/**
 * Single source of truth for upcoming events (Events page list + Mini Calendar).
 * Do not add fake events; this list powers both the event cards and the calendar.
 */

export interface UpcomingEvent {
  id: string;
  date: { day: string; month: string };
  year: number;
  title: string;
  time: string;
  location: string;
  description: string;
  type: string;
}

const MONTH_MAP: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: 'ai-ml-symposium-2026',
    date: { day: '5', month: 'Mar' },
    year: 2026,
    title: 'AI & Machine Learning Symposium 2026',
    time: '09:00 - 17:00',
    location: 'Main Auditorium, Stellenbosch Campus',
    description: 'Annual symposium featuring keynotes from leading AI researchers, technical presentations, and networking opportunities.',
    type: 'Conference',
  },
  {
    id: 'phd-research-seminar-mar',
    date: { day: '12', month: 'Mar' },
    year: 2026,
    title: 'PhD Research Seminar Series',
    time: '14:00 - 16:00',
    location: 'Seminar Room 1',
    description: 'Monthly seminar showcasing cutting-edge research from our doctoral candidates.',
    type: 'Seminar',
  },
  {
    id: 'industry-career-fair-mar',
    date: { day: '20', month: 'Mar' },
    year: 2026,
    title: 'Industry Career Fair',
    time: '10:00 - 18:00',
    location: 'Campus Center',
    description: 'Connect with leading tech companies, explore career opportunities, and network with industry professionals.',
    type: 'Career',
  },
  {
    id: 'cybersecurity-workshop-mar',
    date: { day: '28', month: 'Mar' },
    year: 2026,
    title: 'Cybersecurity Workshop',
    time: '13:00 - 17:00',
    location: 'Computer Lab 2',
    description: 'Hands-on workshop on modern cybersecurity practices and tools for students and professionals.',
    type: 'Workshop',
  },
  {
    id: 'robotics-competition-finals-apr',
    date: { day: '5', month: 'Apr' },
    year: 2026,
    title: 'Robotics Competition Finals',
    time: '10:00 - 16:00',
    location: 'Engineering Building',
    description: 'Watch student teams compete in autonomous robotics challenges with their innovative designs.',
    type: 'Competition',
  },
  {
    id: 'guest-lecture-quantum-computing-apr',
    date: { day: '15', month: 'Apr' },
    year: 2026,
    title: 'Guest Lecture: Future of Quantum Computing',
    time: '15:00 - 16:30',
    location: 'Main Auditorium',
    description: 'Distinguished guest speaker from MIT discusses quantum computing breakthroughs and future directions.',
    type: 'Lecture',
  },
];

export { MONTH_MAP };

