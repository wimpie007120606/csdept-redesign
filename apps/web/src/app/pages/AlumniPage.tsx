import { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { LocalizedLink } from '../components/LocalizedLink';
import { Search, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import {
  alumniFaculty,
  alumniDoctoral,
  alumniMasters,
  getDoctoralByYear,
  getMastersByYear,
  filterAlumniEntries,
  allAlumniEntries,
  type AlumniCategory,
  type AlumniFacultyEntry,
  type AlumniGraduateEntry,
} from '@/content/alumni';

const campusBg = '/realbackground2.jpg';

function formatFacultyDisplay(entry: AlumniFacultyEntry): string {
  if (entry.titleInBrackets) return `${entry.name} (${entry.titleInBrackets})`;
  return entry.name;
}

function formatGraduateDisplay(entry: AlumniGraduateEntry): string {
  return `${entry.name}: ${entry.title}, ${entry.year}`;
}

export function AlumniPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<AlumniCategory | 'all'>('all');

  useEffect(() => {
    document.title = `${t('alumni.pageTitle')} | ${t('nav.computerScience')}`;
  }, [t]);

  const filtered = useMemo(
    () => filterAlumniEntries(allAlumniEntries, searchQuery, categoryFilter),
    [searchQuery, categoryFilter]
  );

  const filteredFaculty = useMemo(
    () => filtered.filter((e): e is AlumniFacultyEntry => e.category === 'faculty'),
    [filtered]
  );
  const filteredDoctoral = useMemo(
    () => filtered.filter((e): e is AlumniGraduateEntry => e.category === 'doctoral'),
    [filtered]
  );
  const filteredMasters = useMemo(
    () => filtered.filter((e): e is AlumniGraduateEntry => e.category === 'masters'),
    [filtered]
  );

  const doctoralByYear = useMemo(() => {
    const map = new Map<number, AlumniGraduateEntry[]>();
    for (const e of filteredDoctoral) {
      if (!map.has(e.year)) map.set(e.year, []);
      map.get(e.year)!.push(e);
    }
    return new Map([...map.entries()].sort((a, b) => b[0] - a[0]));
  }, [filteredDoctoral]);

  const mastersByYear = useMemo(() => {
    const map = new Map<number, AlumniGraduateEntry[]>();
    for (const e of filteredMasters) {
      if (!map.has(e.year)) map.set(e.year, []);
      map.get(e.year)!.push(e);
    }
    return new Map([...map.entries()].sort((a, b) => b[0] - a[0]));
  }, [filteredMasters]);

  const showFaculty = categoryFilter === 'all' || categoryFilter === 'faculty';
  const showDoctoral = categoryFilter === 'all' || categoryFilter === 'doctoral';
  const showMasters = categoryFilter === 'all' || categoryFilter === 'masters';

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 text-white overflow-hidden min-h-[320px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${campusBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/90 via-[#0B1C2D]/85 to-[#0B1C2D]/80" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <span className="text-[#C8A951] text-xs uppercase tracking-[0.2em] font-medium font-['Spectral']">
                {t('alumni.heroLabel')}
              </span>
              <h1 id="alumni-title" className="font-['Spectral'] text-4xl md:text-5xl font-bold">
                {t('alumni.title')}
              </h1>
              <p className="text-lg text-white/80">{t('alumni.subtitle')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <LocalizedLink to="/people" className="hover:text-foreground transition-colors">
              {t('nav.people')}
            </LocalizedLink>
            <ChevronRight className="w-4 h-4 shrink-0" aria-hidden />
            <span className="text-foreground font-medium" aria-current="page">
              {t('nav.alumni')}
            </span>
          </nav>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Jump to section (desktop) */}
            <aside className="hidden lg:block shrink-0 w-48">
              <nav className="sticky top-28 space-y-1" aria-label={t('alumni.jumpToSection')}>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  {t('alumni.jumpToSection')}
                </p>
                <a
                  href="#alumni-faculty"
                  className="block py-1.5 text-sm text-foreground/80 hover:text-[color:var(--research-card-accent)] transition-colors"
                >
                  {t('alumni.sectionFaculty')}
                </a>
                <a
                  href="#alumni-doctoral"
                  className="block py-1.5 text-sm text-foreground/80 hover:text-[color:var(--research-card-accent)] transition-colors"
                >
                  {t('alumni.sectionDoctoral')}
                </a>
                <a
                  href="#alumni-masters"
                  className="block py-1.5 text-sm text-foreground/80 hover:text-[color:var(--research-card-accent)] transition-colors"
                >
                  {t('alumni.sectionMasters')}
                </a>
              </nav>
            </aside>

            <div className="min-w-0 flex-1 space-y-12">
              {/* Search + filter chips */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('alumni.searchPlaceholder')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[color:var(--research-card-accent)] focus:ring-offset-2"
                    aria-label={t('alumni.searchPlaceholder')}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {(['all', 'faculty', 'doctoral', 'masters'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--research-card-accent)] focus:ring-offset-2 ${
                        categoryFilter === cat
                          ? 'bg-[color:var(--research-card-accent)] text-white'
                          : 'bg-muted text-foreground hover:bg-muted/80'
                      }`}
                    >
                      {cat === 'all' ? t('alumni.chipAll') : cat === 'faculty' ? t('alumni.chipFaculty') : cat === 'doctoral' ? t('alumni.chipDoctoral') : t('alumni.chipMasters')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Alumni faculty */}
              {showFaculty && (
                <motion.section
                  id="alumni-faculty"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="scroll-mt-24"
                  aria-labelledby="alumni-faculty-heading"
                >
                  <h2 id="alumni-faculty-heading" className="font-['Spectral'] text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-[color:var(--research-card-accent)] rounded" aria-hidden />
                    {t('alumni.sectionFaculty')}
                  </h2>
                  {filteredFaculty.length === 0 ? (
                    <p className="text-muted-foreground">{t('alumni.noResults')}</p>
                  ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {filteredFaculty.map((entry, i) => (
                        <li key={`${entry.name}-${i}`} className="bg-card rounded-lg border border-border px-4 py-3 text-foreground">
                          {formatFacultyDisplay(entry)}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.section>
              )}

              {/* Doctoral graduates */}
              {showDoctoral && (
                <motion.section
                  id="alumni-doctoral"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="scroll-mt-24"
                  aria-labelledby="alumni-doctoral-heading"
                >
                  <h2 id="alumni-doctoral-heading" className="font-['Spectral'] text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-[color:var(--research-card-accent)] rounded" aria-hidden />
                    {t('alumni.sectionDoctoral')}
                  </h2>
                  {filteredDoctoral.length === 0 ? (
                    <p className="text-muted-foreground">{t('alumni.noResults')}</p>
                  ) : (
                    <div className="relative pl-6 border-l-2 border-[color:var(--research-card-accent)]/30 space-y-8">
                      {Array.from(doctoralByYear.entries()).map(([year, entries]) => (
                        <div key={year}>
                          <h3 className="font-semibold text-foreground -ml-6 mb-2">
                            <span className="inline-block bg-[color:var(--research-card-accent)]/15 text-[color:var(--research-card-accent)] px-3 py-1 rounded-lg text-sm">
                              {year}
                            </span>
                          </h3>
                          <ul className="space-y-2">
                            {entries.map((entry, i) => (
                              <li
                                key={`${entry.name}-${entry.year}-${i}`}
                                className="bg-card rounded-lg border border-border px-4 py-3 text-foreground/90 text-sm"
                              >
                                {formatGraduateDisplay(entry)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.section>
              )}

              {/* Masters graduates */}
              {showMasters && (
                <motion.section
                  id="alumni-masters"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="scroll-mt-24"
                  aria-labelledby="alumni-masters-heading"
                >
                  <h2 id="alumni-masters-heading" className="font-['Spectral'] text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-[color:var(--research-card-accent)] rounded" aria-hidden />
                    {t('alumni.sectionMasters')}
                  </h2>
                  {filteredMasters.length === 0 ? (
                    <p className="text-muted-foreground">{t('alumni.noResults')}</p>
                  ) : (
                    <div className="relative pl-6 border-l-2 border-[color:var(--research-card-accent)]/30 space-y-8">
                      {Array.from(mastersByYear.entries()).map(([year, entries]) => (
                        <div key={year}>
                          <h3 className="font-semibold text-foreground -ml-6 mb-2">
                            <span className="inline-block bg-[color:var(--research-card-accent)]/15 text-[color:var(--research-card-accent)] px-3 py-1 rounded-lg text-sm">
                              {year}
                            </span>
                          </h3>
                          <ul className="space-y-2">
                            {entries.map((entry, i) => (
                              <li
                                key={`${entry.name}-${entry.year}-${i}`}
                                className="bg-card rounded-lg border border-border px-4 py-3 text-foreground/90 text-sm"
                              >
                                {formatGraduateDisplay(entry)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.section>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
