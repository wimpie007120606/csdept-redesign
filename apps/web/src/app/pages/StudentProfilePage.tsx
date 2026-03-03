import { useParams } from 'react-router';
import { motion } from 'motion/react';
import { LocalizedLink } from '../components/LocalizedLink';
import { ArrowLeft, User, BookOpen } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { getStudentBySlug } from '@/content/people/students';
import { getSlugForMemberName } from '@/app/utils/researchPeople';
import { PLACEHOLDER_IMAGE } from '../placeholder';

const campusBg = '/realbackground3.jpeg';

export function StudentProfilePage() {
  const { t } = useTranslation();
  const { studentSlug } = useParams<{ studentSlug: string }>();
  const slug = studentSlug?.trim() ?? '';
  const student = slug ? getStudentBySlug(slug) : undefined;
  const supervisorStaffSlug = student ? getSlugForMemberName(student.supervisor) : null;

  if (!slug) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-background">
        <div className="text-center px-4">
          <h1 className="font-['Spectral'] text-4xl font-bold text-foreground mb-4">
            {t('errors.profileNotFound')}
          </h1>
          <LocalizedLink
            to="/people/students"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#7B1E3A] text-white rounded-xl font-semibold hover:bg-[#7B1E3A]/90 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('people.backToStudents')}
          </LocalizedLink>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-background">
        <div className="text-center px-4">
          <h1 className="font-['Spectral'] text-4xl font-bold text-foreground mb-4">
            {t('errors.profileNotFound')}
          </h1>
          <p className="text-muted-foreground mb-6">{t('errors.profileNotFoundSub')}</p>
          <LocalizedLink
            to="/people/students"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#7B1E3A] text-white rounded-xl font-semibold hover:bg-[#7B1E3A]/90 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('people.backToStudents')}
          </LocalizedLink>
        </div>
      </div>
    );
  }

  const backTo = student.level === 'doctoral' ? '/people/students/doctoral' : '/people/students/masters';
  const levelLabel = student.level === 'doctoral' ? t('people.doctoralStudentLabel') : t('people.mastersStudentLabel');

  return (
    <div className="pt-20">
      {/* Header Section — same structure as staff profile */}
      <section className="relative py-20 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${campusBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/95 via-[#7B1E3A]/90 to-[#0B1C2D]/95" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <LocalizedLink
            to={backTo}
            className="inline-flex items-center gap-2 text-[#C8A951] hover:text-[#C8A951]/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            {student.level === 'doctoral' ? t('people.doctoralStudents') : t('people.mastersStudents')}
          </LocalizedLink>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Profile Image — same as staff */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:w-80 flex-shrink-0"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img
                  src={PLACEHOLDER_IMAGE}
                  alt=""
                  loading="lazy"
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
            </motion.div>

            {/* Profile Info — same layout as staff */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1"
            >
              <h1 className="font-['Spectral'] text-5xl lg:text-6xl font-bold mb-4">
                {student.name}
              </h1>
              <p className="text-[#C8A951] text-2xl font-semibold mb-8">
                {levelLabel}
              </p>

              {/* Info blocks — same style as staff contact block */}
              <div className="space-y-3 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" aria-hidden />
                  <div className="text-sm min-w-0">
                    <p className="font-semibold text-white/90 mb-1">{t('people.supervisor')}</p>
                    {supervisorStaffSlug ? (
                      <LocalizedLink
                        to={`/people/${supervisorStaffSlug}`}
                        className="text-white hover:text-[#C8A951] transition-colors underline underline-offset-2"
                      >
                        {student.supervisor}
                      </LocalizedLink>
                    ) : (
                      <p className="text-white/80">{student.supervisor}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3 pt-2 border-t border-white/10">
                  <BookOpen className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" aria-hidden />
                  <div className="text-sm min-w-0">
                    <p className="font-semibold text-white/90 mb-1">{t('people.researchTopic')}</p>
                    <p className="text-white/80 leading-relaxed">{student.topic}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Back link in content area — same as staff */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <LocalizedLink
            to={backTo}
            className="inline-flex items-center gap-2 text-[#7B1E3A] font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            {student.level === 'doctoral' ? t('people.backToDoctoral') : t('people.backToMasters')}
          </LocalizedLink>
        </div>
      </section>
    </div>
  );
}
