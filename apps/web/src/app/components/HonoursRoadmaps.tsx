import { useState } from 'react';
import { LocalizedLink } from './LocalizedLink';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  Database,
  Code2,
  Shield,
  GitBranch,
  Network,
  BookOpen,
} from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { getSlugForMemberName } from '@/app/utils/researchPeople';
import {
  getModuleByCode,
  getModulesByCodes,
  HONOURS_PROJECT_CODE,
  type PostgraduateModule,
} from '@/content/postgraduateModules';
import { honoursRoadmaps, type HonoursRoadmap } from '@/content/honoursRoadmaps';

const TRACK_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'ml-ai': Cpu,
  'data-science': Database,
  'software-verification': Code2,
  'cybersecurity-systems': Shield,
  'theory-algorithms': GitBranch,
  'networks-distributed': Network,
};

function ModuleCard({
  module: m,
  compact = false,
}: {
  module: PostgraduateModule;
  compact?: boolean;
}) {
  const slugFor = (name: string) => getSlugForMemberName(name);

  if (compact) {
    return (
      <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
        <span className="font-mono">{m.code}</span>
        <span className="mx-1.5">·</span>
        <span>{m.title}</span>
      </span>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="font-mono text-sm font-medium text-foreground">{m.code}</span>
        {m.credits != null && (
          <span className="text-xs text-muted-foreground">{m.credits} credits</span>
        )}
      </div>
      <h4 className="mt-1 font-medium text-foreground">{m.title}</h4>
      {m.lecturers && m.lecturers.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-sm">
          {m.lecturers.map((name) => {
            const slug = slugFor(name);
            return slug ? (
              <LocalizedLink
                key={name}
                to={`/people/${slug}`}
                className="text-primary hover:underline"
              >
                {name}
              </LocalizedLink>
            ) : (
              <span key={name} className="text-muted-foreground">
                {name}
              </span>
            );
          })}
        </div>
      )}
      {m.prerequisiteNote && (
        <p className="mt-2 text-xs text-muted-foreground italic">
          {m.prerequisiteNote}
        </p>
      )}
    </div>
  );
}

export function HonoursRoadmaps() {
  const { t } = useTranslation();
  const [activeTrackId, setActiveTrackId] = useState<string>(honoursRoadmaps[0].trackId);
  const activeTrack = honoursRoadmaps.find((r) => r.trackId === activeTrackId)!;

  const projectModule = getModuleByCode(HONOURS_PROJECT_CODE);
  const recFirst = getModulesByCodes(activeTrack.recommended.firstSemester);
  const recSecond = getModulesByCodes(activeTrack.recommended.secondSemester);
  const altFirst = getModulesByCodes(activeTrack.alternatives.firstSemester);
  const altSecond = getModulesByCodes(activeTrack.alternatives.secondSemester);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-['Playfair_Display'] text-xl font-semibold text-foreground">
          {t('study.postgrad.honours.roadmapsTitle')}
        </h3>
        <p className="mt-2 text-muted-foreground text-sm">
          {t('study.postgrad.honours.roadmapsIntro')}
        </p>
        <p className="mt-2 text-xs text-muted-foreground italic">
          {t('study.postgrad.honours.roadmapsDisclaimer')}
        </p>
      </div>

      {/* Track selector (tabs/pills) */}
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Study track"
      >
        {honoursRoadmaps.map((track) => {
          const Icon = TRACK_ICONS[track.trackId] ?? BookOpen;
          const isActive = track.trackId === activeTrackId;
          return (
            <button
              key={track.trackId}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`roadmap-panel-${track.trackId}`}
              id={`tab-${track.trackId}`}
              onClick={() => setActiveTrackId(track.trackId)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                isActive
                  ? 'bg-[#7B1E3A] text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              {track.title.replace(/ Track$/, '')}
            </button>
          );
        })}
      </div>

      {/* Honours Project year-long bar */}
      {projectModule && (
        <div className="rounded-lg border-2 border-[#C8A951]/50 bg-[#C8A951]/10 px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#7B1E3A]" />
            <span className="font-medium text-foreground">
              {t('study.postgrad.honours.roadmapsProjectYearLong')}
            </span>
            <span className="font-mono text-sm text-muted-foreground">
              {projectModule.code}
            </span>
            <span className="text-sm text-muted-foreground">
              — {projectModule.title}
            </span>
          </div>
        </div>
      )}

      {/* Selected roadmap content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTrackId}
          role="tabpanel"
          id={`roadmap-panel-${activeTrackId}`}
          aria-labelledby={`tab-${activeTrackId}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          <p className="text-sm text-muted-foreground">{activeTrack.description}</p>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* 1st Semester */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">
                {t('study.postgrad.honours.roadmapsFirstSemester')}
              </h4>
              <div className="space-y-3">
                {recFirst.map((m) => (
                  <ModuleCard key={m.code} module={m} />
                ))}
              </div>
              {altFirst.length > 0 && (
                <div className="pt-2">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {t('study.postgrad.honours.roadmapsAlternatives')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {altFirst.map((m) => (
                      <ModuleCard key={m.code} module={m} compact />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 2nd Semester */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">
                {t('study.postgrad.honours.roadmapsSecondSemester')}
              </h4>
              <div className="space-y-3">
                {recSecond.map((m) => (
                  <ModuleCard key={m.code} module={m} />
                ))}
              </div>
              {altSecond.length > 0 && (
                <div className="pt-2">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {t('study.postgrad.honours.roadmapsAlternatives')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {altSecond.map((m) => (
                      <ModuleCard key={m.code} module={m} compact />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
