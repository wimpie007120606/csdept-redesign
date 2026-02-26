import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Award,
  Users,
  BookOpen,
  Calendar,
  Newspaper,
  ArrowRight,
  Sparkles,
  Brain,
  Network,
  Bot,
  Lock,
  ChevronRight,
} from 'lucide-react';
import campusBackground from 'figma:asset/aa35fdae5d39aef96d1ba77e86c445c1cc5e4dc4.png';

export function HomePage() {
  const quickAccessTiles = [
    { icon: GraduationCap, label: 'Undergraduate', href: '/undergraduate', color: 'from-[#7B1E3A] to-[#A33456]' },
    { icon: Award, label: 'Postgraduate', href: '/postgraduate', color: 'from-[#C8A951] to-[#E0C87A]' },
    { icon: Sparkles, label: 'Research', href: '/research', color: 'from-[#0B1C2D] to-[#1A2F43]' },
    { icon: Users, label: 'People', href: '/people', color: 'from-[#7B1E3A] to-[#5C1628]' },
    { icon: Newspaper, label: 'News', href: '/news', color: 'from-[#C8A951] to-[#7B1E3A]' },
    { icon: Calendar, label: 'Events', href: '/events', color: 'from-[#0B1C2D] to-[#7B1E3A]' },
  ];

  const researchHighlights = [
    {
      icon: Brain,
      title: 'Artificial Intelligence',
      description: 'Advanced machine learning, deep learning, and neural network research.',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbWFjaGluZSUyMGxlYXJuaW5nfGVufDF8fHx8MTc3MjA4MjY4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Bot,
      title: 'Robotics & Automation',
      description: 'Cutting-edge robotics, autonomous systems, and human-robot interaction.',
      image: 'https://images.unsplash.com/photo-1758295746012-41650245a9bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGVuZ2luZWVyaW5nJTIwbGFib3JhdG9yeXxlbnwxfHx8fDE3NzIxMjEwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Network,
      title: 'Networks & Systems',
      description: 'Distributed systems, cloud computing, and network architecture research.',
      image: 'https://images.unsplash.com/photo-1768224656445-33d078c250b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwY3liZXJzZWN1cml0eSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyMDQ0MTkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Lock,
      title: 'Cybersecurity',
      description: 'Information security, cryptography, and privacy-preserving technologies.',
      image: 'https://images.unsplash.com/photo-1762279389083-abf71f22d338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzcyMDg3ODI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const news = [
    {
      date: 'Feb 20, 2026',
      category: 'Award',
      title: 'CS Professor Wins Prestigious AI Research Award',
      description: 'Prof. Anderson recognized for groundbreaking work in neural architecture search.',
    },
    {
      date: 'Feb 15, 2026',
      category: 'Publication',
      title: 'Breakthrough in Quantum Computing Published in Nature',
      description: 'Research team achieves new milestone in quantum error correction.',
    },
    {
      date: 'Feb 10, 2026',
      category: 'Collaboration',
      title: 'Partnership with Global Tech Leaders Announced',
      description: 'New industry collaboration to advance AI and machine learning research.',
    },
  ];

  const upcomingEvents = [
    { date: 'Mar 5', title: 'AI & Machine Learning Symposium', time: '09:00 - 17:00', location: 'Main Auditorium' },
    { date: 'Mar 12', title: 'PhD Research Seminar Series', time: '14:00 - 16:00', location: 'Seminar Room 1' },
    { date: 'Mar 20', title: 'Industry Career Fair', time: '10:00 - 18:00', location: 'Campus Center' },
  ];

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1C2D] via-[#7B1E3A] to-[#0B1C2D] opacity-95" />
        
        {/* Overlay Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-[#C8A951] text-sm font-medium mb-6">
              Excellence in Education & Research
            </div>
            <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Shaping the Future of
              <br />
              <span className="bg-gradient-to-r from-[#C8A951] to-[#E0C87A] bg-clip-text text-transparent">
                Computer Science
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
              Join a world-class department where innovation meets excellence. Discover cutting-edge
              research, transformative education, and global impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/undergraduate"
                className="group px-8 py-4 bg-white text-[#7B1E3A] rounded-xl font-semibold hover:bg-[#C8A951] hover:text-white transition-all duration-300 shadow-2xl hover:shadow-[#C8A951]/50 flex items-center gap-2"
              >
                Explore Programmes
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/research"
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white hover:text-[#7B1E3A] transition-all duration-300 flex items-center gap-2"
              >
                Meet Our Researchers
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-white/50 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Access Tiles */}
      <section className="py-20 bg-background relative -mt-16 z-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickAccessTiles.map((tile, index) => (
              <motion.div
                key={tile.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={tile.href}
                  className="group block p-6 bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${tile.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <tile.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-semibold text-sm text-foreground">{tile.label}</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Highlights */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-4">
              Research Excellence
            </div>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-foreground mb-4">
              World-Class Research
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Pioneering discoveries that shape the future of technology and society
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-full bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={highlight.image}
                      alt={highlight.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
                        <highlight.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{highlight.description}</p>
                    <Link
                      to="/research"
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Spotlight */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1758685848208-e108b6af94cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHNjaWVuY2UlMjBwcm9mZXNzb3IlMjB0ZWFjaGluZ3xlbnwxfHx8fDE3NzIxMjA5OTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Faculty"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2D]/80 via-transparent to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-4">
                Faculty Excellence
              </div>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-foreground mb-6">
                Learn from World Leaders
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our distinguished faculty includes leading researchers, award-winning educators, and
                industry pioneers who are shaping the future of computer science.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">International Recognition</div>
                    <div className="text-sm text-muted-foreground">
                      Faculty members with awards and honors from leading global institutions
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Cutting-Edge Research</div>
                    <div className="text-sm text-muted-foreground">
                      Active research in AI, cybersecurity, robotics, and more
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Industry Collaboration</div>
                    <div className="text-sm text-muted-foreground">
                      Partnerships with leading tech companies and research institutions
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to="/people"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
              >
                Meet Our Faculty
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-4">
                Latest Updates
              </div>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-foreground">
                News & Announcements
              </h2>
            </div>
            <Link
              to="/news"
              className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              View All News
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-full p-6 bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                  <Link
                    to="/news"
                    className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-4">
                Upcoming Events
              </div>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-foreground">
                Join Our Events
              </h2>
            </div>
            <Link
              to="/events"
              className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              View All Events
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="group flex flex-col sm:flex-row gap-6 p-6 bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-x-2">
                  <div className="flex-shrink-0 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-xl flex flex-col items-center justify-center text-white">
                      <div className="text-2xl font-bold">{event.date.split(' ')[1]}</div>
                      <div className="text-xs uppercase">{event.date.split(' ')[0]}</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-2">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button className="px-6 py-3 bg-primary/10 text-primary rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
                      Register
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#7B1E3A] via-[#A33456] to-[#0B1C2D] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
              Join our community of innovators, researchers, and future leaders in computer science
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/undergraduate"
                className="px-8 py-4 bg-white text-[#7B1E3A] rounded-xl font-semibold hover:bg-[#C8A951] hover:text-white transition-all duration-300 shadow-2xl"
              >
                Apply Now
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white hover:text-[#7B1E3A] transition-all duration-300"
              >
                Collaborate With Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}