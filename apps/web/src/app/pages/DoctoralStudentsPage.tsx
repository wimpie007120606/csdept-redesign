import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { LocalizedLink } from '../components/LocalizedLink';
import { ArrowLeft, ArrowRight, Search, User } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { getDoctoralStudents, type Student } from '@/content/people/students';

const campusBg = '/realbackground2.jpg';
const PLACEHOLDER_PHOTO = '/people/placeholder.jpg';

function filterStudents(students: Student[], query: string): Student[] {
  const q = query.trim().toLowerCase();
  if (!q) return students;
  return students.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.supervisor.toLowerCase().includes(q) ||
      s.topic.toLowerCase().includes(q)
  );
}

export function DoctoralStudentsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const students = useMemo(() => getDoctoralStudents(), []);
  const filtered = useMemo(() => filterStudents(students, searchQuery), [students, searchQuery]);

  return (
    <div className="pt-20">
      <section className="relative py-24 text-white overflow-hidden min-h-[320px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${campusBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/90 via-[#0B1C2D]/85 to-[#0B1C2D]/80" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl">
            <LocalizedLink
              to="/people/students"
              className="inline-flex items-center gap-2 text-white/80 hover:text-[#C8A951] text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('people.backToStudents')}
            </LocalizedLink>
            <h1 className="font-['Spectral'] text-5xl md:text-6xl font-semibold leading-tight">
              {t('people.doctoralStudents')}
            </h1>
            <p className="text-white/80 mt-4 text-lg">
              {t('people.studentsCount').replace('{{count}}', String(students.length))}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('people.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:border-transparent"
                aria-label={t('people.searchPlaceholder')}
              />
            </div>

            {filtered.length === 0 ? (
              <p className="text-muted-foreground py-12 text-center">{t('people.noStudentsMatch')}</p>
            ) : (
              <div className="space-y-6">
                {filtered.map((student, index) => (
                  <motion.div
                    key={student.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <LocalizedLink
                      to={`/people/students/${student.slug}`}
                      className="group block bg-[#7B1E3A] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden bg-[#5a1630] flex items-center justify-center">
                          <img
                            src={PLACEHOLDER_PHOTO}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#7B1E3A]/60 to-transparent md:bg-gradient-to-r md:from-[#7B1E3A] md:to-transparent" />
                          <User className="w-16 h-16 text-white/40 absolute inset-0 m-auto" aria-hidden />
                        </div>
                        <div className="md:w-2/3 p-8 lg:p-10 text-white">
                          <div className="space-y-6">
                            <div>
                              <h2 className="font-['Spectral'] text-3xl lg:text-4xl font-bold text-white mb-2">
                                {student.name}
                              </h2>
                              <p className="text-[#C8A951] text-lg font-medium mb-1">
                                {t('people.doctoralStudentLabel')}
                              </p>
                              <p className="text-white/60 text-sm mt-2">
                                {t('people.supervisor')}: {student.supervisor}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-white/80 text-sm line-clamp-2">{student.topic}</p>
                            </div>
                            <div className="pt-2">
                              <span className="inline-flex items-center gap-2 text-[#C8A951] font-semibold group-hover:gap-3 transition-all">
                                {t('people.viewFullProfile')}
                                <ArrowRight className="w-5 h-5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </LocalizedLink>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
