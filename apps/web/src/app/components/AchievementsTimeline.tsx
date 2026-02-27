import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, FileText, ChevronDown, ChevronUp, Expand, Minus } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

/** Citation-style entry (e.g. Lynette's full list). */
export interface CitationEntry {
  citation: string;
  hasPdf?: boolean;
  award?: string;
}

/** Title/venue-style entry (e.g. from API or other profiles). */
export interface TitleEntry {
  title: string;
  authors?: string;
  venue?: string;
  type?: string;
  year?: number;
  award?: string;
  pdf?: boolean;
}

export type TimelineEntry = CitationEntry | TitleEntry;

function isCitationEntry(entry: TimelineEntry): entry is CitationEntry {
  return 'citation' in entry && typeof (entry as CitationEntry).citation === 'string';
}

export interface YearGroup {
  year: number;
  publications: TimelineEntry[];
}

const RECENT_YEARS_COUNT = 5;

interface AchievementsTimelineProps {
  yearGroups: YearGroup[];
  /** If true, entries are citation-based (full text); else title/venue. */
  citationStyle?: boolean;
  /** Section title. */
  title?: string;
  /** Default expanded for recent N years. */
  defaultExpandedCount?: number;
}

export function AchievementsTimeline({
  yearGroups,
  citationStyle = false,
  title,
  defaultExpandedCount = RECENT_YEARS_COUNT,
}: AchievementsTimelineProps) {
  const { t } = useTranslation();
  const sectionTitle = title ?? t('achievements.publicationsAchievements');
  const sorted = [...yearGroups].sort((a, b) => b.year - a.year);
  const recentYears = new Set(sorted.slice(0, defaultExpandedCount).map((g) => g.year));

  const [expandedYears, setExpandedYears] = useState<Set<number>>(() => recentYears);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleYear = (year: number) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  };

  const expandAll = () => setExpandedYears(new Set(sorted.map((g) => g.year)));
  const collapseAll = () => setExpandedYears(new Set());

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative"
      aria-labelledby="achievements-timeline-heading"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h2
          id="achievements-timeline-heading"
          className="font-['Spectral'] text-3xl font-bold text-foreground flex items-center gap-3"
        >
          <div className="w-1 h-8 bg-[#7B1E3A] shrink-0" aria-hidden />
          {sectionTitle}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground bg-muted hover:bg-muted/80 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2"
            aria-label={t('achievements.expandAll')}
          >
            <Expand className="w-4 h-4" />
            {t('achievements.expandAll')}
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground bg-muted hover:bg-muted/80 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2"
            aria-label={t('achievements.collapseAll')}
          >
            <Minus className="w-4 h-4" />
            {t('achievements.collapseAll')}
          </button>
        </div>
      </div>

      <div className={`relative pl-8 border-l-2 border-[#7B1E3A]/30 space-y-8`}>
        {sorted.map((yearData, yearIndex) => {
          const isExpanded = mounted ? expandedYears.has(yearData.year) : recentYears.has(yearData.year);

          return (
            <motion.div
              key={yearData.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: yearIndex * 0.05 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className="absolute -left-[37px] top-0 w-6 h-6 rounded-full bg-[#7B1E3A] border-4 border-background shadow-lg shrink-0"
                aria-hidden
              />

              <button
                type="button"
                onClick={() => toggleYear(yearData.year)}
                className="w-full text-left group mb-4 rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2"
                aria-expanded={isExpanded}
                aria-controls={`year-content-${yearData.year}`}
                id={`year-toggle-${yearData.year}`}
              >
                <div className="flex items-center justify-between bg-[#7B1E3A] text-white rounded-xl p-4 hover:bg-[#7B1E3A]/90 transition-colors">
                  <div className="flex items-center gap-4">
                    <h3 className="font-['Spectral'] text-2xl font-bold">{yearData.year}</h3>
                    <span className="text-white/70 text-sm">
                      {yearData.publications.length} item{yearData.publications.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 shrink-0" aria-hidden />
                  ) : (
                    <ChevronDown className="w-5 h-5 shrink-0" aria-hidden />
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={`year-content-${yearData.year}`}
                    role="region"
                    aria-labelledby={`year-toggle-${yearData.year}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="space-y-4 overflow-hidden"
                  >
                    {yearData.publications.map((entry, pubIndex) => (
                      <div
                        key={pubIndex}
                        className="bg-card rounded-lg p-6 border border-border hover:border-[#7B1E3A]/50 transition-colors"
                      >
                        {citationStyle && isCitationEntry(entry) ? (
                          <>
                            <div className="flex flex-wrap items-start justify-end gap-2 mb-2">
                              {entry.award && (
                                <span className={`inline-flex items-center gap-1 px-2 py-1 bg-[#C8A951]/10 text-[#C8A951] text-xs rounded border border-[#C8A951]/30 font-medium`}>
                                  <Award className="w-3 h-3 shrink-0" />
                                  {entry.award}
                                </span>
                              )}
                              {entry.hasPdf && (
                                <span className={`inline-flex items-center gap-1 px-2 py-1 bg-[#7B1E3A]/10 text-[#7B1E3A] text-xs rounded border border-[#7B1E3A]/30 font-medium`}>
                                  <FileText className="w-3 h-3 shrink-0" />
                                  PDF
                                </span>
                              )}
                            </div>
                            <p className="text-foreground leading-relaxed">{entry.citation}</p>
                          </>
                        ) : (
                          <>
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h4 className="font-semibold text-foreground leading-tight flex-1">
                                {(entry as TitleEntry).title}
                              </h4>
                              <div className="flex gap-2 shrink-0">
                                {(entry as TitleEntry).award ? (
                                  <span className={`px-2 py-1 bg-[#C8A951]/10 text-[#C8A951] text-xs rounded border border-[#C8A951]/30 font-medium`}>
                                    <Award className="w-3 h-3 inline mr-1" />
                                    {(entry as TitleEntry).award}
                                  </span>
                                ) : null}
                                {(entry as TitleEntry).pdf ? (
                                  <span className={`px-2 py-1 bg-[#7B1E3A]/10 text-[#7B1E3A] text-xs rounded border border-[#7B1E3A]/30 font-medium`}>
                                    PDF
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            {(entry as TitleEntry).authors && (
                              <p className="text-sm text-muted-foreground mb-1">{(entry as TitleEntry).authors}</p>
                            )}
                            {((entry as TitleEntry).venue || (entry as TitleEntry).year) && (
                              <p className="text-sm text-muted-foreground">
                                {(entry as TitleEntry).venue}
                                {(entry as TitleEntry).venue && (entry as TitleEntry).year ? ', ' : ''}
                                {(entry as TitleEntry).year}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
