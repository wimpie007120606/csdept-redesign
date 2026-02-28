import { LocalizedLink } from '../components/LocalizedLink';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Award,
  Users,
  Calendar,
  Newspaper,
  ArrowRight,
  Sparkles,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { useState } from 'react';
import { useNewsForHome, formatNewsDate } from '../hooks/useNews';
import { type CalendarEvent } from '../utils/calendar';
import { AddToCalendarDropdown } from '../components/events/AddToCalendarDropdown';
import { researchGroups, RESEARCH_GROUP_IMAGE_FALLBACK } from '@/content/researchGroups';

const heroBackground = '/realbackground2.jpg';

/** Month name (short) to index for Home page event dates (e.g. "Mar" -> 2). */
const HOME_MONTH_MAP: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

/**
 * Build a CalendarEvent from Home page i18n event (dateStr e.g. "Mar 5", timeStr e.g. "09:00 - 17:00").
 * Reuses same calendar logic as Events page; uses Africa/Johannesburg.
 */
function homeEventToCalendarEvent(
  id: string,
  title: string,
  dateStr: string,
  timeStr: string,
  location: string
): CalendarEvent | null {
  const parts = dateStr.trim().split(/\s+/);
  const monthStr = parts[0] ?? '';
  const day = parseInt(parts[1] ?? '', 10);
  const monthIndex = HOME_MONTH_MAP[monthStr];
  if (Number.isNaN(day) || monthIndex === undefined) return null;

  const now = new Date();
  let year = now.getFullYear();
  const trial = new Date(year, monthIndex, day);
  if (trial < now) year += 1;

  const [startStr, endStr] = timeStr.split('-').map((p) => p.trim());
  const [startHourStr, startMinuteStr] = (startStr ?? '').split(':');
  const [endHourStr, endMinuteStr] = (endStr ?? '').split(':');
  const startHour = Number.parseInt(startHourStr ?? '0', 10);
  const startMinute = Number.parseInt(startMinuteStr ?? '0', 10);
  const endHour = Number.isNaN(Number.parseInt(endHourStr ?? '', 10)) ? startHour + 1 : Number.parseInt(endHourStr ?? '0', 10);
  const endMinute = Number.isNaN(Number.parseInt(endMinuteStr ?? '', 10)) ? startMinute : Number.parseInt(endMinuteStr ?? '0', 10);

  const start = new Date(year, monthIndex, day, startHour, startMinute, 0);
  const end = new Date(year, monthIndex, day, endHour, endMinute, 0);
  return {
    id,
    title,
    location,
    start,
    end,
    timezone: 'Africa/Johannesburg',
  };
}
const NEWS_FALLBACK_IMAGE = '/realbackground2.jpg';

const homePeople = [
  { name: 'W. H. K. Bester', slug: 'whk-bester', image: '/WillemPeople.jpg', title: 'Technical Officer' },
  { name: 'Lynette van Zijl', slug: 'lynette-van-zijl', image: '/LynettePeople.webp', title: 'Professor' },
  { name: 'Prof. Brink van der Merwe', slug: 'brink-van-der-merwe', image: '/BrinkPeople.jpeg', title: 'Professor' },
  { name: 'Walter Schulze', slug: 'walter-schulze', image: '/WalterPeople.jpeg', title: 'Researcher' },
];

