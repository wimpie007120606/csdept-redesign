import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { LocalizedLink } from './LocalizedLink';
import { pathWithoutLang } from '../utils/langPath';
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '@/i18n/useTranslation';

const suLogo = '/newlogo.jpeg';

const navStructure = [
  { key: 'study', items: [{ key: 'undergraduate', href: '/study/undergraduate' }, { key: 'postgraduate', href: '/study/postgraduate' }, { key: 'courseCatalogue', href: '/courses' }] },
  { key: 'research', items: [{ key: 'researchOverview', href: '/research' }, { key: 'researchGroups', href: '/research#groups' }, { key: 'publications', href: '/research#publications' }] },
  { key: 'people', href: '/people' },
  { key: 'news', href: '/news' },
  { key: 'events', href: '/events' },
  { key: 'resources', items: [{ key: 'studentResources', href: '/resources' }, { key: 'faqs', href: '/resources#faq' }, { key: 'forms', href: '/resources#forms' }] },
  { key: 'bridging', href: '/bridging' },
  { key: 'links', href: '/links' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-[#0B1C2D]/80 backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <LocalizedLink to="/" className="flex items-center space-x-3 group">
            <img 
              src={suLogo} 
              alt="Stellenbosch University" 
              className="w-12 h-12 object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden md:block">
              <div className="font-['Playfair_Display'] font-bold text-lg text-[#0B1C2D] dark:text-[#FAF8F3]">
                {t('nav.computerScience')}
              </div>
              <div className="text-xs text-[#5A5A6E] dark:text-[#C4C4D1]">
                {t('nav.stellenboschUniversity')}
              </div>
            </div>
          </LocalizedLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navStructure.map((item) =>
              'href' in item && item.href ? (
                <LocalizedLink
                  key={item.key}
                  to={item.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[#0B1C2D] dark:text-[#FAF8F3] hover:bg-[#F3F0E8] dark:hover:bg-[#1A2F43] transition-colors"
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
                  <button className="px-4 py-2 rounded-lg text-sm font-medium text-[#0B1C2D] dark:text-[#FAF8F3] hover:bg-[#F3F0E8] dark:hover:bg-[#1A2F43] transition-colors flex items-center gap-1">
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
                        className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-[#1A2F43] rounded-xl shadow-2xl border border-[#0B1C2D]/10 dark:border-[#FAF8F3]/10 overflow-hidden"
                      >
                        {item.items.map((subItem) => (
                          <LocalizedLink
                            key={subItem.key}
                            to={subItem.href}
                            className="block px-4 py-3 text-sm text-[#0B1C2D] dark:text-[#FAF8F3] hover:bg-[#F3F0E8] dark:hover:bg-[#0B1C2D] transition-colors"
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
          <div className="flex items-center gap-2">
            <div
              className="flex rounded-lg overflow-hidden border border-[#0B1C2D]/10 dark:border-[#FAF8F3]/10"
              role="group"
              aria-label="Language"
            >
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-[#7B1E3A] text-white dark:bg-[#A33456]'
                    : 'bg-transparent text-[#0B1C2D] dark:text-[#FAF8F3] hover:bg-[#F3F0E8] dark:hover:bg-[#1A2F43]'
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
                    ? 'bg-[#7B1E3A] text-white dark:bg-[#A33456]'
                    : 'bg-transparent text-[#0B1C2D] dark:text-[#FAF8F3] hover:bg-[#F3F0E8] dark:hover:bg-[#1A2F43]'
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
                    ? 'bg-[#7B1E3A] text-white dark:bg-[#A33456]'
                    : 'bg-transparent text-[#0B1C2D] dark:text-[#FAF8F3] hover:bg-[#F3F0E8] dark:hover:bg-[#1A2F43]'
                }`}
                aria-label={t('nav.isiXhosa')}
                aria-pressed={language === 'xh'}
              >
                XH
              </button>
            </div>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-[#F3F0E8] dark:hover:bg-[#1A2F43] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#F3F0E8] dark:hover:bg-[#1A2F43] transition-colors"
              aria-label="Toggle menu"
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
            className="lg:hidden bg-white dark:bg-[#0B1C2D] border-t border-[#0B1C2D]/10 dark:border-[#FAF8F3]/10"
          >
            <nav className="container mx-auto px-4 py-4 space-y-1">
              {navStructure.map((item) =>
                'href' in item && item.href ? (
                  <LocalizedLink
                    key={item.key}
                    to={item.href}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-[#0B1C2D] dark:text-[#FAF8F3] hover:bg-[#F3F0E8] dark:hover:bg-[#1A2F43] transition-colors"
                  >
                    {t(`nav.${item.key}`)}
                  </LocalizedLink>
                ) : (
                  <div key={item.key} className="space-y-1">
                    <div className="px-4 py-3 text-sm font-bold text-[#7B1E3A] dark:text-[#A33456]">
                      {t(`nav.${item.key}`)}
                    </div>
                    {'items' in item &&
                      item.items.map((subItem) => (
                        <LocalizedLink
                          key={subItem.key}
                          to={subItem.href}
                          className="block pl-8 pr-4 py-2 rounded-lg text-sm text-[#0B1C2D] dark:text-[#FAF8F3] hover:bg-[#F3F0E8] dark:hover:bg-[#1A2F43] transition-colors"
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