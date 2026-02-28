import { useState, useEffect, useRef, useCallback } from 'react';
import { registerForEvent } from '@/app/api';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface EventForRegistration {
  id: string;
  title: string;
  date?: { day: string; month: string };
  year?: number;
  time?: string;
  location?: string;
  capacity?: number;
  registered?: number;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventForRegistration | null;
  onSuccess?: (newCount: number, emailSent?: boolean) => void;
  onEventFull?: () => void;
}

export function EventRegistrationModal({
  isOpen,
  onClose,
  event,
  onSuccess,
  onEventFull,
}: EventRegistrationModalProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailSent, setEmailSent] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    setStatus('idle');
    setErrorMessage('');
    setEmail('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (isOpen && closeRef.current) {
      closeRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      setErrorMessage('Please enter your email address.');
      setStatus('error');
      return;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    const dateStr =
      event.date && event.year
        ? `${event.date.day} ${event.date.month} ${event.year}`
        : undefined;

    const result = await registerForEvent({
      eventId: event.id,
      email: trimmed,
      title: event.title,
      date: dateStr,
      time: event.time,
      location: event.location,
      capacity: event.capacity,
    });

    if (result?.ok) {
      setEmailSent(result.emailSent !== false);
      setStatus('success');
      if (typeof result.count === 'number') {
        onSuccess?.(result.count, result.emailSent);
      }
    } else {
      const err = result?.error ?? 'Registration failed. Please try again.';
      setErrorMessage(err);
      setStatus('error');
      if (err.includes('event is full') || err === 'This event is full.') {
        onEventFull?.();
      }
    }
  };

  if (!isOpen) return null;
  if (!event) return null;

  const canSubmit = true;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 z-[9998]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-registration-modal-title"
      aria-describedby="event-registration-modal-desc"
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-md rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{
          background: 'var(--su-maroon)',
          fontFamily: "'SU Raleway', 'Raleway', 'Trebuchet MS', sans-serif",
        }}
      >
        <div className="p-6 sm:p-8">
          <button
            ref={closeRef}
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--su-gold)] focus:ring-offset-2 focus:ring-offset-[var(--su-maroon)]"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2
            id="event-registration-modal-title"
            className="text-xl sm:text-2xl font-bold text-white mb-2 pr-8"
            style={{ fontFamily: 'inherit' }}
          >
            Register for {event.title}
          </h2>
          <p id="event-registration-modal-desc" className="text-white/90 text-sm mb-6">
            Enter your email address to confirm your registration.
          </p>

          {status === 'success' ? (
            <div
              className="rounded-xl border-2 border-[color:var(--su-maroon)]/40 bg-white/95 dark:bg-[#FAF8F3]/95 p-5 sm:p-6 text-left"
              style={{ fontFamily: 'inherit' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--su-gold)]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[var(--su-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[color:var(--su-maroon)] dark:text-[color:var(--su-maroon)]">
                  You&apos;re registered!
                </h3>
              </div>
              <p className="text-sm text-[#2C2A29] dark:text-[#0B1C2D] leading-relaxed">
                {emailSent
                  ? 'Confirmation email sent.'
                  : 'Registered successfully, but we couldn\'t send the email right now.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="event-registration-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="event-registration-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="name@example.com"
                  disabled={status === 'loading'}
                  className="w-full rounded-xl px-4 py-3 text-sm text-[#0B1C2D] bg-white border-2 border-transparent focus:border-[var(--su-gold)] focus:outline-none disabled:opacity-70"
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'event-registration-error' : undefined}
                />
                {status === 'error' && (
                  <p id="event-registration-error" className="mt-2 text-sm text-red-300" role="alert">
                    {errorMessage}
                  </p>
                )}
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 px-6 rounded-xl font-semibold text-white border-2 border-white/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--su-gold)] focus:ring-offset-2 focus:ring-offset-[var(--su-maroon)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === 'loading' || !canSubmit}
                  className="flex-1 py-3 px-6 rounded-xl font-semibold text-[var(--su-maroon)] bg-white hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-[var(--su-gold)] focus:ring-offset-2 focus:ring-offset-[var(--su-maroon)] disabled:opacity-70 transition-colors"
                >
                  {status === 'loading' ? (
                    <span className="inline-flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Registering…
                    </span>
                  ) : (
                    'Confirm Registration'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
