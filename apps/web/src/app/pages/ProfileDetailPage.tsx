import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useParams } from 'react-router';
import { LocalizedLink } from '../components/LocalizedLink';
import { ArrowLeft, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';
import { getPerson, assetUrl, type PersonDetail } from '../api';
import { PLACEHOLDER_IMAGE } from '../placeholder';
import { AchievementsTimeline, type YearGroup } from '../components/AchievementsTimeline';
import { lynetteAchievementsByYear } from '@/content/lynette-achievements';
import { useTranslation } from '@/i18n/useTranslation';

const campusBackground = '/background.jpg';
const STATIC_IMAGES: Record<string, string> = {
  'whk-bester': '/WillemPeople.jpg',
  'lynette-van-zijl': '/LynettePeople.webp',
  'brink-van-der-merwe': '/BrinkPeople.jpeg',
  'walter-schulze': '/WalterPeople.jpeg',
};

function buildYearGroupsFromPublications(
  pubs: { title: string; authors?: string; venue?: string; year: number }[]
): YearGroup[] {
  const byYear = new Map<number, typeof pubs>();
  for (const p of pubs) {
    const y = p.year ?? 0;
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(p);
  }
  return Array.from(byYear.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, publications]) => ({
      year,
      publications: publications.map((pub) => ({
        title: pub.title,
        authors: pub.authors,
        venue: pub.venue,
        year: pub.year,
      })),
    }));
}

function buildYearGroupsFromSelected(
  pubs: { title: string; authors?: string; venue?: string; year: number; citations?: number }[]
): YearGroup[] {
  const byYear = new Map<number, typeof pubs>();
  for (const p of pubs) {
    const y = p.year ?? 0;
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(p);
  }
  return Array.from(byYear.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, publications]) => ({
      year,
      publications: publications.map((pub) => ({
        title: pub.title,
        authors: pub.authors,
        venue: pub.venue,
        year: pub.year,
      })),
    }));
}

function AchievementsEmptyState({ t }: { t: (key: string) => string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl border border-dashed border-border bg-muted/30 p-10 text-center"
    >
      <p className="text-muted-foreground font-medium">{t('achievements.empty')}</p>
      <p className="text-sm text-muted-foreground mt-2">{t('achievements.emptySub')}</p>
    </motion.div>
  );
}

