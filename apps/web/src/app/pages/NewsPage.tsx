import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Tag, Search, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

const campusBackground = '/realbackground3.jpeg';

export function NewsPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Award', 'Publication', 'Event', 'Collaboration', 'Achievement'];

  const newsItems = [
    {
      date: 'Feb 26, 2026',
      category: 'Award',
      title: 'CS Professor Wins Prestigious AI Research Award',
      excerpt: 'Prof. Anderson recognized for groundbreaking work in neural architecture search and deep learning applications.',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbWFjaGluZSUyMGxlYXJuaW5nfGVufDF8fHx8MTc3MjA4MjY4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      date: 'Feb 20, 2026',
      category: 'Publication',
      title: 'Breakthrough in Quantum Computing Published in Nature',
      excerpt: 'Research team achieves new milestone in quantum error correction, paving the way for practical quantum computers.',
      image: 'https://images.unsplash.com/photo-1767319257862-e5c5aeb1c628?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY29tcHV0ZXIlMjBzY2llbmNlJTIwcmVzZWFyY2glMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MjEyMDk5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      date: 'Feb 15, 2026',
      category: 'Collaboration',
      title: 'Partnership with Global Tech Leaders Announced',
      excerpt: 'New industry collaboration to advance AI and machine learning research with R25M investment.',
      image: 'https://images.unsplash.com/photo-1758270705172-07b53627dfcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcmVzZWFyY2glMjB0ZWFtJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzIxMjEyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      date: 'Feb 10, 2026',
      category: 'Achievement',
      title: 'Student Team Wins International Hackathon',
      excerpt: 'CS undergraduate team takes first place in global AI competition with innovative solution.',
      image: 'https://images.unsplash.com/photo-1723987135977-ae935608939e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMGNvbXB1dGVyJTIwc2NpZW5jZXxlbnwxfHx8fDE3NzIxMjEwOTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      date: 'Feb 5, 2026',
      category: 'Event',
      title: 'Annual CS Symposium Attracts 500+ Attendees',
      excerpt: 'Leading researchers from around the world gather to discuss latest advances in computer science.',
      image: 'https://images.unsplash.com/photo-1576669801838-1b1c52121e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0ZSUyMHN0dWRlbnRzJTIwcmVzZWFyY2glMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc3MjEyMTA5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      date: 'Jan 28, 2026',
      category: 'Award',
      title: 'PhD Student Receives Best Paper Award',
      excerpt: 'Doctoral candidate honored at international robotics conference for innovative research.',
      image: 'https://images.unsplash.com/photo-1758295746012-41650245a9bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGVuZ2luZWVyaW5nJTIwbGFib3JhdG9yeXxlbnwxfHx8fDE3NzIxMjEwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const filteredNews = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

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
                    {t('news.heroLabel')}
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C8A951]/40 to-transparent max-w-[200px]"></div>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="font-['Spectral'] text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight">
                {t('news.heroTitle')}
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
                {t('news.heroSub')}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-10 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-card text-foreground hover:bg-accent'
                }`}
              >
                {category === 'all' ? 'All News' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                  </div>
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{item.excerpt}</p>
                  <button className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}