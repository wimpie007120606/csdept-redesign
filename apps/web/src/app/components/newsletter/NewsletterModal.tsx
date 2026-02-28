import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_SUBSCRIBED = 'newsletter_subscribed';

function markSubscribed(): void {
  try {
    localStorage.setItem(STORAGE_SUBSCRIBED, 'true');
  } catch {
    /* ignore */
  }
}

export interface NewsletterModalContextValue {
  openModal: () => void;
  closeModal: () => void;
}

const NewsletterModalContext = createContext<NewsletterModalContextValue | null>(null);

export function useNewsletterModal(): NewsletterModalContextValue {
  const ctx = useContext(NewsletterModalContext);
  return ctx ?? { openModal: () => {}, closeModal: () => {} };
}

export const NewsletterModalProvider = NewsletterModalContext.Provider;

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
      if (e.key === 'Escape' && status !== 'success') handleClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose, status]);

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
      className="fixed inset-0 flex items-center justify-center p-4 bg-black/50"
      style={{ zIndex: 9999 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-modal-title"
      aria-describedby="newsletter-modal-desc"
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-md rounded-2xl shadow-2xl"
        style={{
          maxHeight: '90vh',
          overflowY: 'auto',
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
            <div
              className="rounded-xl border-2 border-[color:var(--su-maroon)]/40 bg-white/95 dark:bg-[#FAF8F3]/95 p-5 sm:p-6 text-left"
              style={{ fontFamily: "inherit" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--su-gold)]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[var(--su-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[color:var(--su-maroon)] dark:text-[color:var(--su-maroon)]">
                  Thank you for subscribing!
                </h3>
              </div>
              <div className="space-y-3 text-sm text-[#2C2A29] dark:text-[#0B1C2D] leading-relaxed">
                <p>
                  We&apos;ve sent a welcome email to your inbox.
                </p>
                <p>
                  If you don&apos;t see it within 1–2 minutes, please check your Promotions tab (especially if you&apos;re using Gmail).
                </p>
                <p>
                  You can move it to your Primary inbox to make sure future updates arrive there.
                </p>
              </div>
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
