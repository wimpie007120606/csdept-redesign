import { useRef, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LocalizedLink } from '../components/LocalizedLink';
import {
  FileText,
  Users,
  ArrowRight,
  ArrowUp,
  ExternalLink,
  Search,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { researchGroups, RESEARCH_GROUP_IMAGE_FALLBACK, type ResearchGroup } from '@/content/researchGroups';
import { MemberAvatar } from '../components/MemberAvatar';
import { useTranslation } from '@/i18n/useTranslation';
import {
  getAllPublications,
  getPeopleWithPublications,
  type NormalizedPublication,
} from '@/content/publications';
import { peopleMeta, peopleById, peopleBySlug, type PersonMeta } from '@/content/people';

const campusBackground = '/realbackground3.jpeg';

const impactMetricKeys = [
  { value: '50+', labelKey: 'research.metrics.publications', icon: FileText },
  { value: '20+', labelKey: 'research.metrics.researchers', icon: Users },
];

const SLUG_TO_NAME: Record<string, string> = {
  'lynette-van-zijl': 'Lynette van Zijl',
  'whk-bester': 'W. H. K. Bester',
  'brink-van-der-merwe': 'Prof. Brink van der Merwe',
  'walter-schulze': 'Walter Schulze',
  'bernd-fischer': 'Prof. Bernd Fischer',
  'jaco-geldenhuys': 'Dr. Jaco Geldenhuys',
  'cornelia-inggs': 'Dr. Cornelia P. Inggs',
  'willem-visser': 'Prof. Willem Visser',
  'steve-kroon': 'Prof. Steve Kroon',
};

interface GroupMemberView {
  id: string;
  name: string;
  role?: string;
  slug?: string;
}

function filterPublications(
  list: NormalizedPublication[],
  searchQuery: string,
  authorSlug: string
): NormalizedPublication[] {
  let out = list;
  const q = searchQuery.trim().toLowerCase();
  if (q) {
    out = out.filter((p) => {
      const citation = (p.citation ?? '').toLowerCase();
      const title = (p.title ?? '').toLowerCase();
      const authors = (p.authors ?? '').toLowerCase();
      const venue = (p.venue ?? '').toLowerCase();
      const note = (p.note ?? '').toLowerCase();
      return citation.includes(q) || title.includes(q) || authors.includes(q) || venue.includes(q) || note.includes(q);
    });
  }
  if (authorSlug) {
    out = out.filter((p) => p.personSlugs.includes(authorSlug));
  }
  return out;
}

function buildGroupMembers(group: ResearchGroup): (GroupMemberView & { photo?: string | null })[] {
  return group.memberIds.map((id) => {
    const meta: PersonMeta | undefined = peopleById.get(id);
      if (!meta) {
      if (typeof import.meta !== 'undefined' && (import.meta as any).env?.DEV) {
        // eslint-disable-next-line no-console
        console.warn(`[research] Missing personMeta for id="${id}" in group "${group.slug}"`);
      }
      return {
        id,
        name: id,
        role: group.memberRoles?.[id],
        slug: undefined,
        photo: null,
      };
    }
    return {
      id: meta.id,
      name: meta.name,
      role: group.memberRoles?.[meta.id],
      slug: meta.slug,
      photo: meta.photo ?? null,
    };
  });
}

function validateResearchData(): void {
  if (typeof import.meta === 'undefined' || !(import.meta as any).env?.DEV) return;

  const knownIds = new Set(peopleMeta.map((p) => p.id));

  for (const group of researchGroups) {
    for (const id of group.memberIds) {
      if (!knownIds.has(id)) {
        // eslint-disable-next-line no-console
        console.warn(`[research] memberId "${id}" in group "${group.slug}" has no matching PersonMeta.`);
      }
    }
  }
}

export function ResearchPage() {
  validateResearchData();
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const [pubSearch, setPubSearch] = useState('');
  const [pubAuthorFilter, setPubAuthorFilter] = useState('');
  const [expandedYears, setExpandedYears] = useState<Set<number>>(() => {
    const all = getAllPublications();
    const years = [...new Set(all.map((p) => p.year))].sort((a, b) => b - a);
    return new Set(years.slice(0, 5)); // default expand recent 5 years
  });

  const allPublications = useMemo(() => getAllPublications(), []);
  const peopleWithPubs = useMemo(() => getPeopleWithPublications(), []);
  const filteredPublications = useMemo(
    () => filterPublications(allPublications, pubSearch, pubAuthorFilter),
    [allPublications, pubSearch, pubAuthorFilter]
  );
  const byYear = useMemo(() => {
    const map = new Map<number, NormalizedPublication[]>();
    for (const p of filteredPublications) {
      const arr = map.get(p.year) ?? [];
      arr.push(p);
      map.set(p.year, arr);
    }
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [filteredPublications]);

  const toggleYear = (year: number) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  };
  const expandAllYears = () => setExpandedYears(new Set(byYear.map(([y]) => y)));
  const collapseAllYears = () => setExpandedYears(new Set());

  return (
    <div ref={containerRef} className="pt-20">
      {/* Hero */}
      <section className="relative py-32 text-white overflow-hidden min-h-[500px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${campusBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/90 via-[#0B1C2D]/85 to-[#0B1C2D]/80" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-8"
            >
              <div className="flex items-center justify-center gap-6">
                <div className="h-[1px] flex-1 bg-gradient-to-l from-[#C8A951]/40 to-transparent max-w-[200px]" />
                <span className="text-[#C8A951] text-xs uppercase tracking-[0.2em] font-medium font-['Spectral']">
                  {t('research.heroLabel')}
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C8A951]/40 to-transparent max-w-[200px]" />
              </div>
              <h1 className="font-['Spectral'] text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight">
                {t('research.heroTitle')}
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
                {t('research.heroSubtitle')}
              </p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Sticky sub-nav: Research categories */}
      <nav
        aria-label="Research categories"
        className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border py-3"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {researchGroups.map((group) => {
              const title = t(`research.groups.${group.slug}.title`);
              const truncated = title.includes(' and ') ? title.split(' and ')[0] + '…' : title;
              return (
              <a
                key={group.slug}
                href={`#${group.slug}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--research-card-accent)] focus:ring-offset-2"
              >
                {truncated}
              </a>
            );})}
          </div>
        </div>
      </nav>

      {/* Research Overview: intro + grid of category cards */}
      <section className="py-20 bg-background" aria-labelledby="research-overview-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 id="research-overview-heading" className="font-['Spectral'] text-4xl font-bold text-foreground mb-4">
              {t('research.overviewTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('research.overviewSub')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {researchGroups.map((group, index) => (
              <motion.article
                key={group.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group bg-card rounded-2xl border border-border shadow-lg overflow-hidden hover:shadow-xl hover:border-[color:var(--research-card-accent)]/30 transition-all duration-300"
              >
                <a href={`#${group.slug}`} className="block focus:outline-none focus:ring-2 focus:ring-[color:var(--research-card-accent)] focus:ring-inset rounded-2xl">
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={group.categoryImage}
                      alt={t(`research.groups.${group.slug}.title`)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const el = e.currentTarget;
                        el.onerror = null;
                        el.src = RESEARCH_GROUP_IMAGE_FALLBACK;
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-['Spectral'] text-xl font-bold text-foreground mb-2 line-clamp-2">
                      {t(`research.groups.${group.slug}.title`)}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                      {t(`research.groups.${group.slug}.summary`)}
                    </p>
                    <span className="inline-flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all text-[color:var(--research-card-accent)] group-hover:text-[color:var(--research-card-accent-hover)] underline-offset-2 hover:underline">
                      {t('research.exploreGroup')}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Impact metrics */}
      <section className="py-16 bg-muted/50 border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {impactMetricKeys.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-[#7B1E3A] rounded-2xl shadow-lg"
              >
                <metric.icon className="w-10 h-10 text-[#C8A951] mx-auto mb-3" />
                <div className="text-4xl font-bold font-['Spectral'] text-white mb-1">{metric.value}</div>
                <div className="text-sm text-white/70">{t(metric.labelKey)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Groups: full section per group */}
      <section className="py-20 bg-background" aria-labelledby="research-groups-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 id="research-groups-heading" className="font-['Spectral'] text-4xl font-bold text-foreground mb-4">
              {t('research.groupsTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('research.groupsSub')}
            </p>
          </motion.div>

          <div className="space-y-24 max-w-5xl mx-auto">
            {researchGroups.map((group, groupIndex) => (
              <motion.section
                key={group.slug}
                id={group.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                className="scroll-mt-24"
              >
                <div className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
                  {/* Banner image */}
                  <div className="aspect-[21/9] min-h-[200px] bg-muted">
                    <img
                      src={group.categoryImage}
                      alt={t(`research.groups.${group.slug}.title`)}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const el = e.currentTarget;
                        el.onerror = null;
                        el.src = RESEARCH_GROUP_IMAGE_FALLBACK;
                      }}
                    />
                  </div>
                  <div className="p-8 lg:p-10">
                    <h3 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6">
                      {t(`research.groups.${group.slug}.title`)}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                      {t(`research.groups.${group.slug}.summary`)}
                    </p>

                    {/* Current members */}
                    <div className="mb-8">
                      <h4 className="font-['Spectral'] text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-[color:var(--research-card-accent)]" />
                        {t('research.currentMembers')}
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {buildGroupMembers(group).map((member) => {
                          const hasProfile = Boolean(member.slug);
                          const slug = member.slug;
                          const content = (
                            <>
                              <MemberAvatar
                                displayName={member.name}
                                photo={member.photo}
                                size="md"
                                className="mx-auto sm:mx-0"
                              />
                              <div className="text-center sm:text-left min-w-0">
                                <span className="font-semibold text-foreground block truncate">{member.name}</span>
                                {member.role && (
                                  <span className="text-sm text-muted-foreground block truncate">{member.role}</span>
                                )}
                              </div>
                            </>
                          );
                          return (
                            <li key={member.name}>
                              {hasProfile && slug ? (
                                <LocalizedLink
                                  to={`/people/${slug}`}
                                  className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border border-border hover:border-[color:var(--research-card-accent)]/50 hover:bg-muted/50 transition-all focus:outline-none focus:ring-2 focus:ring-[color:var(--research-card-accent)] focus:ring-offset-2"
                                >
                                  {content}
                                </LocalizedLink>
                              ) : (
                                <div
                                  className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border border-border bg-muted/30"
                                  title={t('research.profileComingSoon')}
                                >
                                  {content}
                                  <span className="text-xs text-muted-foreground sm:ml-auto">{t('research.profileComingSoon')}</span>
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Links */}
                    {group.links && group.links.length > 0 && (
                      <div>
                        <h4 className="font-['Spectral'] text-lg font-semibold text-foreground mb-3">{t('research.resourcesLinks')}</h4>
                        <div className="flex flex-wrap gap-3">
                          {group.links.map((link) => (
                            link.external ?? link.url.startsWith('http') ? (
                              <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted text-foreground font-medium hover:bg-[color:var(--research-card-accent)] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--research-card-accent)] focus:ring-offset-2"
                              >
                                {link.label}
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            ) : (
                              <LocalizedLink
                                key={link.url}
                                to={link.url}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted text-foreground font-medium hover:bg-[color:var(--research-card-accent)] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--research-card-accent)] focus:ring-offset-2"
                              >
                                {link.label}
                              </LocalizedLink>
                            )
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Back to top */}
                    <div className="mt-8 pt-6 border-t border-border">
                      <a
                        href="#research-overview-heading"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--research-card-accent)] focus:ring-offset-2 rounded-lg py-2"
                      >
                        <ArrowUp className="w-4 h-4" />
                        {t('research.backToTop')}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </section>

      {/* Publications — auto-generated from People profiles only */}
      <section id="publications" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="font-['Spectral'] text-4xl font-bold text-foreground mb-4">{t('research.publicationsTitle')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('research.publicationsSub')}
            </p>
          </motion.div>

          {/* Search and filters */}
          <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden />
              <input
                type="search"
                value={pubSearch}
                onChange={(e) => setPubSearch(e.target.value)}
                placeholder={t('research.publicationsSearchPlaceholder')}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2"
                aria-label={t('research.publicationsSearchPlaceholder')}
              />
            </div>
            <select
              value={pubAuthorFilter}
              onChange={(e) => setPubAuthorFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2 min-w-[200px]"
              aria-label={t('research.publicationsFilterByAuthor')}
            >
              <option value="">{t('research.publicationsFilterByAuthor')}</option>
              {peopleWithPubs.map((person) => (
                <option key={person.slug} value={person.slug}>
                  {person.name} ({person.publicationCount})
                </option>
              ))}
            </select>
          </div>

          {/* Year controls */}
          <div className="max-w-4xl mx-auto mb-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={expandAllYears}
              className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              {t('achievements.expandAll')}
            </button>
            <button
              type="button"
              onClick={collapseAllYears}
              className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              {t('achievements.collapseAll')}
            </button>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {byYear.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">{t('research.publicationsNoResults')}</p>
            ) : (
              byYear.map(([year, pubs]) => {
                const isExpanded = expandedYears.has(year);
                return (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => toggleYear(year)}
                      className="w-full flex items-center justify-between px-6 py-4 bg-[#7B1E3A] text-white hover:bg-[#7B1E3A]/90 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2"
                      aria-expanded={isExpanded}
                    >
                      <span className="font-['Spectral'] text-xl font-bold">{year}</span>
                      <span className="text-white/80 text-sm">{pubs.length} {pubs.length === 1 ? t('research.publication') : t('research.publicationsCount')}</span>
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <ul className="divide-y divide-border">
                            {pubs.map((pub) => (
                              <li key={pub.id} className="p-6 hover:bg-muted/30 transition-colors">
                                <div className="flex gap-4">
                                  {/* Author headshot(s) + name(s) */}
                                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                                    {pub.personSlugs.slice(0, 2).map((slug) => {
                                      const meta = peopleBySlug.get(slug);
                                      const name = meta?.name ?? SLUG_TO_NAME[slug] ?? slug;
                                      const photo = meta?.photo ?? null;
                                      return (
                                        <LocalizedLink
                                          key={slug}
                                          to={`/people/${slug}`}
                                          className="flex flex-col items-center gap-1 group"
                                          aria-label={`${name} ${t('common.viewProfile')}`}
                                        >
                                          <MemberAvatar
                                            displayName={name}
                                            photo={photo}
                                            size="sm"
                                            className="ring-2 ring-transparent group-hover:ring-[#7B1E3A]"
                                          />
                                          <span className="text-xs font-medium text-foreground group-hover:text-[#7B1E3A] max-w-[80px] truncate text-center">
                                            {name.split(' ').pop()}
                                          </span>
                                        </LocalizedLink>
                                      );
                                    })}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    {pub.citation ? (
                                      <>
                                        <p className="text-foreground leading-relaxed">{pub.citation}</p>
                                        {pub.note && (
                                          <p className="mt-2 text-sm text-[#7B1E3A] font-medium">{pub.note}</p>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        <h3 className="font-['Spectral'] text-lg font-bold text-foreground mb-1">{pub.title}</h3>
                                        {pub.authors && <p className="text-sm text-muted-foreground mb-1">{pub.authors}</p>}
                                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                          {pub.venue && <span className="text-[#7B1E3A] font-medium">{pub.venue}</span>}
                                          {pub.details && <span>{pub.details}</span>}
                                          {pub.note && <span className="text-[#7B1E3A]">{pub.note}</span>}
                                        </div>
                                      </>
                                    )}
                                    {pub.links && pub.links.length > 0 && (
                                      <div className="mt-3 flex flex-wrap gap-2">
                                        {pub.links.map((link) => (
                                          <a
                                            key={link.url}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-foreground text-sm font-medium hover:bg-[#7B1E3A] hover:text-white transition-colors"
                                          >
                                            {link.label}
                                            <ExternalLink className="w-3.5 h-3.5" />
                                          </a>
                                        ))}
                                      </div>
                                    )}
                                    <div className="mt-2 flex flex-wrap gap-2">
                                      {pub.personSlugs.map((slug) => (
                                        <LocalizedLink
                                          key={slug}
                                          to={`/people/${slug}`}
                                          className="text-sm text-[#7B1E3A] hover:underline font-medium"
                                        >
                                          {SLUG_TO_NAME[slug] ?? slug}
                                        </LocalizedLink>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#7B1E3A] to-[#0B1C2D] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-['Spectral'] text-4xl md:text-5xl font-bold mb-6">{t('research.ctaTitle')}</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              {t('research.ctaSub')}
            </p>
            <LocalizedLink
              to="/study/postgraduate"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#7B1E3A] rounded-xl font-semibold hover:bg-[#C8A951] hover:text-white transition-all duration-300 shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
              {t('research.explorePostgrad')}
              <ArrowRight className="w-5 h-5" />
            </LocalizedLink>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
