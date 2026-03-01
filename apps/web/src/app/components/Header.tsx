import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router';
import { LocalizedLink } from './LocalizedLink';
import { pathWithoutLang } from '../utils/langPath';
import { Menu, X, Sun, Palette, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '@/i18n/useTranslation';

const DROPDOWN_Z_INDEX = 9999;
const HEADER_Z_INDEX = 50;
const DROPDOWN_WIDTH = 224; // w-56
const DROPDOWN_GAP = 8;
const DROPDOWN_MAX_HEIGHT = 400;
/** Delay (ms) before closing dropdown when pointer leaves trigger/panel — makes menu forgiving. */
const DROPDOWN_CLOSE_DELAY_MS = 280;
/** Invisible "hover bridge" (px) so pointer can move from trigger to panel without closing. */
const HOVER_BRIDGE_PX = 12;

const suLogo = '/brand/stellenbosch/su-logo-primary.jpeg';

const navStructure = [
  { key: 'study', items: [{ key: 'undergraduate', href: '/study/undergraduate' }, { key: 'postgraduate', href: '/study/postgraduate' }, { key: 'courseCatalogue', href: '/courses' }] },
  { key: 'research', items: [{ key: 'researchOverview', href: '/research' }, { key: 'researchGroups', href: '/research#groups' }, { key: 'publications', href: '/research#publications' }] },
  { key: 'people', items: [{ key: 'staff', href: '/people' }, { key: 'alumni', href: '/people/alumni' }] },
  { key: 'news', href: '/news' },
  { key: 'events', href: '/events' },
  { key: 'resources', items: [{ key: 'links', href: '/resources/links' }, { key: 'faqs', href: '/resources#faq' }] },
  { key: 'bridging', href: '/bridging' },
  { key: 'contact', href: '/contact' },
] as const;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { theme, setTheme } = useTheme();

  const cancelCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleCloseDropdown = () => {
    cancelCloseTimer();
    closeTimerRef.current = setTimeout(() => setActiveDropdown(null), DROPDOWN_CLOSE_DELAY_MS);
  };
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language, setLanguage } = useTranslation();

  const handleLanguageChange = (lang: 'en' | 'af' | 'xh') => {
    setLanguage(lang);
    const path = pathWithoutLang(location.pathname);
    navigate(`/${lang}${path}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Clear close timer when dropdown closes or on unmount
  useEffect(() => {
    return () => cancelCloseTimer();
  }, []);
  useEffect(() => {
    if (!activeDropdown) cancelCloseTimer();
  }, [activeDropdown]);

  // Position dropdown in viewport (viewport-safe, no clipping)
  const updateDropdownPosition = () => {
    if (!activeDropdown) {
      setDropdownPosition(null);
      return;
    }
    const trigger = triggerRefs.current[activeDropdown];
    if (!trigger) {
      setDropdownPosition(null);
      return;
    }
    const rect = trigger.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let left = rect.left;
    if (left + DROPDOWN_WIDTH > vw - DROPDOWN_GAP) left = vw - DROPDOWN_WIDTH - DROPDOWN_GAP;
    if (left < DROPDOWN_GAP) left = DROPDOWN_GAP;
    // Position panel with overlap (hover bridge) so pointer can move from trigger to panel without closing
    const top = rect.bottom + DROPDOWN_GAP - HOVER_BRIDGE_PX;
    setDropdownPosition({ top, left });
  };

  useLayoutEffect(() => {
    if (!activeDropdown) {
      setDropdownPosition(null);
      return;
    }
    updateDropdownPosition();
    const onScrollOrResize = () => updateDropdownPosition();
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [activeDropdown]);

  // Click outside + Escape to close dropdown
  useEffect(() => {
    if (!activeDropdown) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const trigger = triggerRefs.current[activeDropdown];
      if (dropdownRef.current?.contains(target) || trigger?.contains(target)) return;
      setActiveDropdown(null);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveDropdown(null);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeDropdown]);

  const currentPath = pathWithoutLang(location.pathname);
  const isNavActive = (href: string) => currentPath === href || (href !== '/' && currentPath.startsWith(href));
  const isDropdownActive = (key: string) => activeDropdown === key;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[color:var(--su-maroon)] ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto px-4 min-[1025px]:px-8 max-w-[100%] overflow-x-hidden overflow-y-visible">
        <div className="flex items-center justify-between h-24 min-w-0 gap-2">
          {/* Logo + Brand */}
          <LocalizedLink to="/" className="flex items-center gap-2 min-[1025px]:gap-4 group min-w-0 flex-shrink" aria-label={t('nav.stellenboschUniversity')}>
            <img
              src={suLogo}
              alt="Stellenbosch University logo"
              className="w-14 h-14 object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:flex flex-col leading-tight min-w-0">
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-white">
                {t('nav.stellenboschUniversity')}
              </span>
              <span className="text-xl lg:text-2xl font-bold text-white">
                {t('nav.computerScience')}
              </span>
            </div>
          </LocalizedLink>

          {/* Desktop Navigation — visible only from 1025px (tablets/mobile use hamburger) */}
          <nav className="hidden min-[1025px]:flex items-center space-x-1 text-white flex-shrink-0">
            {navStructure.map((item) =>
              'href' in item && item.href ? (
                <LocalizedLink
                  key={item.key}
                  to={item.href}
                  className="nav-link px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors border-b-2 border-transparent"
                  data-current={isNavActive(item.href) ? 'true' : undefined}
                >
                  {t(`nav.${item.key}`)}
                </LocalizedLink>
              ) : (
                <div
                  key={item.key}
                  className="relative"
                  onPointerEnter={() => {
                    cancelCloseTimer();
                    setActiveDropdown(item.key);
                  }}
                  onPointerLeave={scheduleCloseDropdown}
                >
                  <button
                    ref={(el) => { triggerRefs.current[item.key] = el; }}
                    type="button"
                    className="nav-dropdown-trigger px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors flex items-center gap-1 border-b-2 border-transparent"
                    data-open={isDropdownActive(item.key) ? 'true' : undefined}
                    aria-haspopup="menu"
                    aria-expanded={isDropdownActive(item.key)}
                    onClick={() => setActiveDropdown(isDropdownActive(item.key) ? null : item.key)}
                  >
                    {t(`nav.${item.key}`)}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              )
            )}
          </nav>

          {/* Right side: desktop = language + theme; mobile/tablet = hamburger only */}
          <div className="flex items-center gap-2 text-white flex-shrink-0">
            {/* Language + Theme — desktop only (in drawer on mobile/tablet) */}
            <div className="hidden min-[1025px]:flex items-center gap-2">
              <div
                className="flex rounded-lg overflow-hidden border border-white/30"
                role="group"
                aria-label={t('common.language')}
              >
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    language === 'en'
                      ? 'bg-white text-[color:var(--su-maroon)]'
                      : 'bg-transparent text-white hover:bg-white/10'
                  }`}
                  aria-label={t('nav.english')}
                  aria-pressed={language === 'en'}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange('af')}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    language === 'af'
                      ? 'bg-white text-[color:var(--su-maroon)]'
                      : 'bg-transparent text-white hover:bg-white/10'
                  }`}
                  aria-label={t('nav.afrikaans')}
                  aria-pressed={language === 'af'}
                >
                  AF
                </button>
                <button
                  onClick={() => handleLanguageChange('xh')}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    language === 'xh'
                      ? 'bg-white text-[color:var(--su-maroon)]'
                      : 'bg-transparent text-white hover:bg-white/10'
                  }`}
                  aria-label={t('nav.isiXhosa')}
                  aria-pressed={language === 'xh'}
                >
                  XH
                </button>
              </div>
              <button
                onClick={() => setTheme(theme === 'maroon' ? 'light' : 'maroon')}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label={t('common.toggleTheme')}
              >
                {theme === 'maroon' ? <Sun className="w-5 h-5" /> : <Palette className="w-5 h-5" />}
              </button>
            </div>
            {/* Hamburger — mobile/tablet only (≤1024px) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex min-[1025px]:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label={t('common.toggleMenu')}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu (≤1024px): drawer with nav links + language + theme */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="min-[1025px]:hidden bg-white maroon:bg-[color:var(--ivory)] border-t border-[#0B1C2D]/10 max-h-[min(80vh,400px)] overflow-y-auto overflow-x-hidden"
          >
            <nav className="container mx-auto px-4 py-4 space-y-1">
              {navStructure.map((item) =>
                'href' in item && item.href ? (
                  <LocalizedLink
                    key={item.key}
                    to={item.href}
                    className="nav-link block px-4 py-3 rounded-lg text-sm font-medium text-[#0B1C2D] maroon:text-[color:var(--su-black)] hover:bg-[#F3F0E8] maroon:hover:bg-white/10 transition-colors border-b-2 border-transparent break-words"
                    data-current={isNavActive(item.href) ? 'true' : undefined}
                  >
                    {t(`nav.${item.key}`)}
                  </LocalizedLink>
                ) : (
                  <div key={item.key} className="space-y-1">
                    <div className="px-4 py-3 text-sm font-bold text-[color:var(--su-maroon)] maroon:text-[var(--su-gold)]">
                      {t(`nav.${item.key}`)}
                    </div>
                    {'items' in item &&
                      item.items.map((subItem) => (
                        <LocalizedLink
                          key={subItem.key}
                          to={subItem.href}
                          className="block pl-8 pr-4 py-2 rounded-lg text-sm text-[#0B1C2D] maroon:text-[color:var(--su-black)] hover:bg-[#F3F0E8] maroon:hover:bg-white/10 transition-colors break-words"
                        >
                          {t(`nav.${subItem.key}`)}
                        </LocalizedLink>
                      ))}
                  </div>
                )
              )}
              {/* Language + Theme inside drawer for mobile/tablet */}
              <div className="mt-6 pt-4 border-t border-[#0B1C2D]/10 flex flex-wrap items-center gap-4">
                <span className="text-sm font-semibold text-[#0B1C2D] maroon:text-[color:var(--su-black)] w-full">
                  {t('common.language')}
                </span>
                <div
                  className="flex rounded-lg overflow-hidden border border-[#0B1C2D]/20"
                  role="group"
                  aria-label={t('common.language')}
                >
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      language === 'en'
                        ? 'bg-[color:var(--su-maroon)] text-white'
                        : 'bg-[#F3F0E8] text-[#0B1C2D] hover:bg-[#E8E4DC]'
                    }`}
                    aria-label={t('nav.english')}
                    aria-pressed={language === 'en'}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => handleLanguageChange('af')}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      language === 'af'
                        ? 'bg-[color:var(--su-maroon)] text-white'
                        : 'bg-[#F3F0E8] text-[#0B1C2D] hover:bg-[#E8E4DC]'
                    }`}
                    aria-label={t('nav.afrikaans')}
                    aria-pressed={language === 'af'}
                  >
                    AF
                  </button>
                  <button
                    onClick={() => handleLanguageChange('xh')}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      language === 'xh'
                        ? 'bg-[color:var(--su-maroon)] text-white'
                        : 'bg-[#F3F0E8] text-[#0B1C2D] hover:bg-[#E8E4DC]'
                    }`}
                    aria-label={t('nav.isiXhosa')}
                    aria-pressed={language === 'xh'}
                  >
                    XH
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#0B1C2D] maroon:text-[color:var(--su-black)]">
                    {t('common.toggleTheme')}
                  </span>
                  <button
                    onClick={() => setTheme(theme === 'maroon' ? 'light' : 'maroon')}
                    className="p-2 rounded-lg bg-[#F3F0E8] hover:bg-[#E8E4DC] text-[#0B1C2D] transition-colors"
                    aria-label={t('common.toggleTheme')}
                  >
                    {theme === 'maroon' ? <Sun className="w-5 h-5" /> : <Palette className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop dropdowns: render in portal so they are never clipped by overflow */}
      {typeof document !== 'undefined' &&
        activeDropdown &&
        dropdownPosition &&
        (() => {
          const item = navStructure.find((n) => n.key === activeDropdown);
          if (!item || !('items' in item) || !item.items) return null;
          const maxH =
            typeof window !== 'undefined'
              ? Math.min(DROPDOWN_MAX_HEIGHT, window.innerHeight - dropdownPosition.top - DROPDOWN_GAP)
              : DROPDOWN_MAX_HEIGHT;
          return createPortal(
            <AnimatePresence>
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="su-card fixed w-56 bg-white text-[#0B1C2D] maroon:bg-[color:var(--ivory)] maroon:text-[color:var(--su-black)] rounded-xl shadow-2xl border border-[#0B1C2D]/10 overflow-hidden"
                style={{
                  zIndex: DROPDOWN_Z_INDEX,
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                  maxHeight: maxH,
                  overflowY: 'auto',
                  paddingTop: HOVER_BRIDGE_PX,
                }}
                role="menu"
                aria-label={t(`nav.${activeDropdown}`)}
                onPointerEnter={cancelCloseTimer}
                onPointerLeave={scheduleCloseDropdown}
              >
                {item.items.map((subItem) => (
                  <LocalizedLink
                    key={subItem.key}
                    to={subItem.href}
                    className="block px-4 py-3 text-sm hover:bg-[#F3F0E8] maroon:hover:bg-[#F3F0E8] transition-colors"
                    role="menuitem"
                  >
                    {t(`nav.${subItem.key}`)}
                  </LocalizedLink>
                ))}
              </motion.div>
            </AnimatePresence>,
            document.body
          );
        })()}
    </header>
  );
}