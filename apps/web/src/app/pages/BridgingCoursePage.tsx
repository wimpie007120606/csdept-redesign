import { useState, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  ArrowRight,
  Download,
  Lightbulb,
  Package,
} from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { bridgingCourseManifest } from '@/content/bridgingCourse';
import {
  ResourceCard,
  FilterBar,
  DayAccordion,
  CodeViewerModal,
  type ResourceTypeFilter,
  type DayFilter,
} from '../components/bridging';
import { buildBridgingZip, downloadBlob } from '../utils/bridgingZip';

const heroBackground = '/realbackground2.jpg';

function filterBySearch(query: string, ...texts: (string | undefined)[]): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return texts.some((t) => t?.toLowerCase().includes(q));
}

export function BridgingCoursePage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<ResourceTypeFilter>('all');
  const [dayFilter, setDayFilter] = useState<DayFilter>('all');
  const [copiedFilename, setCopiedFilename] = useState<string | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerFilename, setViewerFilename] = useState('');
  const [viewerContent, setViewerContent] = useState('');
  const [viewerDownloadPath, setViewerDownloadPath] = useState('');
  const [zipProgress, setZipProgress] = useState<{ current: number; total: number } | null>(null);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const { overviewResource, exercises, days, zipEntries } = bridgingCourseManifest;

  const openCodeViewer = useCallback(async (path: string, filename: string) => {
    setViewerFilename(filename);
    setViewerDownloadPath(path);
    setViewerContent('Loading…');
    setViewerOpen(true);
    try {
      const res = await fetch(path);
      const text = await res.text();
      setViewerContent(text);
    } catch {
      setViewerContent('Could not load file.');
    }
  }, []);

  const closeViewer = useCallback(() => {
    setViewerOpen(false);
    setViewerFilename('');
    setViewerContent('');
    setViewerDownloadPath('');
  }, []);

  const handleDownloadAllZip = useCallback(async () => {
    setZipProgress({ current: 0, total: zipEntries.length });
    try {
      const blob = await buildBridgingZip(zipEntries, (current, total) => {
        setZipProgress({ current, total });
      });
      downloadBlob(blob, 'BridgingCourse.zip');
    } finally {
      setZipProgress(null);
    }
  }, [zipEntries]);

  const visibleExercises = useMemo(() => {
    if (typeFilter === 'java' || typeFilter === 'python' || typeFilter === 'c') return [];
    if (typeFilter === 'pdf') return exercises.filter((ex) => ex.type === 'pdf');
    return exercises.filter((ex) => filterBySearch(searchQuery, ex.label));
  }, [exercises, searchQuery, typeFilter]);

  const filterProgramsByType = useCallback(
    (programs: { type: string }[]) => {
      if (typeFilter === 'all') return programs;
      if (typeFilter === 'pdf') return []; // no code files are PDF
      return programs.filter((p) => p.type === typeFilter);
    },
    [typeFilter]
  );

  const visibleDay1 = useMemo(() => {
    if (dayFilter === 'day2' || dayFilter === 'day3') return [];
    const day = days.find((d) => d.dayId === 'day1');
    if (!day) return [];
    const bySearch = day.programs.filter((p) =>
      filterBySearch(searchQuery, p.filename, p.description)
    );
    return filterProgramsByType(bySearch);
  }, [days, searchQuery, dayFilter, filterProgramsByType]);

  const visibleDay2 = useMemo(() => {
    if (dayFilter === 'day1' || dayFilter === 'day3') return [];
    const day = days.find((d) => d.dayId === 'day2');
    if (!day) return [];
    const bySearch = day.programs.filter((p) =>
      filterBySearch(searchQuery, p.filename, p.description)
    );
    return filterProgramsByType(bySearch);
  }, [days, searchQuery, dayFilter, filterProgramsByType]);

  const visibleDay3 = useMemo(() => {
    if (dayFilter === 'day1' || dayFilter === 'day2') return [];
    const day = days.find((d) => d.dayId === 'day3');
    if (!day) return [];
    const bySearch = day.programs.filter((p) =>
      filterBySearch(searchQuery, p.filename, p.description)
    );
    return filterProgramsByType(bySearch);
  }, [days, searchQuery, dayFilter, filterProgramsByType]);

  const totalResults =
    visibleExercises.length + visibleDay1.length + visibleDay2.length + visibleDay3.length;

  const day1Data = days.find((d) => d.dayId === 'day1');
  const day2Data = days.find((d) => d.dayId === 'day2');
  const day3Data = days.find((d) => d.dayId === 'day3');

  const isZipLoading = zipProgress !== null;

  return (
    <div className="pt-20">
      <CodeViewerModal
        open={viewerOpen}
        onClose={closeViewer}
        filename={viewerFilename}
        content={viewerContent}
        downloadPath={viewerDownloadPath}
        downloadLabel={t('bridging.downloadResource')}
      />

      {/* Hero */}
      <section
        className="relative py-32 text-white overflow-hidden min-h-[500px] flex items-center"
        aria-labelledby="bridging-hero-title"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/90 via-[#0B1C2D]/85 to-[#0B1C2D]/80" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-8"
            >
              <div className="flex items-center gap-6">
                <span className="text-[#C8A951] text-xs uppercase tracking-[0.2em] font-medium font-['Spectral']">
                  {t('bridging.heroLabel')}
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C8A951]/40 to-transparent max-w-[200px]" />
              </div>
              <h1
                id="bridging-hero-title"
                className="font-['Spectral'] text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight"
              >
                {t('bridging.heroTitle')}
              </h1>
              <p className="text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
                {t('bridging.heroSub')}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={overviewResource.path}
                  download={overviewResource.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white text-[#7B1E3A] rounded-xl font-semibold hover:bg-[#C8A951] hover:text-white transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0B1C2D]"
                  aria-label={t('bridging.downloadBridge')}
                >
                  <Download className="w-5 h-5" aria-hidden />
                  {t('bridging.downloadBridge')}
                </a>
                <button
                  type="button"
                  onClick={() => scrollTo('exercises')}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/40 rounded-xl font-semibold hover:bg-white hover:text-[#7B1E3A] transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0B1C2D]"
                  aria-label={t('bridging.jumpToExercises')}
                >
                  <ArrowRight className="w-5 h-5" aria-hidden />
                  {t('bridging.jumpToExercises')}
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('day-programs')}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/40 rounded-xl font-semibold hover:bg-white hover:text-[#7B1E3A] transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0B1C2D]"
                  aria-label={t('bridging.jumpToDayPrograms')}
                >
                  <ArrowRight className="w-5 h-5" aria-hidden />
                  {t('bridging.jumpToDayPrograms')}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Main content: two-column */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: content cards */}
            <div className="lg:col-span-2 space-y-10">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border bg-card p-6 shadow-lg"
              >
                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[#7B1E3A]" aria-hidden />
                  {t('bridging.overview')}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t('bridging.overviewDesc')}
                </p>
                <p className="text-muted-foreground text-sm mb-4">
                  {t('bridging.overviewHowTo')}
                </p>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {t('bridging.learningPathTitle')}
                  </h3>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li>{t('bridging.learningPath1')}</li>
                    <li>{t('bridging.learningPath2')}</li>
                    <li>{t('bridging.learningPath3')}</li>
                  </ul>
                </div>
                <a
                  href={overviewResource.path}
                  download={overviewResource.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7B1E3A] text-white font-medium hover:bg-[#7B1E3A]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2"
                  aria-label={`${t('bridging.downloadBridge')}: ${overviewResource.label}`}
                >
                  <Download className="w-4 h-4" aria-hidden />
                  {overviewResource.label}
                </a>
              </motion.div>

              {/* Exercises */}
              <div id="exercises" className="scroll-mt-24">
                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-foreground mb-2">
                  {t('bridging.exercises')}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {t('bridging.exercisesDesc')}
                </p>
                <div className="space-y-3">
                  {visibleExercises.map((ex) => (
                    <ResourceCard
                      key={ex.path}
                      label={ex.label}
                      path={ex.path}
                      type={ex.type}
                      onOpenText={(path, _label) =>
                        openCodeViewer(path, path.split('/').pop() || ex.label)
                      }
                    />
                  ))}
                  {visibleExercises.length === 0 && (
                    <p className="text-muted-foreground text-sm py-4">
                      No exercises match your filters.
                    </p>
                  )}
                </div>
              </div>

              {/* Day programs */}
              <div id="day-programs" className="scroll-mt-24">
                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-foreground mb-2">
                  {t('bridging.dayPrograms')}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {t('bridging.dayProgramsDesc')}
                </p>
                {day1Data && (
                  <DayAccordion
                    day={day1Data}
                    defaultOpen={false}
                    viewLabel={t('bridging.view')}
                    copyLabel={t('bridging.copyFilename')}
                    copiedLabel={t('bridging.copied')}
                    downloadLabel={t('bridging.downloadResource')}
                    sortAZLabel={t('bridging.sortAZ')}
                    sortZALabel={t('bridging.sortZA')}
                    expandLabel={t('bridging.dayAccordionExpand')}
                    collapseLabel={t('bridging.dayAccordionCollapse')}
                    visiblePrograms={visibleDay1}
                    onCopyFilename={setCopiedFilename}
                    copiedFilename={copiedFilename}
                    onOpenCode={openCodeViewer}
                  />
                )}
                {day2Data && (
                  <DayAccordion
                    day={day2Data}
                    defaultOpen={false}
                    viewLabel={t('bridging.view')}
                    copyLabel={t('bridging.copyFilename')}
                    copiedLabel={t('bridging.copied')}
                    downloadLabel={t('bridging.downloadResource')}
                    sortAZLabel={t('bridging.sortAZ')}
                    sortZALabel={t('bridging.sortZA')}
                    expandLabel={t('bridging.dayAccordionExpand')}
                    collapseLabel={t('bridging.dayAccordionCollapse')}
                    visiblePrograms={visibleDay2}
                    onCopyFilename={setCopiedFilename}
                    copiedFilename={copiedFilename}
                    onOpenCode={openCodeViewer}
                  />
                )}
                {day3Data && (
                  <DayAccordion
                    day={day3Data}
                    defaultOpen={false}
                    viewLabel={t('bridging.view')}
                    copyLabel={t('bridging.copyFilename')}
                    copiedLabel={t('bridging.copied')}
                    downloadLabel={t('bridging.downloadResource')}
                    sortAZLabel={t('bridging.sortAZ')}
                    sortZALabel={t('bridging.sortZA')}
                    expandLabel={t('bridging.dayAccordionExpand')}
                    collapseLabel={t('bridging.dayAccordionCollapse')}
                    visiblePrograms={visibleDay3}
                    onCopyFilename={setCopiedFilename}
                    copiedFilename={copiedFilename}
                    onOpenCode={openCodeViewer}
                  />
                )}
              </div>
            </div>

            {/* Right: filters + tips + download all */}
            <div className="space-y-6">
              <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                typeFilter={typeFilter}
                onTypeFilterChange={setTypeFilter}
                dayFilter={dayFilter}
                onDayFilterChange={setDayFilter}
                resultCount={totalResults}
                filterCardTitle={t('bridging.filterLabel')}
                typeFilterLabel={t('bridging.typeFilter')}
                dayFilterLabel={t('bridging.dayFilter')}
                searchPlaceholder={t('bridging.searchPlaceholder')}
                resultCountLabel={t('bridging.resultCount')}
                allLabel={t('bridging.all')}
                pdfLabel={t('bridging.pdf')}
                javaLabel={t('bridging.java')}
                pythonLabel={t('bridging.python')}
                cLabel={t('bridging.c')}
                day1Label={t('bridging.day1')}
                day2Label={t('bridging.day2')}
                day3Label={t('bridging.day3')}
              />

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border border-[#C8A951]/40 bg-[#C8A951]/5 p-4"
              >
                <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-[#C8A951]" aria-hidden />
                  {t('bridging.newcomerTips')}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>{t('bridging.newcomerTipJava')}</li>
                  <li>{t('bridging.newcomerTipPython')}</li>
                  <li>{t('bridging.newcomerTipC')}</li>
                </ul>
              </motion.div>

              <button
                type="button"
                disabled={isZipLoading}
                onClick={handleDownloadAllZip}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-[#7B1E3A] bg-[#7B1E3A] text-white text-sm font-medium hover:bg-[#7B1E3A]/90 hover:border-[#7B1E3A]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                aria-label={t('bridging.downloadAll')}
                title={t('bridging.downloadAll')}
              >
                <Package className="w-4 h-4" aria-hidden />
                {isZipLoading && zipProgress
                  ? `${t('bridging.zipPreparing')} (${zipProgress.current}/${zipProgress.total} files)`
                  : t('bridging.downloadAll')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
