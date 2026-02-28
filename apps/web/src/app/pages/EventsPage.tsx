import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, ArrowRight, ChevronDown } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import {
  type CalendarEvent,
  triggerIcsDownload,
  buildGoogleCalendarUrl,
  buildOutlookCalendarUrl,
} from '../utils/calendar';
import { useNewsletterModal } from '../components/newsletter/NewsletterModal';

const campusBackground = '/realbackground3.jpeg';

export function EventsPage() {
  const { t } = useTranslation();
  const { openModal } = useNewsletterModal();
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const upcomingEvents = [
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

  type UpcomingEvent = (typeof upcomingEvents)[number];

  const monthMap: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  function buildCalendarEvent(event: UpcomingEvent): CalendarEvent | null {
    const monthIndex = monthMap[event.date.month];
    const day = parseInt(event.date.day, 10);
    if (Number.isNaN(day) || monthIndex === undefined) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.warn('[events] Invalid date for calendar event', event);
      }
      return null;
    }

    const [startStr, endStr] = event.time.split('-').map((part) => part.trim());
    const [startHourStr, startMinuteStr] = (startStr ?? '').split(':');
    const [endHourStr, endMinuteStr] = (endStr ?? '').split(':');

    const startHour = Number.parseInt(startHourStr ?? '0', 10);
    const startMinute = Number.parseInt(startMinuteStr ?? '0', 10);
    const endHour = Number.isNaN(Number.parseInt(endHourStr ?? '', 10))
      ? startHour + 1
      : Number.parseInt(endHourStr ?? '0', 10);
    const endMinute = Number.isNaN(Number.parseInt(endMinuteStr ?? '', 10))
      ? startMinute
      : Number.parseInt(endMinuteStr ?? '0', 10);

    const start = new Date(event.year, monthIndex, day, startHour, startMinute, 0);
    const end = new Date(event.year, monthIndex, day, endHour, endMinute, 0);

    return {
      id: event.id,
      title: event.title,
      description: event.description,
      location: event.location,
      start,
      end,
      timezone: 'Africa/Johannesburg',
    };
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-32 text-white min-h-[650px] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${campusBackground})` }}
        />
        {/* Refined Dark Overlay - more neutral, less pink/red */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/90 via-[#0B1C2D]/85 to-[#0B1C2D]/80" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Editorial Label with Divider */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-6">
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-[color:var(--su-gold)]/40 to-transparent max-w-[200px]"></div>
                  <span className="text-[color:var(--su-gold)] text-xs uppercase tracking-[0.2em] font-medium font-['Spectral']">
                    Events & Seminars
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[color:var(--su-gold)]/40 to-transparent max-w-[200px]"></div>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="font-['Spectral'] text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight">
                {t('events.heroTitle')}
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
                {t('events.heroSub')}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Events List */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="event-card group bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Date Badge */}
                  <div className="lg:w-32 flex-shrink-0 bg-gradient-to-br from-primary to-secondary text-white p-6 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold font-['Playfair_Display']">{event.date.day}</div>
                    <div className="text-lg uppercase tracking-wide">{event.date.month}</div>
                    <div className="mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                      {event.type}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 p-6">
                    <h3 className="font-['Playfair_Display'] text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{event.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{event.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="relative">
                        <button
                          type="button"
                          className="add-to-calendar-trigger px-6 py-2 bg-secondary/10 text-secondary rounded-xl font-semibold hover:bg-secondary/20 transition-all inline-flex items-center gap-2"
                          aria-haspopup="true"
                          aria-expanded={openMenuIndex === index}
                          onClick={() =>
                            setOpenMenuIndex(openMenuIndex === index ? null : index)
                          }
                        >
                          {t('events.addToCalendar')}
                          <Calendar className="w-4 h-4 text-[color:var(--su-gold)]" />
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        {openMenuIndex === index && (
                          <div
                            className="add-to-calendar-dropdown mt-2 w-full sm:w-64 rounded-xl border border-border bg-card shadow-xl py-2"
                            role="menu"
                          >
                            <button
                              type="button"
                              className="w-full px-4 py-2 text-left text-sm hover:bg-secondary/10 flex items-center gap-2"
                              onClick={() => {
                                const calEvent = buildCalendarEvent(event);
                                if (!calEvent) return;
                                triggerIcsDownload(calEvent);
                                setOpenMenuIndex(null);
                              }}
                            >
                              {t('events.addToCalendarApple')}
                            </button>
                            <a
                              href={
                                (() => {
                                  const calEvent = buildCalendarEvent(event);
                                  return calEvent ? buildGoogleCalendarUrl(calEvent) : '#';
                                })()
                              }
                              onClick={(e) => {
                                const calEvent = buildCalendarEvent(event);
                                if (!calEvent) {
                                  e.preventDefault();
                                  return;
                                }
                                setOpenMenuIndex(null);
                              }}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full px-4 py-2 text-left text-sm hover:bg-secondary/10"
                              role="menuitem"
                            >
                              {t('events.addToCalendarGoogle')}
                            </a>
                            <a
                              href={
                                (() => {
                                  const calEvent = buildCalendarEvent(event);
                                  return calEvent ? buildOutlookCalendarUrl(calEvent) : '#';
                                })()
                              }
                              onClick={(e) => {
                                const calEvent = buildCalendarEvent(event);
                                if (!calEvent) {
                                  e.preventDefault();
                                  return;
                                }
                                setOpenMenuIndex(null);
                              }}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full px-4 py-2 text-left text-sm hover:bg-secondary/10"
                              role="menuitem"
                            >
                              {t('events.addToCalendarOutlook')}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[color:var(--su-maroon)] to-[#0B1C2D] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6">
              Never Miss an Event
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Subscribe to email updates to stay informed about upcoming events and seminars.
            </p>
            <button
              type="button"
              onClick={openModal}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[color:var(--su-maroon)] rounded-xl font-semibold hover:bg-[color:var(--su-gold)] hover:text-white transition-all duration-300 shadow-2xl"
            >
              Subscribe to Updates
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}