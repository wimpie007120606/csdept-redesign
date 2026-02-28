import { useState, useEffect, useRef, useCallback } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_SUBSCRIBED = 'newsletter_subscribed';
const STORAGE_LAST_PROMPT = 'newsletter_last_prompt';
const THROTTLE_DAYS = 7;

export function getShouldShowModal(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (localStorage.getItem(STORAGE_SUBSCRIBED) === 'true') return false;
    const last = localStorage.getItem(STORAGE_LAST_PROMPT);
    if (!last) return true;
    const ts = parseInt(last, 10);
    if (Number.isNaN(ts)) return true;
    return Date.now() - ts > THROTTLE_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return true;
  }
}

export function markPromptShown(): void {
  try {
    localStorage.setItem(STORAGE_LAST_PROMPT, String(Date.now()));
  } catch {
    /* ignore */
  }
}

export function markSubscribed(): void {
  try {
    localStorage.setItem(STORAGE_SUBSCRIBED, 'true');
    localStorage.setItem(STORAGE_LAST_PROMPT, String(Date.now()));
  } catch {
    /* ignore */
  }
}

type Status = 'idle' | 'loading' | 'success' | 'error';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
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

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();

      if (data?.ok) {
        markSubscribed();
        setStatus('success');
        setTimeout(handleClose, 2000);
      } else {
        setErrorMessage(data?.error ?? 'Could not subscribe. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Could not subscribe. Please try again.');
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-modal-title"
      aria-describedby="newsletter-modal-desc"
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
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
            id="newsletter-modal-title"
            className="text-2xl font-bold text-white mb-2"
            style={{ fontFamily: "inherit" }}
          >
            Subscribe to Updates
          </h2>
          <p id="newsletter-modal-desc" className="text-white/90 text-sm mb-6">
            Stay informed about events, seminars, and news from the Computer Science Division.
          </p>

          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="w-12 h-12 rounded-full bg-[var(--su-gold)]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--su-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-medium text-center">You&apos;re subscribed. Thank you!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Your email address"
                  disabled={status === 'loading'}
                  className="w-full rounded-xl px-4 py-3 text-sm text-[#0B1C2D] bg-white border-2 border-transparent focus:border-[var(--su-gold)] focus:outline-none disabled:opacity-70"
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                />
                {status === 'error' && (
                  <p id="newsletter-error" className="mt-2 text-sm text-red-300" role="alert">
                    {errorMessage}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 px-6 rounded-xl font-semibold text-[var(--su-maroon)] bg-[var(--su-gold)] hover:bg-[var(--su-gold)]/90 focus:outline-none focus:ring-2 focus:ring-[var(--su-gold)] focus:ring-offset-2 focus:ring-offset-[var(--su-maroon)] disabled:opacity-70 transition-colors"
              >
                {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
              </button>

              <p className="text-xs text-white/70">
                We&apos;ll only send you updates about events and news. You can unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
