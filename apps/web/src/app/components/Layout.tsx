import { useEffect } from 'react';
import { Outlet, useParams, Navigate } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { useLanguage } from '@/i18n/LanguageProvider';
import { isSupportedLang } from '../utils/langPath';

const campusBackground = '/realbackground2.jpg';

export function Layout() {
  const { lang } = useParams<{ lang: string }>();
  const { setLanguage } = useLanguage();

  useEffect(() => {
    if (lang && isSupportedLang(lang)) setLanguage(lang);
  }, [lang, setLanguage]);

  if (lang && !isSupportedLang(lang)) {
    return <Navigate to="/en" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <ScrollToTop />
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.03] dark:opacity-[0.02]"
        style={{ backgroundImage: `url(${campusBackground})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}