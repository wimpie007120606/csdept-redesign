import { Calendar, ChevronDown } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import {
  type CalendarEvent,
  triggerIcsDownload,
  buildGoogleCalendarUrl,
  buildOutlookCalendarUrl,
} from '../../utils/calendar';

export interface AddToCalendarDropdownProps {
  /** Calendar event data; when null, button is disabled. */
  event: CalendarEvent | null;
  /** Whether the dropdown menu is open. */
  isOpen: boolean;
  /** Called when user toggles the dropdown (e.g. click trigger). */
  onOpenChange: (open: boolean) => void;
  /** Optional class name for the wrapper. */
  className?: string;
}

/**
 * Shared Add to Calendar dropdown: ICS download, Google Calendar, Outlook.
 * Reused on Events page and Home page for identical behavior and cross-device support.
 */
export function AddToCalendarDropdown({
  event,
  isOpen,
  onOpenChange,
  className = '',
}: AddToCalendarDropdownProps) {
  const { t } = useTranslation();

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        className="add-to-calendar-trigger px-6 py-2 bg-secondary/10 text-secondary rounded-xl font-semibold hover:bg-secondary/20 transition-all inline-flex items-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
        aria-haspopup="true"
        aria-expanded={isOpen}
        disabled={!event}
        onClick={() => onOpenChange(!isOpen)}
      >
        {t('events.addToCalendar')}
        <Calendar className="w-4 h-4 text-[color:var(--su-gold)]" />
        <ChevronDown className="w-4 h-4" />
      </button>
      {isOpen && event && (
        <div
          className="add-to-calendar-dropdown mt-2 w-full sm:w-64 rounded-xl border border-border bg-card shadow-xl py-2"
          role="menu"
        >
          <button
            type="button"
            className="w-full px-4 py-2 text-left text-sm hover:bg-secondary/10 flex items-center gap-2"
            onClick={() => {
              triggerIcsDownload(event);
              onOpenChange(false);
            }}
          >
            {t('events.addToCalendarApple')}
          </button>
          <a
            href={buildGoogleCalendarUrl(event)}
            onClick={() => onOpenChange(false)}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-4 py-2 text-left text-sm hover:bg-secondary/10"
            role="menuitem"
          >
            {t('events.addToCalendarGoogle')}
          </a>
          <a
            href={buildOutlookCalendarUrl(event)}
            onClick={() => onOpenChange(false)}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-4 py-2 text-left text-sm hover:bg-secondary/10"
            role="menuitem"
          >
            {t('events.addToCalendarOutlook')}
          </a>
        </div>
      )}
    </div>
  );
}
