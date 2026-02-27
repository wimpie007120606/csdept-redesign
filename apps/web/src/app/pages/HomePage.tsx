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
  Brain,
  Network,
  Bot,
  Lock,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

const heroBackground = '/background.jpg';

const homePeople = [
  { name: 'W. H. K. Bester', slug: 'whk-bester', image: '/WillemPeople.jpg', title: 'Technical Officer' },
  { name: 'Lynette van Zijl', slug: 'lynette-van-zijl', image: '/LynettePeople.webp', title: 'Professor' },
  { name: 'Prof. Brink van der Merwe', slug: 'brink-van-der-merwe', image: '/BrinkPeople.jpeg', title: 'Professor' },
  { name: 'Walter Schulze', slug: 'walter-schulze', image: '/WalterPeople.jpeg', title: 'Researcher' },
];

export function HomePage() {
  const { t } = useTranslation();

  const quickAccessTiles = [
    { icon: GraduationCap, labelKey: 'nav.undergraduate', href: '/study/undergraduate', color: 'from-[#7B1E3A] to-[#A33456]' },
    { icon: Award, labelKey: 'nav.postgraduate', href: '/study/postgraduate', color: 'from-[#C8A951] to-[#E0C87A]' },
    { icon: BookOpen, labelKey: 'nav.bridging', href: '/bridging', color: 'from-[#0B1C2D] to-[#7B1E3A]' },
    { icon: Sparkles, labelKey: 'nav.research', href: '/research', color: 'from-[#0B1C2D] to-[#1A2F43]' },
    { icon: Users, labelKey: 'nav.people', href: '/people', color: 'from-[#7B1E3A] to-[#5C1628]' },
    { icon: Newspaper, labelKey: 'nav.news', href: '/news', color: 'from-[#C8A951] to-[#7B1E3A]' },
    { icon: Calendar, labelKey: 'nav.events', href: '/events', color: 'from-[#0B1C2D] to-[#7B1E3A]' },
  ];

  const researchHighlights = [
    { icon: Brain, titleKey: 'home.aiTitle', descKey: 'home.aiDesc', image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbWFjaGluZSUyMGxlYXJuaW5nfGVufDF8fHx8MTc3MjA4MjY4OHww&ixlib=rb-4.1.0&q=80&w=1080' },
    { icon: Bot, titleKey: 'home.roboticsTitle', descKey: 'home.roboticsDesc', image: 'https://images.unsplash.com/photo-1758295746012-41650245a9bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGVuZ2luZWVyaW5nJTIwbGFib3JhdG9yeXxlbnwxfHx8fDE3NzIxMjEwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { icon: Network, titleKey: 'home.networksTitle', descKey: 'home.networksDesc', image: 'https://images.unsplash.com/photo-1768224656445-33d078c250b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwY3liZXJzZWN1cml0eSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyMDQ0MTkyfDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { icon: Lock, titleKey: 'home.cyberTitle', descKey: 'home.cyberDesc', image: 'https://images.unsplash.com/photo-1762279389083-abf71f22d338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzcyMDg3ODI3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  ];

  const newsItems = [
    { date: 'Feb 20, 2026', categoryKey: 'home.news1Category', titleKey: 'home.news1Title', descKey: 'home.news1Desc' },
    { date: 'Feb 15, 2026', categoryKey: 'home.news2Category', titleKey: 'home.news2Title', descKey: 'home.news2Desc' },
    { date: 'Feb 10, 2026', categoryKey: 'home.news3Category', titleKey: 'home.news3Title', descKey: 'home.news3Desc' },
  ];

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

      {/* Research Highlights */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-4">
              {t('home.researchExcellence')}
            </div>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('home.worldClassResearch')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.worldClassResearchSub')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-full bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={highlight?.image ?? ''}
                      alt={t(highlight.titleKey)}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
                        <highlight.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-2">
                      {t(highlight.titleKey)}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{t(highlight.descKey)}</p>
<LocalizedLink 
                      to="/research"
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all"
                    >
                      {t('home.learnMore')}
                      <ArrowRight className="w-4 h-4" />
                    </LocalizedLink>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
            {newsItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-full p-6 bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {t(item.categoryKey)}
                    </span>
                  </div>
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-3">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{t(item.descKey)}</p>
<LocalizedLink 
                    to="/news"
                    className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                  >
                    {t('home.readMore')}
                    <ArrowRight className="w-4 h-4" />
                  </LocalizedLink>
                </div>
              </motion.div>
            ))}
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
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="group flex flex-col sm:flex-row gap-6 p-6 bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-x-2">
                  <div className="flex-shrink-0 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-xl flex flex-col items-center justify-center text-white">
                      <div className="text-2xl font-bold">{parts[1] ?? ''}</div>
                      <div className="text-xs uppercase">{parts[0] ?? ''}</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-2">
                      {t(event.titleKey)}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {t(event.timeKey)}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {t(event.locationKey)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button className="px-6 py-3 bg-primary/10 text-primary rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
                      {t('home.register')}
                    </button>
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