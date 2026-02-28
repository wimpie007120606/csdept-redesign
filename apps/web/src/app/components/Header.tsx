import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { LocalizedLink } from './LocalizedLink';
import { pathWithoutLang } from '../utils/langPath';
import { Menu, X, Sun, Palette, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '@/i18n/useTranslation';

const suLogo = '/brand/stellenbosch/su-logo-primary.jpeg';

const navStructure = [
  { key: 'study', items: [{ key: 'undergraduate', href: '/study/undergraduate' }, { key: 'postgraduate', href: '/study/postgraduate' }, { key: 'courseCatalogue', href: '/courses' }] },
  { key: 'research', items: [{ key: 'researchOverview', href: '/research' }, { key: 'researchGroups', href: '/research#groups' }, { key: 'publications', href: '/research#publications' }] },
  { key: 'people', href: '/people' },
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
  const { theme, setTheme } = useTheme();
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[color:var(--su-maroon)] ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo + Brand */}
          <LocalizedLink to="/" className="flex items-center gap-4 group" aria-label={t('nav.stellenboschUniversity')}>
            <img
              src={suLogo}
              alt="Stellenbosch University logo"
              className="w-14 h-14 object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden md:flex flex-col leading-tight">
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-white">
                {t('nav.stellenboschUniversity')}
              </span>
              <span className="text-xl lg:text-2xl font-bold text-white">
                {t('nav.computerScience')}
              </span>
            </div>
          </LocalizedLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 text-white">
            {navStructure.map((item) =>
              'href' in item && item.href ? (
                <LocalizedLink
                  key={item.key}
                  to={item.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors"
                >
                  {t(`nav.${item.key}`)}
                </LocalizedLink>
              ) : (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors flex items-center gap-1">
                    {t(`nav.${item.key}`)}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === item.key && 'items' in item && item.items && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white text-[#0B1C2D] maroon:bg-white maroon:text-[#0B1C2D] rounded-xl shadow-2xl border border-[#0B1C2D]/10 overflow-hidden"
                      >
                        {item.items.map((subItem) => (
                          <LocalizedLink
                            key={subItem.key}
                            to={subItem.href}
                            className="block px-4 py-3 text-sm hover:bg-[#F3F0E8] maroon:hover:bg-[#F3F0E8] transition-colors"
                          >
                            {t(`nav.${subItem.key}`)}
                          </LocalizedLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            )}
          </nav>

          {/* Right Side Actions: Language + Theme + Mobile menu */}
          <div className="flex items-center gap-2 text-white">
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
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label={t('common.toggleMenu')}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white maroon:bg-white border-t border-[#0B1C2D]/10"
          >
            <nav className="container mx-auto px-4 py-4 space-y-1">
              {navStructure.map((item) =>
                'href' in item && item.href ? (
                  <LocalizedLink
                    key={item.key}
                    to={item.href}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-[#0B1C2D] maroon:text-[#FAF8F3] hover:bg-[#F3F0E8] maroon:hover:bg-white/10 transition-colors"
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
                          className="block pl-8 pr-4 py-2 rounded-lg text-sm text-[#0B1C2D] maroon:text-[#FAF8F3] hover:bg-[#F3F0E8] maroon:hover:bg-white/10 transition-colors"
                        >
                          {t(`nav.${subItem.key}`)}
                        </LocalizedLink>
                      ))}
                  </div>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}