import { motion } from 'motion/react';
import { LocalizedLink } from '../components/LocalizedLink';
import { useTranslation } from '@/i18n/useTranslation';

const heroBackground = '/realbackground2.jpg';

export function InstituteAppliedCSPage() {
  const { t } = useTranslation();
  const objectives = t('institute.objectives').split('\n').filter(Boolean);
  const members = t('institute.members').split('\n').filter(Boolean);
  const pastProjects = t('institute.pastProjects').split('\n\n').filter(Boolean);

  return (
    <div className="pt-20">
      <section
        className="relative py-28 text-white overflow-hidden min-h-[400px] flex items-center"
        aria-labelledby="institute-hero-title"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/90 via-[#0B1C2D]/85 to-[#0B1C2D]/80" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <LocalizedLink
                to="/resources/links"
                className="text-sm text-white/80 hover:text-white transition-colors inline-block mb-2"
              >
                {t('institute.backToLinks')}
              </LocalizedLink>
              <h1
                id="institute-hero-title"
                className="font-['Spectral'] text-4xl md:text-5xl font-semibold leading-tight"
              >
                {t('institute.title')}
              </h1>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg maroon:prose-invert max-w-none space-y-12"
          >
            <p className="text-muted-foreground leading-relaxed text-lg">
              {t('institute.intro')}
            </p>

            <div>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-foreground mb-4">
                {t('institute.objectivesTitle')}
              </h2>
              <p className="text-muted-foreground mb-3">
                {t('institute.objectivesIntro')}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                {objectives.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-foreground mb-4">
                {t('institute.membersTitle')}
              </h2>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                {members.map((name, i) => (
                  <li key={i}>{name}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-foreground mb-4">
                {t('institute.contactTitle')}
              </h2>
              <address className="not-italic text-muted-foreground space-y-1">
                <p>{t('institute.addressOrg')}</p>
                <p>{t('institute.addressDivision')}</p>
                <p>{t('institute.addressDept')}</p>
                <p>{t('institute.addressUni')}</p>
                <p>{t('institute.addressBag')}</p>
                <p className="pt-2">
                  {t('institute.telephoneLabel')}{' '}
                  <a
                    href="tel:+27218084232"
                    className="text-[#7B1E3A] hover:underline focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2 rounded"
                  >
                    +27 21 808 4232
                  </a>
                </p>
                <p>
                  {t('institute.emailLabel')}{' '}
                  <a
                    href="mailto:visserw@sun.ac.za"
                    className="text-[#7B1E3A] hover:underline focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2 rounded"
                  >
                    visserw@sun.ac.za
                  </a>
                </p>
              </address>
            </div>

            <div>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-foreground mb-4">
                {t('institute.pastProjectsTitle')}
              </h2>
              <div className="space-y-6">
                {pastProjects.map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
