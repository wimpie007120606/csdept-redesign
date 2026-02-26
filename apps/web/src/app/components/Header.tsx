import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'motion/react';
import suLogo from 'figma:asset/347a6b463ee4b45d24b8d72355624336b98ba649.png';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

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

  const navigationItems = [
    {
      label: 'Study',
      items: [
        { label: 'Undergraduate', href: '/study/undergraduate' },
        { label: 'Postgraduate', href: '/study/postgraduate' },
        { label: 'Course Catalogue', href: '/courses' },
      ],
    },
    {
      label: 'Research',
      items: [
        { label: 'Research Overview', href: '/research' },
        { label: 'Research Groups', href: '/research#groups' },
        { label: 'Publications', href: '/research#publications' },
      ],
    },
    { label: 'People', href: '/people' },
    { label: 'News', href: '/news' },
    { label: 'Events', href: '/events' },
    {
      label: 'Resources',
      items: [
        { label: 'Student Resources', href: '/resources' },
        { label: 'FAQs', href: '/resources#faq' },
        { label: 'Forms', href: '/resources#forms' },
      ],
    },
    { label: 'Contact', href: '/contact' },
  ];

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
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src={suLogo} 
              alt="Stellenbosch University" 
              className="w-12 h-12 object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden md:block">
              <div className="font-['Playfair_Display'] font-bold text-lg text-[#0B1C2D] dark:text-[#FAF8F3]">
                Computer Science
              </div>
              <div className="text-xs text-[#5A5A6E] dark:text-[#C4C4D1]">
                Stellenbosch University
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) =>
              item.href ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[#0B1C2D] dark:text-[#FAF8F3] hover:bg-[#F3F0E8] dark:hover:bg-[#1A2F43] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="px-4 py-2 rounded-lg text-sm font-medium text-[#0B1C2D] dark:text-[#FAF8F3] hover:bg-[#F3F0E8] dark:hover:bg-[#1A2F43] transition-colors flex items-center gap-1">
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-[#1A2F43] rounded-xl shadow-2xl border border-[#0B1C2D]/10 dark:border-[#FAF8F3]/10 overflow-hidden"
                      >
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.label}
                            to={subItem.href}
                            className="block px-4 py-3 text-sm text-[#0B1C2D] dark:text-[#FAF8F3] hover:bg-[#F3F0E8] dark:hover:bg-[#0B1C2D] transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
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
              {navigationItems.map((item) =>
                item.href ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-[#0B1C2D] dark:text-[#FAF8F3] hover:bg-[#F3F0E8] dark:hover:bg-[#1A2F43] transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div key={item.label} className="space-y-1">
                    <div className="px-4 py-3 text-sm font-bold text-[#7B1E3A] dark:text-[#A33456]">
                      {item.label}
                    </div>
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.label}
                        to={subItem.href}
                        className="block pl-8 pr-4 py-2 rounded-lg text-sm text-[#0B1C2D] dark:text-[#FAF8F3] hover:bg-[#F3F0E8] dark:hover:bg-[#1A2F43] transition-colors"
                      >
                        {subItem.label}
                      </Link>
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