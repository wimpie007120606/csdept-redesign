import { motion } from 'motion/react';
import { HelpCircle, Link2 } from 'lucide-react';
import { LocalizedLink } from '../components/LocalizedLink';
import { useTranslation } from '@/i18n/useTranslation';

const campusBackground = '/realbackground2.jpg';

const faqs = [
  { question: 'How do I register for courses?', answer: 'Course registration is done online through the student portal during the designated registration period at the start of each semester. Contact the department office if you need assistance.' },
  { question: 'What are the prerequisites for advanced courses?', answer: 'Each course has specific prerequisites listed in the course catalogue. Generally, you must pass foundational courses before enrolling in advanced topics. Check the course catalogue for details.' },
  { question: 'How can I get academic advising?', answer: 'Academic advisors are available during office hours. Book an appointment through the student portal or email your assigned advisor directly.' },
  { question: 'Are there tutoring services available?', answer: 'Yes, we offer peer tutoring for most undergraduate courses. Check the tutoring schedule or contact the department.' },
  { question: 'How do I apply for research positions?', answer: 'Research opportunities are posted on the department website. Contact faculty members directly if you\'re interested in their research area. Honours and postgraduate students have priority.' },
  { question: 'What internship opportunities are available?', answer: 'We have partnerships with leading tech companies. Internship positions are advertised through the career services office and department mailing list.' },
];

export function ResourcesPage() {
  const { t } = useTranslation();

  return (
    <div className="pt-20">
      <section className="relative py-24 text-white overflow-hidden min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${campusBackground})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/90 via-[#0B1C2D]/85 to-[#0B1C2D]/80" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
              <span className="text-[#C8A951] text-xs uppercase tracking-[0.2em] font-medium font-['Spectral']">{t('resources.heroLabel')}</span>
              <h1 className="font-['Spectral'] text-4xl md:text-5xl font-semibold leading-tight">{t('resources.heroTitle')}</h1>
              <p className="text-white/80">{t('resources.heroSub')}</p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <LocalizedLink
              to="/resources/links"
              className="group flex items-center gap-4 p-8 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-border"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <Link2 className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="font-['Playfair_Display'] text-xl font-bold text-foreground group-hover:text-primary transition-colors">{t('nav.links')}</h2>
                <p className="text-sm text-muted-foreground">{t('resources.linksDescription') ?? 'Useful links and external resources'}</p>
              </div>
            </LocalizedLink>
            <a
              href="#faq"
              className="group flex items-center gap-4 p-8 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-border"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <HelpCircle className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="font-['Playfair_Display'] text-xl font-bold text-foreground group-hover:text-primary transition-colors">{t('nav.faqs')}</h2>
                <p className="text-sm text-muted-foreground">{t('resources.faqsDescription') ?? 'Frequently asked questions'}</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-foreground mb-8 text-center">{t('resources.faqTitle') ?? 'Frequently Asked Questions'}</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl shadow p-6"
              >
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
