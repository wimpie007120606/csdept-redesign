import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, MapPin, Clock } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import type { UpcomingEvent } from '@/content/events';
import {
  getDateKey,
  buildEventsByDateMap,
  getMonthGrid,
  WEEKDAY_LABELS,
  MONTH_LABELS,
  type EventWithCalendar,
} from '../../utils/calendarUtils';
import { AddToCalendarDropdown } from './AddToCalendarDropdown';

export interface MiniEventsCalendarProps {
  /** Same events as Events page list (single source of truth). */
  events: UpcomingEvent[];
  /** Callback to scroll to event card by id (e.g. document.getElementById(`event-${id}`)?.scrollIntoView). */
  onScrollToEvent?: (id: string) => void;
  /** Default for "Show only upcoming" toggle. */
  showOnlyUpcomingDefault?: boolean;
  /** Compact mode for Home page (smaller, fewer options). */
  compact?: boolean;
  /** Optional class for the container. */
  className?: string;
}

const TODAY = new Date();

export function MiniEventsCalendar({
  events,
  onScrollToEvent,
  showOnlyUpcomingDefault = true,
  compact = false,
  className = '',
}: MiniEventsCalendarProps) {
  const { t } = useTranslation();
  const [viewDate, setViewDate] = useState(() => new Date(TODAY.getFullYear(), TODAY.getMonth(), 1));
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [showOnlyUpcoming, setShowOnlyUpcoming] = useState(showOnlyUpcomingDefault);
  const [openAddToCalendarIndex, setOpenAddToCalendarIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const eventsByDate = useMemo(() => buildEventsByDateMap(events), [events]);
  const grid = useMemo(
    () => getMonthGrid(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate.getFullYear(), viewDate.getMonth()]
  );

  const selectedEvents = useMemo((): EventWithCalendar[] => {
    if (!selectedDateKey) return [];
    return eventsByDate.get(selectedDateKey) ?? [];
  }, [selectedDateKey, eventsByDate]);

  const isPastDate = useCallback((dateKey: string) => dateKey < getDateKey(TODAY), []);

  const goPrevMonth = useCallback(() => {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }, []);
  const goNextMonth = useCallback(() => {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }, []);

  const handleDayClick = useCallback((dateKey: string) => {
    setSelectedDateKey((prev) => (prev === dateKey ? null : dateKey));
    setOpenAddToCalendarIndex(null);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedDateKey(null);
        setOpenAddToCalendarIndex(null);
        return;
      }
      const target = e.target as HTMLElement;
      if (!gridRef.current?.contains(target) || target.getAttribute('data-date-key') === null) return;
      const buttons = gridRef.current.querySelectorAll<HTMLButtonElement>('button[data-date-key]');
      const index = Array.from(buttons).indexOf(target as HTMLButtonElement);
      if (index === -1) return;
      const cols = 7;
      let next = -1;
      if (e.key === 'ArrowLeft') next = index - 1;
      else if (e.key === 'ArrowRight') next = index + 1;
      else if (e.key === 'ArrowUp') next = index - cols;
      else if (e.key === 'ArrowDown') next = index + cols;
      if (next >= 0 && next < buttons.length) {
        e.preventDefault();
        (buttons[next] as HTMLButtonElement).focus();
      }
    },
    []
  );

  useEffect(() => {
    const el = document.getElementById('mini-calendar-day-panel');
    if (el && selectedDateKey) el.focus();
  }, [selectedDateKey]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthLabel = MONTH_LABELS[month];

  return (
    <div
      className={`rounded-2xl border border-border bg-card shadow-lg overflow-hidden ${compact ? 'p-3' : 'p-4'} ${className}`}
      onKeyDown={handleKeyDown}
    >
      {/* Header: month nav + optional toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={goPrevMonth}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--su-gold)]"
            aria-label={t('events.prevMonth')}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-['Spectral'] font-semibold text-foreground min-w-[140px] text-center">
            {monthLabel} {year}
          </span>
          <button
            type="button"
            onClick={goNextMonth}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--su-gold)]"
            aria-label={t('events.nextMonth')}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        {!compact && (
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlyUpcoming}
              onChange={(e) => setShowOnlyUpcoming(e.target.checked)}
              className="rounded border-border"
            />
            <span>{t('events.showOnlyUpcoming')}</span>
          </label>
        )}
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {WEEKDAY_LABELS.map((label) => (
          <div
            key={label}
            className="text-center text-xs font-medium text-muted-foreground py-1"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Month grid */}
      <div ref={gridRef} className="grid grid-cols-7 gap-0.5" role="grid" aria-label={t('events.calendar')}>
        {grid.map((cell, i) => {
          const dateKey = getDateKey(cell.date);
          const dayEvents = eventsByDate.get(dateKey) ?? [];
          const hasEvents = dayEvents.length > 0;
          const isPast = isPastDate(dateKey);
          const deEmphasized = showOnlyUpcoming && isPast;

          return (
            <button
              key={i}
              type="button"
              onClick={() => handleDayClick(dateKey)}
              className={`
                relative min-h-[36px] rounded-lg text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--su-gold)] focus-visible:ring-offset-1
                ${!cell.isCurrentMonth ? 'text-muted-foreground/50' : 'text-foreground'}
                ${cell.isToday ? 'ring-2 ring-[color:var(--su-maroon)] ring-offset-1 bg-[color:var(--su-maroon)]/10' : ''}
                ${hasEvents ? 'font-semibold' : ''}
                ${deEmphasized ? 'opacity-60' : ''}
                hover:bg-muted/80
              `}
              aria-label={`${cell.date.getDate()}${hasEvents ? `, ${dayEvents.length} event(s)` : ''}`}
              aria-pressed={selectedDateKey === dateKey}
              data-date-key={dateKey}
            >
              <span>{cell.date.getDate()}</span>
              {hasEvents && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-0.5 justify-center">
                  {dayEvents.slice(0, 3).map((_, j) => (
                    <span
                      key={j}
                      className="w-1 h-1 rounded-full bg-[color:var(--su-gold)]"
                      aria-hidden
                    />
                  ))}
                  {dayEvents.length > 3 && (
                    <span className="text-[10px] text-[color:var(--su-gold)]">+{dayEvents.length - 3}</span>
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected day panel */}
      <AnimatePresence>
        {selectedDateKey && (
          <motion.div
            id="mini-calendar-day-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 pt-4 border-t border-border"
            tabIndex={-1}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-['Spectral'] font-semibold text-foreground">
                {t('events.eventsOnThisDay')} — {selectedDateKey}
              </h4>
              <button
                type="button"
                onClick={() => setSelectedDateKey(null)}
                className="p-1 rounded hover:bg-muted text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--su-gold)]"
                aria-label={t('common.close')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {selectedEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t('events.noEventsOnThisDay')}</p>
            ) : (
              <ul className="space-y-3">
                {selectedEvents.map(({ event, calendarEvent }, idx) => (
                  <li
                    key={event.id}
                    className="p-3 rounded-xl border border-border bg-muted/30"
                  >
                    <p className="font-semibold text-foreground">{event.title}</p>
                    <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {event.location}
                      </span>
                    </div>
                    <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded bg-[color:var(--su-maroon)]/15 text-[color:var(--su-maroon)]">
                      {event.type}
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {onScrollToEvent && (
                        <button
                          type="button"
                          onClick={() => {
                            onScrollToEvent(event.id);
                            setSelectedDateKey(null);
                          }}
                          className="text-sm font-medium text-[color:var(--su-maroon)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--su-gold)] rounded"
                        >
                          {t('events.viewEvent')}
                        </button>
                      )}
                      <AddToCalendarDropdown
                        event={calendarEvent}
                        isOpen={openAddToCalendarIndex === idx}
                        onOpenChange={(open) => setOpenAddToCalendarIndex(open ? idx : null)}
                        className="inline-block"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
