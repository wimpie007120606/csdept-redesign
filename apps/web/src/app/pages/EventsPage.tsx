import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

const campusBackground = '/realbackground3.jpeg';

export function EventsPage() {
  const { t } = useTranslation();
  const upcomingEvents = [
    {
      date: { day: '5', month: 'Mar' },
      title: 'AI & Machine Learning Symposium 2026',
      time: '09:00 - 17:00',
      location: 'Main Auditorium, Stellenbosch Campus',
      description: 'Annual symposium featuring keynotes from leading AI researchers, technical presentations, and networking opportunities.',
      capacity: 250,
      registered: 180,
      type: 'Conference',
    },
    {
      date: { day: '12', month: 'Mar' },
      title: 'PhD Research Seminar Series',
      time: '14:00 - 16:00',
      location: 'Seminar Room 1',
      description: 'Monthly seminar showcasing cutting-edge research from our doctoral candidates.',
      capacity: 80,
      registered: 45,
      type: 'Seminar',
    },
    {
      date: { day: '20', month: 'Mar' },
      title: 'Industry Career Fair',
      time: '10:00 - 18:00',
      location: 'Campus Center',
      description: 'Connect with leading tech companies, explore career opportunities, and network with industry professionals.',
      capacity: 500,
      registered: 320,
      type: 'Career',
    },
    {
      date: { day: '28', month: 'Mar' },
      title: 'Cybersecurity Workshop',
      time: '13:00 - 17:00',
      location: 'Computer Lab 2',
      description: 'Hands-on workshop on modern cybersecurity practices and tools for students and professionals.',
      capacity: 60,
      registered: 55,
      type: 'Workshop',
    },
    {
      date: { day: '5', month: 'Apr' },
      title: 'Robotics Competition Finals',
      time: '10:00 - 16:00',
      location: 'Engineering Building',
      description: 'Watch student teams compete in autonomous robotics challenges with their innovative designs.',
      capacity: 200,
      registered: 85,
      type: 'Competition',
    },
    {
      date: { day: '15', month: 'Apr' },
      title: 'Guest Lecture: Future of Quantum Computing',
      time: '15:00 - 16:30',
      location: 'Main Auditorium',
      description: 'Distinguished guest speaker from MIT discusses quantum computing breakthroughs and future directions.',
      capacity: 300,
      registered: 210,
      type: 'Lecture',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-32 text-white overflow-hidden min-h-[650px] flex items-center">
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
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-[#C8A951]/40 to-transparent max-w-[200px]"></div>
                  <span className="text-[#C8A951] text-xs uppercase tracking-[0.2em] font-medium font-['Spectral']">
                    Events & Seminars
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C8A951]/40 to-transparent max-w-[200px]"></div>
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
                className="group bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">
                          {event.registered}/{event.capacity} registered
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                          style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all">
                        Register Now
                      </button>
                      <button className="px-6 py-2 bg-secondary/10 text-secondary rounded-xl font-semibold hover:bg-secondary/20 transition-all inline-flex items-center gap-2">
                        Add to Calendar
                        <Calendar className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#7B1E3A] to-[#0B1C2D] text-white">
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
              Subscribe to our calendar to stay updated on all upcoming events and seminars
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#7B1E3A] rounded-xl font-semibold hover:bg-[#C8A951] hover:text-white transition-all duration-300 shadow-2xl">
              Subscribe to Calendar
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}