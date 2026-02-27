export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  location?: string;
  start: Date;
  end: Date;
  url?: string;
  timezone?: string; // e.g. "Africa/Johannesburg"
}

function pad2(n: number): string {
  return n.toString().padStart(2, '0');
}

function formatUtc(date: Date): string {
  const year = date.getUTCFullYear();
  const month = pad2(date.getUTCMonth() + 1);
  const day = pad2(date.getUTCDate());
  const hours = pad2(date.getUTCHours());
  const minutes = pad2(date.getUTCMinutes());
  const seconds = pad2(date.getUTCSeconds());
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
    .replace(/\r?\n/g, '\\n');
}

export function createIcsContent(event: CalendarEvent): string {
  const now = new Date();
  const dtStamp = formatUtc(now);
  const dtStart = formatUtc(event.start);
  const dtEnd = formatUtc(event.end);
  const uid = `${event.id}@cs.sun.ac.za`;

  const descriptionParts = [];
  if (event.description) descriptionParts.push(event.description);
  if (event.url) descriptionParts.push(event.url);
  const description = descriptionParts.join('\n\n');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Stellenbosch University//CS Dept//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${escapeIcsText(uid)}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    description ? `DESCRIPTION:${escapeIcsText(description)}` : '',
    event.location ? `LOCATION:${escapeIcsText(event.location)}` : '',
    event.url ? `URL:${escapeIcsText(event.url)}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean);

  // Use LF; most clients are lenient even without CRLF folding.
  return lines.join('\n');
}

export function triggerIcsDownload(event: CalendarEvent): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const content = createIcsContent(event);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const filename = `SU-CS-${event.id}.ics`;

  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document);

  if (isIOS) {
    // iOS Safari is more reliable when navigating directly to the blob URL.
    window.location.href = url;
    // Revoke later to avoid premature revoke while iOS is handling the URL.
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
    return;
  }

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export function buildGoogleCalendarUrl(event: CalendarEvent): string {
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  const text = encodeURIComponent(event.title);
  const details = encodeURIComponent(event.description ?? '');
  const location = encodeURIComponent(event.location ?? '');
  const start = formatUtc(event.start);
  const end = formatUtc(event.end);
  const dates = `${start}/${end}`;
  const ctz = encodeURIComponent(event.timezone ?? 'Africa/Johannesburg');

  const urlParts = [
    base,
    `&text=${text}`,
    `&dates=${dates}`,
    `&details=${details}`,
    `&location=${location}`,
    `&ctz=${ctz}`,
  ];

  return urlParts.join('');
}

export function buildOutlookCalendarUrl(event: CalendarEvent): string {
  const base = 'https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent';
  const subject = encodeURIComponent(event.title);
  const body = encodeURIComponent(event.description ?? '');
  const location = encodeURIComponent(event.location ?? '');
  const startIso = encodeURIComponent(event.start.toISOString());
  const endIso = encodeURIComponent(event.end.toISOString());

  const urlParts = [
    base,
    `&subject=${subject}`,
    `&body=${body}`,
    `&location=${location}`,
    `&startdt=${startIso}`,
    `&enddt=${endIso}`,
  ];

  return urlParts.join('');
}

