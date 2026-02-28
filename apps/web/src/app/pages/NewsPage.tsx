import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { getNewsFeed, type NewsFeedItem } from '../api';

const campusBackground = '/realbackground3.jpeg';
const FALLBACK_IMAGE = '/realbackground2.jpg';

const CATEGORIES = ['all', 'AI', 'Cybersecurity', 'Software', 'Research', 'Local', 'International'] as const;
type CategoryKey = (typeof CATEGORIES)[number];

function formatDate(isoOrRss: string): string {
  if (!isoOrRss) return '';
  const d = new Date(isoOrRss);
  if (Number.isNaN(d.getTime())) return isoOrRss.slice(0, 16);
  return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
}

function loadFeed(
  category: CategoryKey,
  locale: string,
  setItems: (i: NewsFeedItem[]) => void,
  setError: (e: boolean) => void,
  setLoading: (l: boolean) => void
) {
  setLoading(true);
  setError(false);
  getNewsFeed(category, locale)
    .then(({ items: data, ok }) => {
      setItems(data);
      setError(!ok);
    })
    .catch(() => setError(true))
    .finally(() => setLoading(false));
}

export function NewsPage() {
  const { t, language } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [items, setItems] = useState<NewsFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadFeed(selectedCategory, language, setItems, setError, setLoading);
  }, [selectedCategory, language]);

  const retry = () => loadFeed(selectedCategory, language, setItems, setError, setLoading);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-32 text-white overflow-hidden min-h-[650px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${campusBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/90 via-[#0B1C2D]/85 to-[#0B1C2D]/80" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-6">
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-[#C8A951]/40 to-transparent max-w-[200px]" />
                  <span className="text-[#C8A951] text-xs uppercase tracking-[0.2em] font-medium font-['Spectral']">
                    {t('news.heroLabel')}
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C8A951]/40 to-transparent max-w-[200px]" />
                </div>
              </div>
              <h1 className="font-['Spectral'] text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight">
                {t('news.heroTitle')}
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
                {t('news.heroSub')}
              </p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Category tabs */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-10 backdrop-blur-sm bg-background/95">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-card text-foreground hover:bg-accent border border-border'
                }`}
              >
                {category === 'all' ? t('news.tabsAll') ?? 'All News' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-20 text-muted-foreground space-y-4">
              <p>{t('news.loadError') ?? 'Unable to load news. Please try again later.'}</p>
              <button onClick={retry} className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity">
                {t('news.retry') ?? 'Retry'}
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground space-y-4">
              <p>{t('news.noItems') ?? 'No articles in this category.'}</p>
              <button onClick={retry} className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity">
                {t('news.retry') ?? 'Retry'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 0.3) }}
                  viewport={{ once: true }}
                  className="group bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image || FALLBACK_IMAGE}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const el = e.currentTarget;
                        if (el.src !== FALLBACK_IMAGE) el.src = FALLBACK_IMAGE;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold rounded-full">
                        {item.categoryTags?.[0] ?? item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>{formatDate(item.publishedAt)}</span>
                      <span className="text-muted-foreground/80">·</span>
                      <span className="truncate">{item.source}</span>
                    </div>
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-3 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{item.summary || item.title}</p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all"
                    >
                      {t('news.readMore') ?? 'Read More'}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
