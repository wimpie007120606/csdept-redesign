import { useEffect, useState } from 'react';
import { Outlet, useParams, Navigate } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { Toaster } from './ui/sonner';
import { useLanguage } from '@/i18n/LanguageProvider';
import { isSupportedLang } from '../utils/langPath';
import { NewsletterModal, NewsletterModalProvider } from './newsletter/NewsletterModal';

const campusBackground = '/realbackground2.jpg';

export function Layout() {
  const { lang } = useParams<{ lang: string }>();
  const { setLanguage } = useLanguage();
  const [newsletterOpen, setNewsletterOpen] = useState(false);

  useEffect(() => {
    if (lang && isSupportedLang(lang)) setLanguage(lang);
  }, [lang, setLanguage]);

  useEffect(() => {
    const t = setTimeout(() => setNewsletterOpen(true), 6000);
    return () => clearTimeout(t);
  }, []);

  if (lang && !isSupportedLang(lang)) {
    return <Navigate to="/en" replace />;
  }

  return (
    <NewsletterModalProvider
      value={{
        openModal: () => setNewsletterOpen(true),
        closeModal: () => setNewsletterOpen(false),
      }}
    >
      <div className="min-h-screen flex flex-col font-sans relative">
        <ScrollToTop />
        {/* Background Image */}
        <div
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.03] maroon:opacity-[0.06]"
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

      <NewsletterModal
        isOpen={newsletterOpen}
        onClose={() => setNewsletterOpen(false)}
      />
      <Toaster richColors position="top-center" />
    </NewsletterModalProvider>
  );
}