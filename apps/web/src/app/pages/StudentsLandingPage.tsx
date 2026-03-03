import { motion } from 'motion/react';
import { LocalizedLink } from '../components/LocalizedLink';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { getDoctoralStudents, getMastersStudents } from '@/content/people/students';

const campusBg = '/realbackground2.jpg';

export function StudentsLandingPage() {
  const { t } = useTranslation();
  const doctoralCount = getDoctoralStudents().length;
  const mastersCount = getMastersStudents().length;

  return (
    <div className="pt-20">
      <section className="relative py-32 text-white overflow-hidden min-h-[500px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${campusBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/90 via-[#0B1C2D]/85 to-[#0B1C2D]/80" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <span className="text-[#C8A951] text-xs uppercase tracking-[0.2em] font-medium font-['Spectral']">
                    {t('people.studentsHeroLabel')}
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C8A951]/40 to-transparent max-w-[200px]" />
                </div>
              </div>
              <h1 className="font-['Spectral'] text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.1] tracking-tight">
                {t('people.studentsHeroTitle')}
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed font-light">
                {t('people.studentsHeroSub')}
              </p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <LocalizedLink
              to="/people/students/doctoral"
              className="group block bg-[#7B1E3A] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-8 lg:p-10 text-white">
                <GraduationCap className="w-14 h-14 text-[#C8A951] mb-6" aria-hidden />
                <h2 className="font-['Spectral'] text-2xl lg:text-3xl font-bold text-white mb-2">
                  {t('people.doctoralStudents')}
                </h2>
                <p className="text-white/80 text-sm mb-6">
                  {t('people.doctoralStudentsDesc')}
                </p>
                <p className="text-white/60 text-sm mb-6">
                  {t('people.studentsCount').replace('{{count}}', String(doctoralCount))}
                </p>
                <span className="inline-flex items-center gap-2 text-[#C8A951] font-semibold group-hover:gap-3 transition-all">
                  {t('people.viewList')}
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </LocalizedLink>

            <LocalizedLink
              to="/people/students/masters"
              className="group block bg-[#7B1E3A] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-8 lg:p-10 text-white">
                <GraduationCap className="w-14 h-14 text-[#C8A951] mb-6" aria-hidden />
                <h2 className="font-['Spectral'] text-2xl lg:text-3xl font-bold text-white mb-2">
                  {t('people.mastersStudents')}
                </h2>
                <p className="text-white/80 text-sm mb-6">
                  {t('people.mastersStudentsDesc')}
                </p>
                <p className="text-white/60 text-sm mb-6">
                  {t('people.studentsCount').replace('{{count}}', String(mastersCount))}
                </p>
                <span className="inline-flex items-center gap-2 text-[#C8A951] font-semibold group-hover:gap-3 transition-all">
                  {t('people.viewList')}
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </LocalizedLink>
          </div>
        </div>
      </section>
    </div>
  );
}
