import { Link } from 'react-router';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

const suLogo = '/newlogo.jpeg';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-[#000000] text-[#0B1C2D] dark:text-[#FAF8F3] pt-16 pb-8 border-t border-[#0B1C2D]/10 dark:border-[#FAF8F3]/10">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={suLogo} 
                alt={t('nav.stellenboschUniversity')} 
                className="w-10 h-10 object-contain"
              />
              <div className="font-['Playfair_Display'] font-bold text-lg">{t('footer.computerScience')}</div>
            </div>
            <p className="text-sm text-[#5A5A6E] dark:text-[#C4C4D1] mb-4">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-[#0B1C2D]/5 dark:bg-white/5 hover:bg-[#0B1C2D]/10 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-[#0B1C2D]/5 dark:bg-white/5 hover:bg-[#0B1C2D]/10 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-[#0B1C2D]/5 dark:bg-white/5 hover:bg-[#0B1C2D]/10 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-[#0B1C2D]/5 dark:bg-white/5 hover:bg-[#0B1C2D]/10 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-[#0B1C2D]/5 dark:bg-white/5 hover:bg-[#0B1C2D]/10 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-['Playfair_Display'] font-semibold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/study/undergraduate" className="text-[#5A5A6E] dark:text-[#C4C4D1] hover:text-[#C8A951] transition-colors">
                  {t('nav.undergraduate')}
                </Link>
              </li>
              <li>
                <Link to="/study/postgraduate" className="text-[#5A5A6E] dark:text-[#C4C4D1] hover:text-[#C8A951] transition-colors">
                  {t('nav.postgraduate')}
                </Link>
              </li>
              <li>
                <Link to="/research" className="text-[#5A5A6E] dark:text-[#C4C4D1] hover:text-[#C8A951] transition-colors">
                  {t('nav.research')}
                </Link>
              </li>
              <li>
                <Link to="/people" className="text-[#5A5A6E] dark:text-[#C4C4D1] hover:text-[#C8A951] transition-colors">
                  {t('nav.people')}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-[#5A5A6E] dark:text-[#C4C4D1] hover:text-[#C8A951] transition-colors">
                  {t('nav.courseCatalogue')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-['Playfair_Display'] font-semibold text-lg mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/resources" className="text-[#5A5A6E] dark:text-[#C4C4D1] hover:text-[#C8A951] transition-colors">
                  {t('nav.studentResources')}
                </Link>
              </li>
              <li>
                <Link to="/resources#faq" className="text-[#5A5A6E] dark:text-[#C4C4D1] hover:text-[#C8A951] transition-colors">
                  {t('nav.faqs')}
                </Link>
              </li>
              <li>
                <Link to="/resources#forms" className="text-[#5A5A6E] dark:text-[#C4C4D1] hover:text-[#C8A951] transition-colors">
                  {t('footer.formsDocuments')}
                </Link>
              </li>
              <li>
                <a href="#" className="text-[#5A5A6E] dark:text-[#C4C4D1] hover:text-[#C8A951] transition-colors">
                  {t('footer.academicCalendar')}
                </a>
              </li>
              <li>
                <a href="#" className="text-[#5A5A6E] dark:text-[#C4C4D1] hover:text-[#C8A951] transition-colors">
                  {t('footer.accessibility')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-['Playfair_Display'] font-semibold text-lg mb-4">{t('footer.contactUs')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-0.5" />
                <span className="text-[#5A5A6E] dark:text-[#C4C4D1]">
                  {t('footer.addressLine1')}
                  <br />
                  {t('footer.addressLine2')}
                  <br />
                  {t('footer.addressLine3')}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C8A951]" />
                <span className="text-[#5A5A6E] dark:text-[#C4C4D1]">+27 21 808 4232</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C8A951]" />
                <a href="mailto:cs@sun.ac.za" className="text-[#5A5A6E] dark:text-[#C4C4D1] hover:text-[#C8A951] transition-colors">
                  cs@sun.ac.za
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#0B1C2D]/10 dark:border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#5A5A6E] dark:text-[#C4C4D1]">
            <div>
              © {currentYear} {t('nav.stellenboschUniversity')} {t('footer.computerScience')}. {t('footer.copyright')}
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#C8A951] transition-colors">
                {t('footer.privacyPolicy')}
              </a>
              <a href="#" className="hover:text-[#C8A951] transition-colors">
                {t('footer.termsOfUse')}
              </a>
              <a href="#" className="hover:text-[#C8A951] transition-colors">
                {t('footer.accessibility')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}