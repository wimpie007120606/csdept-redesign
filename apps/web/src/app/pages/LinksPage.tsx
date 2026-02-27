import { motion } from 'motion/react';
import { useTranslation } from '@/i18n/useTranslation';
import { linksPageCards } from '@/content/links';
import { LinkCard } from '../components/LinkCard';

const heroBackground = '/background.jpg';

export function LinksPage() {
  const { t } = useTranslation();

  return (
    <div className="pt-20">
      <section
        className="relative py-32 text-white overflow-hidden min-h-[500px] flex items-center"
        aria-labelledby="links-hero-title"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/90 via-[#0B1C2D]/85 to-[#0B1C2D]/80" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center gap-6">
                <span className="text-[#C8A951] text-xs uppercase tracking-[0.2em] font-medium font-['Spectral']">
                  {t('links.heroLabel')}
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C8A951]/40 to-transparent max-w-[120px]" />
              </div>
              <h1
                id="links-hero-title"
                className="font-['Spectral'] text-5xl md:text-6xl font-semibold leading-tight tracking-tight"
              >
                {t('links.title')}
              </h1>
              <p className="text-lg text-white/85 max-w-2xl mx-auto">
                {t('links.subtitle')}
              </p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {linksPageCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <LinkCard
                  title={card.title}
                  description={card.description}
                  href={card.href}
                  external={card.external}
                  openLabel={t('links.open')}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
