import type { CalendarEvent } from './calendar';
import type { UpcomingEvent } from '@/content/events';
import { MONTH_MAP } from '@/content/events';

/** Format date as YYYY-MM-DD for stable keys (local date). */
export function getDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Convert UpcomingEvent to CalendarEvent (start/end Date). */
export function buildCalendarEvent(event: UpcomingEvent): CalendarEvent | null {
  const monthIndex = MONTH_MAP[event.date.month];
  const day = parseInt(event.date.day, 10);
  if (Number.isNaN(day) || monthIndex === undefined) return null;

  const [startStr, endStr] = event.time.split('-').map((p) => p.trim());
  const [startHourStr, startMinuteStr] = (startStr ?? '').split(':');
  const [endHourStr, endMinuteStr] = (endStr ?? '').split(':');
  const startHour = Number.parseInt(startHourStr ?? '0', 10);
  const startMinute = Number.parseInt(startMinuteStr ?? '0', 10);
  const endHour = Number.isNaN(Number.parseInt(endHourStr ?? '', 10)) ? startHour + 1 : Number.parseInt(endHourStr ?? '0', 10);
  const endMinute = Number.isNaN(Number.parseInt(endMinuteStr ?? '', 10)) ? startMinute : Number.parseInt(endMinuteStr ?? '0', 10);

  const start = new Date(event.year, monthIndex, day, startHour, startMinute, 0);
  const end = new Date(event.year, monthIndex, day, endHour, endMinute, 0);

  return {
    id: event.id,
    title: event.title,
    description: event.description,
    location: event.location,
    start,
    end,
    timezone: 'Africa/Johannesburg',
  };
}

export interface EventWithCalendar {
  event: UpcomingEvent;
  calendarEvent: CalendarEvent;
}

/** Build map of date key (YYYY-MM-DD) -> events on that day. */
export function buildEventsByDateMap(events: UpcomingEvent[]): Map<string, EventWithCalendar[]> {
  const map = new Map<string, EventWithCalendar[]>();
  for (const e of events) {
    const cal = buildCalendarEvent(e);
    if (!cal) continue;
    const key = getDateKey(cal.start);
    const list = map.get(key) ?? [];
    list.push({ event: e, calendarEvent: cal });
    map.set(key, list);
  }
  return map;
}

/** Week starts Sunday (0). Returns array of { date, isCurrentMonth, isToday } for a 6-row grid. */
export function getMonthGrid(year: number, month: number): { date: Date; isCurrentMonth: boolean; isToday: boolean }[] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startPad = first.getDay();
  const daysInMonth = last.getDate();
  const todayKey = getDateKey(new Date());

  const result: { date: Date; isCurrentMonth: boolean; isToday: boolean }[] = [];
  const totalCells = 6 * 7;

  for (let i = 0; i < totalCells; i++) {
    const dayIndex = i - startPad;
    let date: Date;
    let isCurrentMonth: boolean;
    if (dayIndex < 0) {
      const prevMonth = new Date(year, month, 0);
      date = new Date(year, month - 1, prevMonth.getDate() + dayIndex + 1);
      isCurrentMonth = false;
    } else if (dayIndex >= daysInMonth) {
      date = new Date(year, month + 1, dayIndex - daysInMonth + 1);
      isCurrentMonth = false;
    } else {
      date = new Date(year, month, dayIndex + 1);
      isCurrentMonth = true;
    }
    result.push({
      date,
      isCurrentMonth,
      isToday: getDateKey(date) === todayKey,
    });
  }
  return result;
}

export const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTH_LABELS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
