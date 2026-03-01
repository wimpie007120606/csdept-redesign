import { useState, useCallback } from 'react';
import { Code2, Copy, Check, ArrowUpDown, ArrowDownUp, Download } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import type { BridgingDay, BridgingDayProgram } from '@/content/bridgingCourse';

interface DayAccordionProps {
  day: BridgingDay;
  defaultOpen?: boolean;
  viewLabel: string;
  copyLabel: string;
  copiedLabel: string;
  downloadLabel: string;
  sortAZLabel: string;
  sortZALabel: string;
  expandLabel: string;
  collapseLabel: string;
  visiblePrograms: BridgingDayProgram[];
  onCopyFilename: (filename: string) => void;
  copiedFilename: string | null;
  onOpenCode: (path: string, filename: string) => void;
}

export function DayAccordion({
  day,
  defaultOpen = false,
  viewLabel,
  copyLabel,
  copiedLabel,
  downloadLabel,
  sortAZLabel,
  sortZALabel,
  expandLabel,
  collapseLabel,
  visiblePrograms,
  onCopyFilename,
  copiedFilename,
  onOpenCode,
}: DayAccordionProps) {
  const [sortOrder, setSortOrder] = useState<'az' | 'za'>('az');
  const sorted = [...visiblePrograms].sort((a, b) =>
    sortOrder === 'az'
      ? a.filename.localeCompare(b.filename)
      : b.filename.localeCompare(a.filename)
  );

  const handleCopy = useCallback(
    async (filename: string) => {
      try {
        await navigator.clipboard.writeText(filename);
        onCopyFilename(filename);
        setTimeout(() => onCopyFilename(''), 2000);
      } catch {
        // ignore
      }
    },
    [onCopyFilename]
  );

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen ? day.dayId : undefined}
      className="w-full"
    >
      <AccordionItem value={day.dayId} className="border border-border rounded-xl overflow-hidden mb-4">
        <AccordionTrigger
          className="px-4 py-4 hover:no-underline font-['Playfair_Display'] font-semibold text-foreground [&[data-state=open]>svg]:rotate-180"
          aria-label={`${day.dayLabel}, click to ${defaultOpen ? collapseLabel : expandLabel}`}
        >
          <span className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[#7B1E3A]" aria-hidden />
            {day.dayLabel}
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4 pt-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-sm text-muted-foreground">
              {sorted.length} {sorted.length === 1 ? 'file' : 'files'}
            </span>
            <button
              type="button"
              onClick={() => setSortOrder((s) => (s === 'az' ? 'za' : 'az'))}
              className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2"
              aria-label={sortOrder === 'az' ? sortZALabel : sortAZLabel}
              title={sortOrder === 'az' ? sortZALabel : sortAZLabel}
            >
              {sortOrder === 'az' ? (
                <ArrowUpDown className="w-4 h-4" aria-hidden />
              ) : (
                <ArrowDownUp className="w-4 h-4" aria-hidden />
              )}
              {sortOrder === 'az' ? sortAZLabel : sortZALabel}
            </button>
          </div>
          <ul className="space-y-2" role="list">
            {sorted.map((prog) => (
              <li
                key={prog.path}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 p-3 transition-colors hover:bg-muted/50 focus-within:ring-2 focus-within:ring-[#7B1E3A] focus-within:ring-offset-2"
                data-resource-type={prog.type}
                data-day={day.dayId}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-[#7B1E3A]/10 flex items-center justify-center flex-shrink-0">
                    <Code2 className="w-4 h-4 text-[#7B1E3A]" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-sm font-medium text-foreground truncate">
                      {prog.filename}
                    </p>
                    {prog.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {prog.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                  <button
                    type="button"
                    onClick={() => onOpenCode(prog.path, prog.filename)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#7B1E3A] text-white text-xs font-medium hover:bg-[#7B1E3A]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2"
                    aria-label={`${viewLabel} ${prog.filename}`}
                  >
                    {viewLabel}
                  </button>
                  <a
                    href={prog.path}
                    download={prog.filename}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs font-medium hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2"
                    aria-label={`${downloadLabel} ${prog.filename}`}
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden />
                    {downloadLabel}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(prog.filename)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs font-medium hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2"
                    aria-label={`${copiedFilename === prog.filename ? copiedLabel : copyLabel} ${prog.filename}`}
                  >
                    {copiedFilename === prog.filename ? (
                      <Check className="w-3.5 h-3.5 text-green-600" aria-hidden />
                    ) : (
                      <Copy className="w-3.5 h-3.5" aria-hidden />
                    )}
                    {copiedFilename === prog.filename ? copiedLabel : copyLabel}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