export function HomePage() {
  const { t, language } = useTranslation();
  const { items: homeNewsItems, loading: homeNewsLoading, error: homeNewsError } = useNewsForHome(language);
  const [homeCalendarOpenIndex, setHomeCalendarOpenIndex] = useState<number | null>(null);

  const quickAccessTiles = [
    { icon: GraduationCap, labelKey: 'nav.undergraduate', href: '/study/undergraduate', color: 'from-[#7B1E3A] to-[#A33456]' },
    { icon: Award, labelKey: 'nav.postgraduate', href: '/study/postgraduate', color: 'from-[#C8A951] to-[#E0C87A]' },
    { icon: BookOpen, labelKey: 'nav.bridging', href: '/bridging', color: 'from-[#0B1C2D] to-[#7B1E3A]' },
    { icon: Sparkles, labelKey: 'nav.research', href: '/research', color: 'from-[#0B1C2D] to-[#1A2F43]' },
    { icon: Users, labelKey: 'nav.people', href: '/people', color: 'from-[#7B1E3A] to-[#5C1628]' },
    { icon: Newspaper, labelKey: 'nav.news', href: '/news', color: 'from-[#C8A951] to-[#7B1E3A]' },
    { icon: Calendar, labelKey: 'nav.events', href: '/events', color: 'from-[#0B1C2D] to-[#7B1E3A]' },
  ];

  /** First 4 research groups from same source as Research page (single source of truth). */
  const homeResearchGroups = researchGroups.slice(0, 4);

  const upcomingEvents = [
    { dateKey: 'home.event1Date', titleKey: 'home.event1Title', timeKey: 'home.event1Time', locationKey: 'home.event1Location' },
    { dateKey: 'home.event2Date', titleKey: 'home.event2Title', timeKey: 'home.event2Time', locationKey: 'home.event2Location' },
    { dateKey: 'home.event3Date', titleKey: 'home.event3Title', timeKey: 'home.event3Time', locationKey: 'home.event3Location' },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section - same layout as other pages */}
      <section className="relative py-32 text-white overflow-hidden min-h-[500px] flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/90 via-[#0B1C2D]/85 to-[#0B1C2D]/80" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <span className="text-[#C8A951] text-xs uppercase tracking-[0.2em] font-medium font-['Spectral']">
                    {t('home.heroLabel')}
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C8A951]/40 to-transparent max-w-[200px]" />
                </div>
              </div>

              <h1 className="font-['Spectral'] text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.1] tracking-tight">
                {t('home.heroTitle')}
                <br />
                <span className="text-[#C8A951]">{t('home.heroTitleHighlight')}</span>
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed font-light">
                {t('home.heroSubtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
<LocalizedLink 
                  to="/study/undergraduate"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-[#7B1E3A] rounded-xl font-semibold hover:bg-[#C8A951] hover:text-white transition-all duration-300 shadow-2xl"
                >
                  {t('home.exploreProgrammes')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </LocalizedLink>
<LocalizedLink 
                  to="/people"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white hover:text-[#7B1E3A] transition-all duration-300"
                >
                  {t('home.meetResearchers')}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </LocalizedLink>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Welcome / Bio */}
      <section aria-labelledby="welcome-heading" className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative pl-6 border-l-4 border-[#7B1E3A] bg-card rounded-r-2xl shadow-sm p-8 lg:p-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#C8A951] text-xs uppercase tracking-[0.2em] font-medium font-['Spectral']">
                  {t('home.aboutUs')}
                </span>
                <div className="h-[1px] flex-1 max-w-[80px] bg-gradient-to-r from-[#C8A951]/40 to-transparent" />
              </div>
              <h2 id="welcome-heading" className="font-['Spectral'] text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('home.welcomeTitle')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {t('home.welcomeIntro')}
              </p>
              <div className="space-y-4 text-foreground/90 leading-relaxed">
                <p>{t('home.welcomeHistory1')}</p>
                <p>{t('home.welcomeHistory2')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Access Tiles */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickAccessTiles.map((tile, index) => (
              <motion.div
                key={tile.labelKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
<LocalizedLink 
                  to={tile.href}
                  className="group block p-6 bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${tile.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <tile.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-semibold text-sm text-foreground">{t(tile.labelKey)}</div>
                </LocalizedLink>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Highlights — same source as Research page (content/researchGroups) */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center sm:text-left"
            >
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-4">
                {t('home.researchExcellence')}
              </div>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-foreground mb-2">
                {t('home.worldClassResearch')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                {t('home.worldClassResearchSub')}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center sm:justify-end"
            >
              <LocalizedLink
                to="/research"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                {t('home.viewAllResearchGroups')}
                <ArrowRight className="w-5 h-5" />
              </LocalizedLink>
            </motion.div>
          </div>

          {homeResearchGroups.length === 0 ? (
            <div className="rounded-2xl bg-card border border-border p-12 text-center">
              <p className="text-muted-foreground mb-6">{t('research.overviewSub')}</p>
              <LocalizedLink
                to="/research"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                {t('home.viewAllResearchGroups')}
                <ArrowRight className="w-4 h-4" />
              </LocalizedLink>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeResearchGroups.map((group, index) => {
              const title = t(`research.groups.${group.slug}.title`) || group.title;
              const summary = t(`research.groups.${group.slug}.summary`) || group.summary;
              return (
                <motion.div
                  key={group.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <LocalizedLink
                    to={`/research#${group.slug}`}
                    className="block h-full rounded-2xl focus:outline-none focus:ring-2 focus:ring-[color:var(--su-maroon)] focus:ring-inset"
                  >
                    <div className="su-card relative h-full bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl border border-border hover:border-[#7B1E3A]/30 transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-[16/10] overflow-hidden bg-muted">
                        <img
                          src={group.categoryImage}
                          alt={title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const el = e.currentTarget;
                            el.onerror = null;
                            el.src = RESEARCH_GROUP_IMAGE_FALLBACK;
                          }}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-2 line-clamp-2">
                          {title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                          {summary}
                        </p>
                        <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                          {t('research.exploreGroup')}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </LocalizedLink>
                </motion.div>
              );
            })}
          </div>
          )}
        </div>
      </section>

      {/* Faculty Spotlight - four people photos */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-4">
              {t('home.facultyExcellence')}
            </div>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('home.learnFromLeaders')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t('home.learnFromLeadersSub')}
            </p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {homePeople.map((person, index) => (
              <motion.div
                key={person.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
<LocalizedLink 
                  to={`/people/${person.slug}`}
                  className="group block text-center"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg mb-4 ring-2 ring-transparent group-hover:ring-[#7B1E3A] transition-all">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2D]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-['Spectral'] text-lg font-bold text-foreground group-hover:text-[#7B1E3A] transition-colors">
                    {person.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{person.title}</p>
                </LocalizedLink>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
<LocalizedLink 
              to="/people"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
            >
              {t('home.meetFaculty')}
              <ArrowRight className="w-5 h-5" />
            </LocalizedLink>
          </motion.div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-4">
                {t('home.latestUpdates')}
              </div>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-foreground">
                {t('home.newsAnnouncements')}
              </h2>
            </div>
<LocalizedLink 
              to="/news"
              className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              {t('home.viewAllNews')}
              <ArrowRight className="w-5 h-5" />
            </LocalizedLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homeNewsLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-40 bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-1/3" />
                    <div className="h-5 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </div>
              ))
            ) : homeNewsError || homeNewsItems.length === 0 ? (
              <div className="md:col-span-3 flex flex-col items-center justify-center py-12 px-4 rounded-2xl bg-card border border-border text-center">
                <p className="text-muted-foreground font-medium mb-4">
                  {homeNewsError ? t('news.apiError') ?? 'Unable to load news.' : t('news.noItems') ?? 'No articles right now.'}
                </p>
                <LocalizedLink
                  to="/news"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  {t('home.viewAllNews')}
                  <ArrowRight className="w-4 h-4" />
                </LocalizedLink>
              </div>
            ) : (
              homeNewsItems.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="h-full flex flex-col bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-40 overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || NEWS_FALLBACK_IMAGE}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const el = e.currentTarget;
                        if (el.src !== NEWS_FALLBACK_IMAGE) el.src = NEWS_FALLBACK_IMAGE;
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold rounded-full">
                        {item.categoryTags?.[0] ?? item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{formatNewsDate(item.publishedAt)}</span>
                      {item.source && (
                        <>
                          <span aria-hidden>·</span>
                          <span className="truncate">{item.source}</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-3 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                      {item.summary || item.title}
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all w-fit"
                    >
                      {t('home.readMore')}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-4">
                {t('home.upcomingEvents')}
              </div>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-foreground">
                {t('home.joinEvents')}
              </h2>
            </div>
<LocalizedLink 
              to="/events"
              className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              {t('home.viewAllEvents')}
              <ArrowRight className="w-5 h-5" />
            </LocalizedLink>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map((event, index) => {
              const dateStr = t(event.dateKey);
              const parts = dateStr.split(' ');
              const title = t(event.titleKey);
              const timeStr = t(event.timeKey);
              const location = t(event.locationKey);
              const eventId = `home-event-${index + 1}`;
              const calEvent = homeEventToCalendarEvent(eventId, title, dateStr, timeStr, location);
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="group flex flex-col sm:flex-row gap-6 p-6 bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-x-2 event-card">
                  <div className="flex-shrink-0 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-xl flex flex-col items-center justify-center text-white">
                      <div className="text-2xl font-bold">{parts[1] ?? ''}</div>
                      <div className="text-xs uppercase">{parts[0] ?? ''}</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-2">
                      {title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        {timeStr}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <AddToCalendarDropdown
                      event={calEvent}
                      isOpen={homeCalendarOpenIndex === index}
                      onOpenChange={(open) => setHomeCalendarOpenIndex(open ? index : null)}
                    />
                  </div>
                </div>
              </motion.div>
            );})}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#7B1E3A] via-[#A33456] to-[#0B1C2D] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6">
              {t('home.readyTitle')}
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
              {t('home.readySub')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
<LocalizedLink 
                to="/study/undergraduate"
                className="px-8 py-4 bg-white text-[#7B1E3A] rounded-xl font-semibold hover:bg-[#C8A951] hover:text-white transition-all duration-300 shadow-2xl"
              >
                {t('home.applyNow')}
              </LocalizedLink>
<LocalizedLink 
                to="/contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white hover:text-[#7B1E3A] transition-all duration-300"
              >
                {t('home.collaborateWithUs')}
              </LocalizedLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}