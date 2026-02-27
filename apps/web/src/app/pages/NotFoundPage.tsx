import { motion } from 'motion/react';
import { LocalizedLink } from '../components/LocalizedLink';
import { Home, ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

export function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1C2D] via-[#7B1E3A] to-[#0B1C2D] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <div className="font-['Playfair_Display'] text-[180px] md:text-[240px] font-bold leading-none mb-8 bg-gradient-to-r from-[#C8A951] to-[#E0C87A] bg-clip-text text-transparent">
            404
          </div>

          {/* Message */}
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6">
            {t('errors.pageNotFound')}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('errors.pageNotFoundSub')}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <LocalizedLink
              to="/"
              className="group px-8 py-4 bg-white text-[#7B1E3A] rounded-xl font-semibold hover:bg-[#C8A951] hover:text-white transition-all duration-300 shadow-2xl inline-flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              {t('errors.goHome')}
            </LocalizedLink>
            <button
              onClick={() => window.history.back()}
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white hover:text-[#7B1E3A] transition-all duration-300 inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              {t('errors.goBack')}
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <p className="text-sm text-white/70 mb-4">{t('errors.youMightBeLookingFor')}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <LocalizedLink to="/study/undergraduate" className="text-sm text-white/90 hover:text-[#C8A951] transition-colors">
                {t('nav.undergraduate')}
              </LocalizedLink>
              <span className="text-white/30">•</span>
              <LocalizedLink to="/study/postgraduate" className="text-sm text-white/90 hover:text-[#C8A951] transition-colors">
                {t('nav.postgraduate')}
              </LocalizedLink>
              <span className="text-white/30">•</span>
              <LocalizedLink to="/research" className="text-sm text-white/90 hover:text-[#C8A951] transition-colors">
                {t('nav.research')}
              </LocalizedLink>
              <span className="text-white/30">•</span>
              <LocalizedLink to="/people" className="text-sm text-white/90 hover:text-[#C8A951] transition-colors">
                {t('nav.people')}
              </LocalizedLink>
              <span className="text-white/30">•</span>
              <LocalizedLink to="/contact" className="text-sm text-white/90 hover:text-[#C8A951] transition-colors">
                {t('nav.contact')}
              </LocalizedLink>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
