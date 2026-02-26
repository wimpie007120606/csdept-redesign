import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  BookOpen,
  Award,
  TrendingUp,
  Users,
  Calendar,
  FileText,
  CheckCircle,
  ArrowRight,
  Download,
  Globe,
  Code,
  Briefcase,
} from 'lucide-react';
const campusBackground = '/background.jpg';
const classroomImage = '/first-year-science-student-asking-question-chemistry.jpg';

export function UndergraduatePage() {
  const modules = [
    // First Year - General CS (92 compulsory + 32-48 elective = 124-140 total)
    { year: 1, code: 'CS 114', name: 'Computer Science 114', credits: 16, type: 'compulsory' },
    { year: 1, code: 'CS 144', name: 'Computer Science 144', credits: 16, type: 'compulsory' },
    { year: 1, code: 'MATH 114', name: 'Mathematics 114', credits: 16, type: 'compulsory' },
    { year: 1, code: 'MATH 144', name: 'Mathematics 144', credits: 16, type: 'compulsory' },
    { year: 1, code: 'STAT 114', name: 'Probability Theory and Statistics 114', credits: 16, type: 'compulsory' },
    { year: 1, code: 'SCI 179', name: 'Science in Context 179', credits: 12, type: 'compulsory' },
    
    // Second Year - General CS (32 compulsory + 96 elective = 128 total)
    { year: 2, code: 'CS 214', name: 'Computer Science 214', credits: 16, type: 'compulsory' },
    { year: 2, code: 'CS 244', name: 'Computer Science 244', credits: 16, type: 'compulsory' },
    
    // Third Year - General CS (64 compulsory + 64 elective = 128 total)
    { year: 3, code: 'CS 313', name: 'Computer Science 313', credits: 16, type: 'compulsory' },
    { year: 3, code: 'CS 314', name: 'Computer Science 314', credits: 16, type: 'compulsory' },
    { year: 3, code: 'CS 343', name: 'Computer Science 343', credits: 16, type: 'compulsory' },
    { year: 3, code: 'CS 344', name: 'Computer Science 344', credits: 16, type: 'compulsory' },
  ];

  const careerOutcomes = [
    { role: 'Software Engineer', companies: 'Google, Microsoft, Amazon', salary: 'R450k - R800k' },
    { role: 'Data Scientist', companies: 'Facebook, Apple, Netflix', salary: 'R500k - R900k' },
    { role: 'AI/ML Engineer', companies: 'OpenAI, DeepMind, Tesla', salary: 'R600k - R1.2M' },
    { role: 'Cybersecurity Analyst', companies: 'Financial Institutions, Govt', salary: 'R400k - R750k' },
    { role: 'Full Stack Developer', companies: 'Startups, Tech Companies', salary: 'R350k - R700k' },
    { role: 'DevOps Engineer', companies: 'Cloud Providers, SaaS', salary: 'R450k - R850k' },
  ];

  const requirements = [
    'Afrikaans or English (Home Language or First Additional Language) – minimum 50%',
    'Mathematics – minimum 70%',
    'Any other school subject from the designated subject list for university admission �� minimum 50%',
    'OR Physical Sciences – minimum 50% (if planning to take Physics or Chemistry)',
  ];

  const faqs = [
    {
      question: 'What is the duration of the undergraduate programme?',
      answer: 'The BSc in Computer Science is a 3-year full-time programme.',
    },
    {
      question: 'Are there internship opportunities?',
      answer: 'Yes, we have strong industry partnerships providing internship and practical experience opportunities.',
    },
    {
      question: 'Can I study part-time?',
      answer: 'Part-time options are available for working professionals. Contact admissions for details.',
    },
    {
      question: 'What specializations are offered?',
      answer: 'Students can specialize in AI/ML, Cybersecurity, Software Engineering, or Data Science in their final year.',
    },
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
                  <span className="text-[#C8A951] text-xs uppercase tracking-[0.2em] font-medium font-['Spectral'] letter-spacing-wide">
                    Undergraduate Programme
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C8A951]/40 to-transparent max-w-[200px]"></div>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="font-['Spectral'] text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.1] tracking-tight">
                BSc in Computer<br />Science
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed font-light">
                Build a strong foundation in computer science and prepare for a successful career in
                technology. Join a programme that combines theoretical excellence with practical skills.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Programme Overview */}
      <section id="programme" className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={classroomImage}
                  alt="Students in classroom"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-['Playfair_Display'] text-4xl font-bold text-foreground mb-6">
                Programme Overview
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our undergraduate programme offers a comprehensive education in computer science,
                blending theoretical knowledge with hands-on experience. Students develop critical
                thinking, problem-solving, and technical skills essential for success in the modern
                technology landscape.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-card rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-primary mb-1">3 Years</div>
                  <div className="text-sm text-muted-foreground">Full-Time</div>
                </div>
                <div className="p-4 bg-card rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-primary mb-1">360</div>
                  <div className="text-sm text-muted-foreground">Credits</div>
                </div>
                <div className="p-4 bg-card rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-primary mb-1">95%</div>
                  <div className="text-sm text-muted-foreground">Employment Rate</div>
                </div>
                <div className="p-4 bg-card rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-primary mb-1">Top 10</div>
                  <div className="text-sm text-muted-foreground">in Africa</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Programme Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Code,
                title: 'Practical Skills',
                description: 'Hands-on projects, coding challenges, and real-world applications',
              },
              {
                icon: Globe,
                title: 'Global Standards',
                description: 'Curriculum aligned with international best practices',
              },
              {
                icon: Briefcase,
                title: 'Industry Ready',
                description: 'Internships, industry projects, and career preparation',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Roadmap */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-['Spectral'] text-4xl font-bold text-foreground mb-4">
              Curriculum Roadmap
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A structured 3-year journey from fundamentals to advanced topics
            </p>
          </motion.div>

          <div className="space-y-8">
            {[1, 2, 3].map((year) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="bg-[#7B1E3A] text-white p-6">
                  <h3 className="font-['Spectral'] text-2xl font-bold">Year {year}</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {modules
                      .filter((m) => m.year === year)
                      .map((module) => (
                        <div
                          key={module.code}
                          className="flex items-start gap-3 p-4 bg-muted rounded-xl hover:bg-accent/10 transition-colors"
                        >
                          <CheckCircle className="w-5 h-5 text-[#7B1E3A] flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-foreground">
                              {module.code}: {module.name}
                            </div>
                            <div className="text-sm text-muted-foreground">{module.credits} Credits</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Outcomes */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-foreground mb-4">
              Career Outcomes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our graduates are highly sought after by leading companies worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerOutcomes.map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-[#7B1E3A] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-[#C8A951]/20 rounded-xl flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-[#C8A951]" />
                </div>
                <h3 className="font-['Spectral'] text-xl font-bold text-white mb-2">
                  {career.role}
                </h3>
                <p className="text-sm text-white/70 mb-3">{career.companies}</p>
                <div className="text-lg font-semibold text-[#C8A951]">{career.salary}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Requirements */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-['Playfair_Display'] text-4xl font-bold text-foreground mb-4">
                Admission Requirements
              </h2>
              <p className="text-lg text-muted-foreground">
                Ensure you meet the following requirements to apply
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl shadow-lg p-8"
            >
              <ul className="space-y-4">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{req}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Application deadline: <strong>30 September 2026</strong>
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
                >
                  Contact Admissions
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-['Playfair_Display'] text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-2xl shadow-lg p-6"
                >
                  <h3 className="font-['Playfair_Display'] text-lg font-bold text-foreground mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <Link
                to="/resources#faq"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                View All FAQs
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="apply" className="py-20 bg-gradient-to-br from-[#7B1E3A] to-[#0B1C2D] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6">
              Start Your Application Today
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Join the next generation of computer scientists and innovators
            </p>
            <a
              href="https://www.sun.ac.za/english/apply"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#7B1E3A] rounded-xl font-semibold hover:bg-[#C8A951] hover:text-white transition-all duration-300 shadow-2xl"
            >
              Apply Online
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}