export function ProfileDetailPage() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
  const [loaded, setLoaded] = useState(false);

  const staticProfiles: Record<string, Record<string, unknown>> = {
    'whk-bester': {
      id: 'whk-bester',
      name: 'W. H. K. Bester',
      primaryTitle: 'Technical Officer',
      secondaryTitle: 'Junior Lecturer (since 2014)',
      department: 'Computer Science Division, Department of Mathematical Sciences',
      institution: 'Stellenbosch University',
      office: 'A508, General Engineering Building',
      address: 'Private Bag X1, Matieland 7602, South Africa',
      campusLocation: 'c.o. Banghoek Road and Joubert Street, Stellenbosch, South Africa',
      email: 'whkbester@cs.sun.ac.za',
      secondaryEmail: 'whkbester@gmail.com',
      phone: '+27 21 808 4232',
      phoneNote: 'administrative officer',
      image: STATIC_IMAGES['whk-bester'],

      bio: [
        'Without any formal qualification or training, I worked as a software programmer/analyst for eight years in the media industry. I was involved with system programming, web strategising, and full-text data archiving and retrieval. In 2003, I turned to university studies for an undergraduate degree in Computer Science and Mathematics at Stellenbosch University, followed by an honours and a master\'s degree. I was appointed as technical officer in the Computer Science Division in 2009, and then as junior lecturer in 2014.',
        'Besides my life in academia, I am also an active performing musician as a member of the Cape Consort, a group dedicated to historically informed performance of early music. Since 2001, I have been a freelance music and theatre critic for Die Burger (now also Netwerk24), and I occasionally broadcast on Fine Music Radio.',
      ],
      
      researchInterests: [
        'Formal languages and automata theory',
        'Software engineering principles applied to system programming',
        'Web systems and tooling',
        'Efficiency and space requirements of algorithms used in system/programming libraries',
      ],
      
      qualifications: [
        {
          degree: 'MSc (Computer Science) cum laude',
          institution: 'Stellenbosch University',
          supervisors: 'Willem Visser and Cornelia Inggs',
        },
        {
          degree: 'PhD in progress',
          institution: 'Stellenbosch University',
          supervisors: 'Brink van der Merwe',
          focus: 'Automata theory with a focus on regular expression matching',
        },
      ],
      
      teaching: [
        'CS145: Computer Systems',
        'CS146: Problem Solving using Computer Programming',
        'CS244: Computer Architectures and Operating Systems',
      ],
      
      publications: [
        {
          title: 'Efficient Regular Expression Matching Using Finite Automata',
          authors: 'W. H. K. Bester, B. van der Merwe',
          venue: 'Journal of Universal Computer Science',
          year: 2023,
        },
        {
          title: 'A Study of Efficient Glushkov Automata Construction',
          authors: 'W. H. K. Bester, C. Inggs, W. Visser',
          venue: 'SAICSIT Conference Proceedings',
          year: 2020,
        },
      ],
    },

    'lynette-van-zijl': {
      id: 'lynette-van-zijl',
      name: 'Lynette van Zijl',
      primaryTitle: 'Professor',
      secondaryTitle: 'Academic Staff',
      department: 'Computer Science Division, Department of Mathematical Sciences',
      institution: 'Stellenbosch University',
      office: 'A520, General Engineering Building',
      address: 'Private Bag X1, 7602 Matieland, South Africa',
      campusLocation: 'c/o Banghoek- and Joubert Street, Stellenbosch',
      email: 'lvzijl@cs.sun.ac.za',
      secondaryEmail: 'lvzijl@sun.ac.za',
      phone: '+27 21 808 4232',
      phoneNote: 'secretary',
      image: STATIC_IMAGES['lynette-van-zijl'],

      bio: [
        'My research interests lie in automata and formal languages, as well as the computer science foundations underlying applications in nature conservation research and assistive technologies.',
      ],

      researchInterests: [
        'Automata and formal languages',
        'Computer science foundations for nature conservation research',
        'Assistive technologies',
      ],

      teaching: [
        'CS214',
        'CS345 / CS711',
        'Advanced Automata Theory',
      ],

      programmeCommittees: [
        { conference: 'SLTAT', years: ['2019', '2022'] },
        { conference: 'DCFS', years: ['2017', '2018', '2019'] },
        { conference: 'ICTAC', years: ['2018'] },
        { conference: 'SAICSIT', years: ['2013', '2015', '2016', '2017', '2018'] },
        { conference: 'FSMNLP', years: ['2013', '2014', '2015', '2017'] },
      ],

      hasPublicationsTimeline: true,
      useLynetteFullAchievements: true,
    },

    'brink-van-der-merwe': {
      id: 'brink-van-der-merwe',
      name: 'Prof. Brink van der Merwe',
      primaryTitle: 'Professor',
      secondaryTitle: 'Academic Staff',
      department: 'Computer Science Division, Department of Mathematical Sciences',
      institution: 'Stellenbosch University',
      office: 'General Engineering Building',
      address: 'Private Bag X1, Matieland 7602, South Africa',
      campusLocation: 'c.o. Banghoek Road and Joubert Street, Stellenbosch, South Africa',
      email: 'abvdm@cs.sun.ac.za',
      image: STATIC_IMAGES['brink-van-der-merwe'],

      bio: [
        'Brink van der Merwe is a professor in the Computer Science Division at Stellenbosch University. His research focuses on automata theory, formal languages, regular expression matching, and program verification. His work spans theoretical computer science and practical verification tools, with applications in software correctness and computational systems.',
        'He has supervised numerous postgraduate students and actively contributes to research in descriptional complexity and formal models of computation.',
      ],
      
      researchInterests: [
        'Automata theory',
        'Formal languages',
        'Regular expression matching',
        'Program verification',
        'Descriptional complexity',
        'Software correctness',
      ],
      
      selectedPublications: [
        {
          title: 'Music generation with Markov models',
          authors: 'B. van der Merwe, et al.',
          venue: 'IEEE MultiMedia',
          year: 2011,
          citations: 142,
        },
        {
          title: 'Verifying Android applications using Java Pathfinder',
          authors: 'H. Muccini, A. Di Francesco, P. Esposito, B. van der Merwe',
          venue: 'ACM SIGSOFT Software Engineering Notes',
          year: 2012,
          citations: 89,
        },
        {
          title: 'A computationally inexpensive energy model for horizontal electrical water heaters',
          authors: 'M. J. Booysen, J. A. A. Engelbrecht, A. Molinaro, B. van der Merwe',
          venue: 'IEEE Transactions on Smart Grid',
          year: 2016,
          citations: 67,
        },
        {
          title: 'Analyzing catastrophic backtracking behavior in practical regular expression matching',
          authors: 'N. Weideman, B. van der Merwe, M. Berglund, W. Visser',
          venue: 'arXiv preprint',
          year: 2014,
          citations: 45,
        },
        {
          title: 'Execution and property specifications for jpf-android',
          authors: 'H. van der Merwe, B. van der Merwe, W. Visser',
          venue: 'ACM SIGSOFT Software Engineering Notes',
          year: 2014,
          citations: 38,
        },
      ],
      
      scholarMetrics: {
        citations: 1187,
        hIndex: 19,
        i10Index: 33,
      },
    },

    'walter-schulze': {
      id: 'walter-schulze',
      name: 'Walter Schulze',
      primaryTitle: 'Researcher',
      secondaryTitle: 'Informatics Division',
      department: 'Computer Science Division, Department of Mathematical Sciences',
      institution: 'Stellenbosch University',
      office: 'General Engineering Building',
      address: 'Private Bag X1, Matieland 7602, South Africa',
      campusLocation: 'c.o. Banghoek Road and Joubert Street, Stellenbosch, South Africa',
      email: 'walter@walterschulze.org',
      image: STATIC_IMAGES['walter-schulze'],

      bio: [
        'Walter Schulze is a researcher in Informatics at Stellenbosch University whose work focuses on formal language theory, regular expressions, programming language design, and algorithmic music generation. His research intersects theoretical computer science and creative computation, particularly in the application of formal grammars and automata to music and language processing systems.',
        'His notable work includes pioneering research in music generation using Markov models and formal language theory approaches to computational creativity.',
      ],
      
      researchInterests: [
        'Formal Language Theory',
        'Automata & Regular Expressions',
        'Regular Expression Derivatives',
        'Programming Languages',
        'Serialization Systems',
        'Music Generation with Formal Models',
        'Computational Creativity',
      ],
      
      selectedPublications: [
        {
          title: 'Music generation with Markov models',
          authors: 'A. Van Der Merwe, W. Schulze',
          venue: 'IEEE Multimedia 18(3), 78–85',
          year: 2010,
          citations: 138,
        },
        {
          title: 'A formal language theory approach to music generation',
          authors: 'W. Schulze',
          venue: 'Stellenbosch University',
          year: 2010,
          citations: 10,
        },
      ],
      
      scholarMetrics: {
        citations: 148,
        hIndex: 2,
        i10Index: 2,
        citationsSince2021: 59,
      },
      
      collaborators: [
        'Brink van der Merwe',
      ],
    },
  };

  const normalizedSlug = slug ? decodeURIComponent(slug).trim() : '';

  useEffect(() => {
    if (!normalizedSlug) {
      setLoaded(true);
      return;
    }
    const fallback = staticProfiles[normalizedSlug] ?? null;
    setProfile(fallback ? { ...fallback } : null);
    getPerson(normalizedSlug).then((apiPerson) => {
      if (!apiPerson) {
        setLoaded(true);
        return;
      }
      let researchInterests: string[] = [];
      try {
        if (apiPerson.research_interests_json) researchInterests = JSON.parse(apiPerson.research_interests_json);
      } catch {}
      const imageUrl = apiPerson.image_key ? assetUrl(apiPerson.image_key) : null;
      const fallbackImg = fallback?.image as string | undefined;
      const mapped: Record<string, unknown> = {
        id: apiPerson.slug,
        name: apiPerson.full_name,
        primaryTitle: apiPerson.title ?? '',
        secondaryTitle: apiPerson.role ?? null,
        department: apiPerson.division ?? null,
        institution: 'Stellenbosch University',
        office: apiPerson.office ?? null,
        address: null,
        campusLocation: null,
        email: apiPerson.email_primary ?? null,
        secondaryEmail: apiPerson.email_secondary ?? null,
        phone: apiPerson.phone ?? null,
        phoneNote: null,
        image: (imageUrl || fallbackImg || STATIC_IMAGES[normalizedSlug]) ?? null,
        bio: apiPerson.bio ? apiPerson.bio.split('\n\n').filter(Boolean) : [],
        researchInterests,
        teaching: null,
        programmeCommittees: null,
        qualifications: apiPerson.qualifications ?? null,
        selectedPublications: null,
        scholarMetrics: null,
        collaborators: null,
      };
      if (normalizedSlug === 'lynette-van-zijl') {
        mapped.hasPublicationsTimeline = true;
        mapped.useLynetteFullAchievements = true;
      } else if (apiPerson.publications_by_year && apiPerson.publications_by_year.length > 0) {
        mapped.hasPublicationsTimeline = true;
        mapped.publicationsTimeline = apiPerson.publications_by_year.map((y) => ({
          year: y.year,
          publications: y.publications.map((p: { citation: string; venue?: string; tags_json?: string }) => ({
            title: p.citation.split(',')[0] || p.citation,
            authors: '',
            venue: p.venue || '',
            type: (() => {
              try {
                const t = p.tags_json ? JSON.parse(p.tags_json) : [];
                return Array.isArray(t) ? (t[0] ?? 'journal') : 'journal';
              } catch { return 'journal'; }
            })(),
          })),
        }));
      } else if (apiPerson.publications && apiPerson.publications.length > 0) {
        mapped.publications = apiPerson.publications.map((p: { year: number; citation: string; venue?: string }) => ({
          title: p.citation.split(',')[0] || p.citation,
          authors: '',
          venue: p.venue ?? '',
          year: p.year,
        }));
      }
      setProfile(mapped);
    }).finally(() => setLoaded(true));
  }, [normalizedSlug]);

  if (!normalizedSlug || (loaded && !profile)) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-background">
        <div className="text-center px-4">
          <h1 className="font-['Spectral'] text-4xl font-bold text-foreground mb-4">{t('errors.profileNotFound')}</h1>
          <p className="text-muted-foreground mb-6">{t('errors.profileNotFoundSub')}</p>
          <LocalizedLink
            to="/people"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('common.backToPeople')}
          </LocalizedLink>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Header Section */}
      <section className="relative py-20 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${campusBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/95 via-[#7B1E3A]/90 to-[#0B1C2D]/95" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <LocalizedLink 
            to="/people"
            className="inline-flex items-center gap-2 text-[#C8A951] hover:text-[#C8A951]/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('common.backToPeople')}
          </LocalizedLink>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:w-80 flex-shrink-0"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img
                  src={profile?.image ?? PLACEHOLDER_IMAGE}
                  alt={profile?.name ?? 'Profile'}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            {/* Profile Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1"
            >
              <h1 className="font-['Spectral'] text-5xl lg:text-6xl font-bold mb-4">
                {profile?.name}
              </h1>
              <p className="text-[#C8A951] text-2xl font-semibold mb-2">
                {profile?.primaryTitle}
              </p>
              {profile.secondaryTitle && (
                <p className="text-white/70 text-lg mb-4">{profile.secondaryTitle}</p>
              )}
              <p className="text-white/60 mb-8">{profile?.department}</p>

              {/* Contact Information */}
              <div className="space-y-3 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <div className="text-sm">
                    <p className="font-semibold">{profile?.office}</p>
                    <p className="text-white/70">{profile.address}</p>
                    <p className="text-white/70">{profile.campusLocation}</p>
                  </div>
                </div>
                {profile.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#C8A951] flex-shrink-0" />
                    <div className="text-sm">
                      <p>{profile.phone}</p>
                      {profile.phoneNote && (
                        <p className="text-white/60">({profile.phoneNote})</p>
                      )}
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <div className="text-sm space-y-1">
                    <p>{profile?.email}</p>
                    {profile.secondaryEmail && (
                      <p className="text-white/80">{profile.secondaryEmail}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="space-y-16">
            {/* Bio */}
            {profile.bio && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.about')}
                </h2>
                <div className="prose prose-lg max-w-none">
                  {profile.bio.map((paragraph: string, index: number) => (
                    <p key={index} className="text-foreground/80 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Research Interests */}
            {profile.researchInterests && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.researchInterests')}
                </h2>
                <ul className="space-y-3">
                  {profile.researchInterests.map((interest: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-foreground/80">
                      <span className="w-2 h-2 bg-[#7B1E3A] rounded-full mt-2 flex-shrink-0"></span>
                      <span>{interest}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Teaching */}
            {profile.teaching && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.teaching')}
                </h2>
                <div className="bg-card rounded-xl p-6 border border-border">
                  <p className="text-muted-foreground mb-4">Teaching duties for 2023 include:</p>
                  <ul className="space-y-2">
                    {profile.teaching.map((course: string, index: number) => (
                      <li key={index} className="flex items-center gap-3">
                        <GraduationCap className="w-5 h-5 text-[#7B1E3A]" />
                        <span className="font-medium text-foreground">{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Programme Committees */}
            {profile.programmeCommittees && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.programmeCommittees')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.programmeCommittees.map((item: any, index: number) => (
                    <div key={index} className="bg-card rounded-lg p-5 border border-border">
                      <h3 className="font-bold text-foreground mb-2">{item.conference}</h3>
                      <p className="text-muted-foreground text-sm">{item.years.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Qualifications (for Willem) */}
            {profile.qualifications && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.qualifications')}
                </h2>
                <div className="space-y-6">
                  {profile.qualifications.map((qual: any, index: number) => (
                    <div key={index} className="bg-card rounded-xl p-6 border border-border">
                      <h3 className="font-bold text-lg text-foreground mb-2">{qual.degree}</h3>
                      <p className="text-muted-foreground mb-2">{qual.institution}</p>
                      <p className="text-sm text-foreground/70">
                        Supervisor(s): {qual.supervisors}
                      </p>
                      {qual.focus && (
                        <p className="text-sm text-foreground/70 mt-2">Focus: {qual.focus}</p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Achievements / Publications: Lynette full timeline or others' highlights */}
            {profile?.useLynetteFullAchievements && (
              <AchievementsTimeline
                yearGroups={lynetteAchievementsByYear as YearGroup[]}
                citationStyle
                title={t('achievements.publicationsAchievements')}
                defaultExpandedCount={5}
              />
            )}
            {profile?.hasPublicationsTimeline && profile?.publicationsTimeline && !profile?.useLynetteFullAchievements && (
              <AchievementsTimeline
                yearGroups={(profile.publicationsTimeline as YearGroup[])}
                citationStyle={false}
                title={t('achievements.publicationsAchievements')}
              />
            )}
            {profile?.publications && !profile?.hasPublicationsTimeline && (
              <AchievementsTimeline
                yearGroups={buildYearGroupsFromPublications(profile.publications as { title: string; authors?: string; venue?: string; year: number }[])}
                citationStyle={false}
                title={t('achievements.selectedPublications')}
              />
            )}
            {profile?.selectedPublications && (
              <AchievementsTimeline
                yearGroups={buildYearGroupsFromSelected(profile.selectedPublications as { title: string; authors?: string; venue?: string; year: number; citations?: number }[])}
                citationStyle={false}
                title={t('achievements.selectedPublications')}
              />
            )}
            {!profile?.useLynetteFullAchievements &&
              !profile?.hasPublicationsTimeline &&
              !profile?.publications?.length &&
              !profile?.selectedPublications?.length && (
                <AchievementsEmptyState t={t} />
              )}

            {/* Scholar Metrics (for Brink) */}
            {profile.scholarMetrics && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Spectral'] text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#7B1E3A]"></div>
                  {t('profile.scholarMetrics')}
                </h2>
                <div className="bg-card rounded-xl p-6 border border-border">
                  <p className="text-muted-foreground mb-4">{t('profile.metricsAsOf')}</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-[#7B1E3A]" />
                      <span className="font-medium text-foreground">Citations: {profile?.scholarMetrics?.citations}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-[#7B1E3A]" />
                      <span className="font-medium text-foreground">h-index: {profile?.scholarMetrics?.hIndex}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-[#7B1E3A]" />
                      <span className="font-medium text-foreground">i10-index: {profile?.scholarMetrics?.i10Index}</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}