import { motion } from 'motion/react';
import { FileText, HelpCircle, Download, ExternalLink, BookOpen, Users, Briefcase } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

const campusBackground = '/realbackground2.jpg';

export function ResourcesPage() {
  const { t } = useTranslation();
  const faqs = [
    {
      question: 'How do I register for courses?',
      answer: 'Course registration is done online through the student portal during the designated registration period at the start of each semester. Contact the department office if you need assistance.',
    },
    {
      question: 'What are the prerequisites for advanced courses?',
      answer: 'Each course has specific prerequisites listed in the course catalogue. Generally, you must pass foundational courses before enrolling in advanced topics. Check the course catalogue for details.',
    },
    {
      question: 'How can I get academic advising?',
      answer: 'Academic advisors are available during office hours. Book an appointment through the student portal or email your assigned advisor directly.',
    },
    {
      question: 'Are there tutoring services available?',
      answer: 'Yes, we offer peer tutoring for most undergraduate courses. Check the tutoring schedule on the student resources portal or contact the department.',
    },
    {
      question: 'How do I apply for research positions?',
      answer: 'Research opportunities are posted on the department website. Contact faculty members directly if you\'re interested in their research area. Honours and postgraduate students have priority.',
    },
    {
      question: 'What internship opportunities are available?',
      answer: 'We have partnerships with leading tech companies. Internship positions are advertised through the career services office and department mailing list.',
    },
  ];

  const forms = [
    { name: 'Course Registration Form', type: 'PDF', size: '245 KB' },
    { name: 'Extension Request Form', type: 'PDF', size: '180 KB' },
    { name: 'Research Ethics Approval', type: 'PDF', size: '320 KB' },
    { name: 'Lab Access Request', type: 'PDF', size: '155 KB' },
    { name: 'Academic Transcript Request', type: 'PDF', size: '210 KB' },
  ];

  const links = [
    { name: 'Student Portal', url: '#', icon: ExternalLink },
    { name: 'Learning Management System', url: '#', icon: BookOpen },
    { name: 'Library Resources', url: '#', icon: BookOpen },
    { name: 'Career Services', url: '#', icon: Briefcase },
    { name: 'IT Support', url: '#', icon: Users },
    { name: 'Academic Calendar', url: '#', icon: ExternalLink },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-32 text-white overflow-hidden min-h-[650px] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${campusBackground})` }}
        />
        {/* Refined Dark Overlay - more neutral, less pink/red */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/90 via-[#0B1C2D]/85 to-[#0B1C2D]/80" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Editorial Label with Divider */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-6">
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-[#C8A951]/40 to-transparent max-w-[200px]"></div>
                  <span className="text-[#C8A951] text-xs uppercase tracking-[0.2em] font-medium font-['Spectral']">
                    Student Resources
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C8A951]/40 to-transparent max-w-[200px]"></div>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="font-['Spectral'] text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight">
                {t('resources.heroTitle')}
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
                {t('resources.heroSub')}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-foreground mb-4">
              Useful Links
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {links.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex items-center gap-4 p-6 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {link.name}
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Forms */}
      <section id="forms" className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-foreground mb-4">
              Forms & Documents
            </h2>
            <p className="text-lg text-muted-foreground">
              Download commonly used forms and documents
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {forms.map((form, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group flex items-center justify-between p-6 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{form.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {form.type} • {form.size}
                    </div>
                  </div>
                </div>
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all inline-flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faq" className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-['Playfair_Display'] text-lg font-bold text-foreground mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20 bg-gradient-to-br from-[#7B1E3A] to-[#0B1C2D] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6">
              Need More Help?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Our staff is here to support you throughout your academic journey
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#7B1E3A] rounded-xl font-semibold hover:bg-[#C8A951] hover:text-white transition-all duration-300 shadow-2xl"
            >
              Contact Support
              <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}