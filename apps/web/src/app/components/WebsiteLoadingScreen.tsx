import { useState, useEffect, useRef } from 'react';
import './WebsiteLoadingScreen.css';

const DISPLAY_MS = 6000;
const FADEOUT_MS = 400;

/** Only call inside useEffect so we never touch window/performance at build or SSR. */
function shouldShowLoader(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const nav = performance.getEntriesByType?.('navigation')?.[0] as PerformanceNavigationTiming | undefined;
    return nav?.type === 'reload' || nav?.type === 'navigate' || false;
  } catch {
    return true;
  }
}

export function WebsiteLoadingScreen() {
  const [visible, setVisible] = useState<boolean | null>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [unmounted, setUnmounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setVisible(shouldShowLoader());
  }, []);

  useEffect(() => {
    if (visible !== true) return;

    timerRef.current = setTimeout(() => {
      setFadeOut(true);
      fadeTimerRef.current = setTimeout(() => setUnmounted(true), FADEOUT_MS);
    }, DISPLAY_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [visible]);

  useEffect(() => {
    if (visible !== true) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  if (!visible || unmounted) return null;

  const SU_LOGO = '/brand/stellenbosch/su-logo-primary.jpeg';

  return (
    <div
      className={`website-loading-screen${fadeOut ? ' website-loading-screen--fade-out' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="website-loading-screen__inner">
        <div className="website-loading-screen__base" aria-hidden />
        <div className="website-loading-screen__glow" aria-hidden />
        <div className="website-loading-screen__line" aria-hidden />
        <div className="website-loading-screen__content">
          <img
            src={SU_LOGO}
            alt="Stellenbosch University"
            className="website-loading-screen__logo"
          />
          <div className="website-loading-screen__accent" aria-hidden />
          <p className="website-loading-screen__subtitle">Computer Science Division</p>
          <p className="website-loading-screen__loading-text">Loading...</p>
        </div>
      </div>
    </div>
  );
}
