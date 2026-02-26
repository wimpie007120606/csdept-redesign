import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  GraduationCap,
  Award,
  BookOpen,
  Search,
  DollarSign,
  Calendar,
  ArrowRight,
  CheckCircle,
  Download,
  Users,
  Sparkles,
} from 'lucide-react';
const campusBackground = '/background.jpg';

export function PostgraduatePage() {
  const programmes = [
    {
      title: 'Honours (BSc Hons)',
      duration: '1 Year',
      description: 'Advanced coursework and research methodology training preparing students for Masters studies or industry research roles.',
      requirements: ['BSc in Computer Science', 'Minimum 65% average', 'Research proposal'],
    },
    {
      title: 'Masters (MSc)',
      duration: '2 Years',
      description: 'In-depth research in a specialized area, culminating in a dissertation under expert supervision.',
      requirements: ['BSc Hons or equivalent', 'Minimum 70% average', 'Approved research proposal'],
    },
    {
      title: 'Doctoral (PhD)',
      duration: '3-4 Years',
      description: 'Original research contributing new knowledge to the field, producing world-class scholars.',
      requirements: ['MSc or equivalent', 'Minimum 75% average', 'Research excellence', 'Supervisor approval'],
    },
  ];

  const researchStreams = [
    'Artificial Intelligence & Machine Learning',
    'Computer Vision & Image Processing',
    'Natural Language Processing',
    'Cybersecurity & Privacy',
    'Distributed Systems & Cloud Computing',
    'Software Engineering & Verification',
    'Human-Computer Interaction',
    'Data Science & Analytics',
    'Robotics & Autonomous Systems',
    'Bioinformatics & Computational Biology',
  ];

  const supervisors = [
    { name: 'Prof. Sarah Anderson', specialization: 'AI & Machine Learning', students: 8, publications: 120 },
    { name: 'Prof. David Chen', specialization: 'Cybersecurity', students: 6, publications: 95 },
    { name: 'Prof. Maria Santos', specialization: 'Computer Vision', students: 7, publications: 110 },
    { name: 'Dr. James Wilson', specialization: 'Distributed Systems', students: 5, publications: 75 },
    { name: 'Dr. Emily Brown', specialization: 'NLP', students: 6, publications: 88 },
    { name: 'Prof. Michael Lee', specialization: 'Robotics', students: 7, publications: 102 },
  ];

  const funding = [
    {
      title: 'NRF Scholarships',
      amount: 'R120,000 - R150,000 p.a.',
      description: 'National Research Foundation funding for exceptional students',
    },
    {
      title: 'University Bursaries',
      amount: 'R80,000 - R100,000 p.a.',
      description: 'Merit-based bursaries for high-achieving postgraduate students',
    },
    {
      title: 'Industry Partnerships',
      amount: 'Varies',
      description: 'Funding from industry partners for research projects',
    },
    {
      title: 'Teaching Assistantships',
      amount: 'R60,000 - R80,000 p.a.',
      description: 'Part-time teaching assistant positions',
    },
  ];

  const deadlines = [
    { programme: 'Honours', closing: '30 September 2026', start: 'February 2027' },
    { programme: 'Masters', closing: 'Rolling admissions', start: 'February/July' },
    { programme: 'PhD', closing: 'Rolling admissions', start: 'Any time' },
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
                  <span className="text-[#C8A951] text-xs uppercase tracking-[0.2em] font-medium font-['Spectral']">
                    Postgraduate Studies
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C8A951]/40 to-transparent max-w-[200px]"></div>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="font-['Spectral'] text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.1] tracking-tight">
                Advanced Research<br />& Innovation
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed font-light">
                Pursue cutting-edge research under world-class supervision. Join a vibrant community
                of researchers pushing the boundaries of computer science.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Programmes */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-foreground mb-4">
              Postgraduate Programmes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the programme that aligns with your research goals and career aspirations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {programmes.map((programme, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#7B1E3A] text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden p-8"
              >
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-['Spectral'] text-2xl font-bold">{programme.title}</h3>
                    <Award className="w-8 h-8 text-[#C8A951]" />
                  </div>
                  <div className="text-sm text-white/70">{programme.duration}</div>
                </div>
                <p className="text-white/90 mb-6 leading-relaxed">{programme.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="font-semibold text-white text-sm mb-3">Requirements:</div>
                  {programme.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#C8A951] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{req}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-[#C8A951] font-semibold hover:gap-3 transition-all hover:text-white"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Streams */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-foreground mb-4">
              Research Streams
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our diverse research areas and find your passion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {researchStreams.map((stream, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium text-sm">{stream}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supervisors */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-foreground mb-4">
              Supervisor Directory
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Work with leading experts in your field of interest
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supervisors.map((supervisor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-1">
                      {supervisor.name}
                    </h3>
                    <p className="text-sm text-primary">{supervisor.specialization}</p>
                  </div>
                  <Users className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                  <div>
                    <div className="text-2xl font-bold text-foreground">{supervisor.students}</div>
                    <div className="text-xs text-muted-foreground">Current Students</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{supervisor.publications}</div>
                    <div className="text-xs text-muted-foreground">Publications</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Link
              to="/people"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              View All Faculty
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Funding Opportunities */}
      <section id="funding" className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-foreground mb-4">
              Funding Opportunities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Multiple funding sources available for qualified candidates
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {funding.map((fund, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-1">
                      {fund.title}
                    </h3>
                    <div className="text-lg font-semibold text-secondary">{fund.amount}</div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">{fund.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Deadlines */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-foreground mb-4">
              Application Deadlines
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Important dates for the upcoming academic year
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {deadlines.map((deadline, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-between p-6 bg-card rounded-2xl shadow-lg"
              >
                <div>
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-1">
                    {deadline.programme}
                  </h3>
                  <p className="text-sm text-muted-foreground">Closes: {deadline.closing}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Calendar className="w-5 h-5" />
                    {deadline.start}
                  </div>
                  <div className="text-xs text-muted-foreground">Start Date</div>
                </div>
              </motion.div>
            ))}
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
              Begin Your Research Journey
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Join our community of world-class researchers and innovators
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://www.sun.ac.za/english/postgraduate-programmes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#7B1E3A] rounded-xl font-semibold hover:bg-[#C8A951] hover:text-white transition-all duration-300 shadow-2xl"
              >
                Apply Online
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white hover:text-[#7B1E3A] transition-all duration-300"
              >
                Contact Admissions
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}