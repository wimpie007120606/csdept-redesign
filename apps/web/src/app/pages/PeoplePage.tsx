import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LocalizedLink } from '../components/LocalizedLink';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { getPeople, assetUrl, type Person } from '../api';
import { fallbackPeople } from '@/content/fallback';
import { peopleBySlug } from '@/content/people';
import { useTranslation } from '@/i18n/useTranslation';

const campusBg = '/realbackground2.jpg';
const PLACEHOLDER_PHOTO = '/people/placeholder.jpg';

/** Normalize slug for routing: lowercase, trim, replace spaces with hyphens. */
function toCanonicalSlug(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function mapPersonToCard(p: Person) {
  let researchAreas: string[] = [];
  try {
    if (p.research_interests_json) researchAreas = JSON.parse(p.research_interests_json);
  } catch {}
  const rawSlug = p.slug && String(p.slug).trim();
  const slug = rawSlug ? toCanonicalSlug(rawSlug) : String(p.id);
  const resolvedPhoto =
    p.image_key ? assetUrl(p.image_key) : (fallbackPeople.find((f) => f.slug === slug)?.image ?? peopleBySlug.get(slug)?.photo ?? null);
  return {
    id: slug,
    slug,
    name: p.full_name,
    primaryTitle: p.title ?? '',
    secondaryTitle: p.role ?? null,
    department: p.division ?? '',
    office: p.office ?? '',
    email: p.email_primary ?? '',
    secondaryEmail: p.email_secondary ?? null,
    phone: p.phone ?? null,
    phoneNote: null as string | null,
    image: resolvedPhoto || null,
    researchAreas,
  };
}

export function PeoplePage() {
  const { t } = useTranslation();
  const [people, setPeople] = useState<typeof fallbackPeople>(fallbackPeople);
  const bg = campusBg;

  useEffect(() => {
    getPeople().then((apiPeople) => {
      if (apiPeople.length > 0) {
        setPeople(apiPeople.map(mapPersonToCard));
      }
    });
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-32 text-white overflow-hidden min-h-[500px] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bg})` }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/90 via-[#0B1C2D]/85 to-[#0B1C2D]/80" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Editorial Label with Divider */}
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <span className="text-[#C8A951] text-xs uppercase tracking-[0.2em] font-medium font-['Spectral']">
                    {t('people.heroLabel')}
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C8A951]/40 to-transparent max-w-[200px]"></div>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="font-['Spectral'] text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.1] tracking-tight">
                {t('people.heroTitle')}
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed font-light">
                {t('people.heroSub')}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* People Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 gap-8">
              {people.map((person, index) => (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <LocalizedLink
                    to={`/people/${person.slug}`}
                    className="group block bg-[#7B1E3A] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="md:w-1/3 h-80 md:h-auto relative overflow-hidden">
                        <img
                          src={person.image || PLACEHOLDER_PHOTO}
                          alt={person.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#7B1E3A]/60 to-transparent md:bg-gradient-to-r md:from-[#7B1E3A] md:to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="md:w-2/3 p-8 lg:p-10 text-white">
                        <div className="space-y-6">
                          {/* Name and Title */}
                          <div>
                            <h2 className="font-['Spectral'] text-3xl lg:text-4xl font-bold text-white mb-2">
                              {person.name}
                            </h2>
                            <p className="text-[#C8A951] text-lg font-medium mb-1">
                              {person.primaryTitle}
                            </p>
                            {person.secondaryTitle && (
                              <p className="text-white/70 text-base">
                                {person.secondaryTitle}
                              </p>
                            )}
                            <p className="text-white/60 text-sm mt-2">
                              {person.department}
                            </p>
                          </div>

                          {/* Contact Information */}
                          <div className="space-y-2">
                            <div className="flex items-start gap-3 text-white/80">
                              <MapPin className="w-4 h-4 text-[#C8A951] flex-shrink-0 mt-1" />
                              <span className="text-sm">{person.office}</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/80">
                              <Mail className="w-4 h-4 text-[#C8A951] flex-shrink-0" />
                              <span className="text-sm">{person.email}</span>
                            </div>
                            {person.phone && (
                              <div className="flex items-center gap-3 text-white/80">
                                <Phone className="w-4 h-4 text-[#C8A951] flex-shrink-0" />
                                <span className="text-sm">{person.phone}</span>
                                {person.phoneNote && (
                                  <span className="text-sm text-white/60">({person.phoneNote})</span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Research Areas */}
                          <div>
                            <p className="text-white/60 text-xs uppercase tracking-wider mb-3">{t('people.researchAreas')}</p>
                            <div className="flex flex-wrap gap-2">
                              {person.researchAreas.map((area, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1.5 bg-white/10 text-white text-sm rounded-lg backdrop-blur-sm border border-white/20"
                                >
                                  {area}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* View Profile Link */}
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
          </div>
        </div>
      </section>
    </div>
  );
}