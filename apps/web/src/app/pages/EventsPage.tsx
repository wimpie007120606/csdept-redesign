import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router';
import { motion } from 'motion/react';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { useNewsletterModal } from '../components/newsletter/NewsletterModal';
import { AddToCalendarDropdown } from '../components/events/AddToCalendarDropdown';
import { MiniEventsCalendar } from '../components/events/MiniEventsCalendar';
import { upcomingEvents } from '@/content/events';
import { buildCalendarEvent } from '../utils/calendarUtils';

const campusBackground = '/realbackground3.jpeg';

export function EventsPage() {
  const { t } = useTranslation();
  const { openModal } = useNewsletterModal();
  const location = useLocation();
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const scrollToEvent = useCallback((id: string) => {
    const el = document.getElementById(`event-${id}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  // When navigating from Home with hash (e.g. #event-ai-ml-symposium-2026), scroll to that card
  useEffect(() => {
    const hash = location.hash?.slice(1);
    if (hash && hash.startsWith('event-')) {
      const id = hash.replace(/^event-/, '');
      const el = document.getElementById(`event-${id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [location.hash]);

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

      {/* Events List + Mini Calendar */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-12">
            {/* Events list - main content */}
            <div className="flex-1 min-w-0 space-y-6 order-2 lg:order-1">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  id={`event-${event.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="event-card group bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 scroll-mt-24"
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
                      <AddToCalendarDropdown
                        event={buildCalendarEvent(event)}
                        isOpen={openMenuIndex === index}
                        onOpenChange={(open) => setOpenMenuIndex(open ? index : null)}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
            {/* Mini Calendar - beside list on desktop, above on mobile */}
            <div className="lg:w-[320px] flex-shrink-0 order-1 lg:order-2">
              <MiniEventsCalendar
                events={upcomingEvents}
                onScrollToEvent={scrollToEvent}
                showOnlyUpcomingDefault={true}
              />
            </div>
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