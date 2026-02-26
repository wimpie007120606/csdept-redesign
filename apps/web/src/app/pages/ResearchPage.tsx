import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Brain, Bot, Network, Lock, Database, Globe, TrendingUp, ArrowRight, Users, FileText } from 'lucide-react';
const campusBackground = '/background.jpg';

export function ResearchPage() {
  const researchGroups = [
    {
      icon: Brain,
      name: 'AI & Machine Learning Lab',
      lead: 'Prof. Sarah Anderson',
      members: 15,
      description: 'Advancing the frontiers of artificial intelligence through deep learning, reinforcement learning, and neural architecture search.',
      focus: ['Deep Learning', 'Computer Vision', 'NLP', 'Reinforcement Learning'],
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbWFjaGluZSUyMGxlYXJuaW5nfGVufDF8fHx8MTc3MjA4MjY4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Lock,
      name: 'Cybersecurity Research Group',
      lead: 'Prof. David Chen',
      members: 12,
      description: 'Protecting digital infrastructure through advanced cryptography, network security, and privacy technologies.',
      focus: ['Cryptography', 'Network Security', 'Privacy', 'Blockchain'],
      image: 'https://images.unsplash.com/photo-1768224656445-33d078c250b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwY3liZXJzZWN1cml0eSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyMDQ0MTkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Bot,
      name: 'Robotics & Autonomous Systems',
      lead: 'Prof. Michael Lee',
      members: 10,
      description: 'Developing intelligent robots and autonomous systems for real-world applications.',
      focus: ['Robot Perception', 'Path Planning', 'Human-Robot Interaction', 'Manipulation'],
      image: 'https://images.unsplash.com/photo-1758295746012-41650245a9bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGVuZ2luZWVyaW5nJTIwbGFib3JhdG9yeXxlbnwxfHx8fDE3NzIxMjEwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Network,
      name: 'Distributed Systems Lab',
      lead: 'Dr. James Wilson',
      members: 9,
      description: 'Researching scalable, reliable distributed systems and cloud computing architectures.',
      focus: ['Cloud Computing', 'Edge Computing', 'Microservices', 'Consensus Algorithms'],
      image: 'https://images.unsplash.com/photo-1767319257862-e5c5aeb1c628?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY29tcHV0ZXIlMjBzY2llbmNlJTIwcmVzZWFyY2glMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MjEyMDk5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Database,
      name: 'Data Science & Analytics',
      lead: 'Dr. Robert Taylor',
      members: 11,
      description: 'Extracting insights from big data using advanced analytics and visualization techniques.',
      focus: ['Big Data', 'Machine Learning', 'Data Visualization', 'Predictive Analytics'],
      image: 'https://images.unsplash.com/photo-1762279389083-abf71f22d338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzcyMDg3ODI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const impactMetrics = [
    { value: '850+', label: 'Publications (2024)', icon: FileText },
    { value: 'R45M', label: 'Research Funding', icon: TrendingUp },
    { value: '35+', label: 'Industry Partners', icon: Globe },
    { value: '120+', label: 'Active Researchers', icon: Users },
  ];

  const recentPublications = [
    {
      title: 'Neural Architecture Search with Evolutionary Algorithms',
      authors: 'Anderson, S., et al.',
      venue: 'Nature Machine Intelligence',
      year: 2026,
      citations: 42,
    },
    {
      title: 'Privacy-Preserving Federated Learning in Healthcare',
      authors: 'Chen, D., Wilson, J., et al.',
      venue: 'IEEE Transactions on Information Forensics and Security',
      year: 2026,
      citations: 28,
    },
    {
      title: 'Autonomous Navigation in Dynamic Environments',
      authors: 'Lee, M., Santos, M., et al.',
      venue: 'Robotics: Science and Systems',
      year: 2025,
      citations: 65,
    },
    {
      title: 'Scalable Distributed Consensus for Blockchain Systems',
      authors: 'Wilson, J., Chen, D., et al.',
      venue: 'ACM Symposium on Cloud Computing',
      year: 2025,
      citations: 51,
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
                    Research Excellence
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C8A951]/40 to-transparent max-w-[200px]"></div>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="font-['Spectral'] text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight">
                Advancing the Frontiers<br />of Computer Science
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
                World-class research tackling the most challenging problems in technology and society
              </p>
            </motion.div>
          </div>
        </div>

        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 bg-background border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-[#7B1E3A] rounded-2xl shadow-lg"
              >
                <metric.icon className="w-10 h-10 text-[#C8A951] mx-auto mb-3" />
                <div className="text-4xl font-bold font-['Spectral'] text-white mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-white/70">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Groups */}
      <section id="groups" className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-foreground mb-4">
              Research Groups
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Collaborative teams pushing boundaries in specialized areas
            </p>
          </motion.div>

          <div className="space-y-8">
            {researchGroups.map((group, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center bg-card rounded-2xl shadow-xl overflow-hidden`}
              >
                <div className="lg:w-1/2 h-80 lg:h-96">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                      <group.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-['Playfair_Display'] text-2xl font-bold text-foreground">
                        {group.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">Led by {group.lead}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">{group.description}</p>
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-foreground mb-2">Research Focus:</div>
                    <div className="flex flex-wrap gap-2">
                      {group.focus.map((item, i) => (
                        <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {group.members} Members
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-foreground mb-4">
              Recent Publications
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge research published in top-tier venues
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {recentPublications.map((pub, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-2">
                  {pub.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{pub.authors}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="text-primary font-medium">{pub.venue}</span>
                  <span className="text-muted-foreground">{pub.year}</span>
                  <span className="text-muted-foreground">{pub.citations} citations</span>
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
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all">
              View All Publications
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#7B1E3A] to-[#0B1C2D] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6">
              Join Our Research Community
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Collaborate with leading researchers and contribute to groundbreaking discoveries
            </p>
            <Link
              to="/postgraduate"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#7B1E3A] rounded-xl font-semibold hover:bg-[#C8A951] hover:text-white transition-all duration-300 shadow-2xl"
            >
              Explore Postgraduate Programmes
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}