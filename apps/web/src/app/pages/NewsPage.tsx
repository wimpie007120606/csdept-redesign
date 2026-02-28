import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { getNewsFeed, getNewsHealth, type NewsFeedItem } from '../api';

// Verification: /en/news must show articles; All 30–40 items; categories max 10; cards open item.url in new tab

const campusBackground = '/realbackground3.jpeg';
const FALLBACK_IMAGE = '/realbackground2.jpg';

const CATEGORIES = ['all', 'AI', 'Cybersecurity', 'Software', 'Research', 'Local', 'International'] as const;
type CategoryKey = (typeof CATEGORIES)[number];

type ErrorDetail = { status: number; body: string; requestUrl: string };

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
  setErrorDetail: (d: ErrorDetail | null) => void,
  setIsFallback: (b: boolean) => void,
  setLoading: (l: boolean) => void
) {
  setLoading(true);
  setError(false);
  setErrorDetail(null);
  getNewsFeed(category, locale)
    .then(({ items: data, ok, isFallback, errorDetail }) => {
      setItems(data);
      setError(!ok);
      setIsFallback(isFallback === true);
      setErrorDetail(errorDetail ?? null);
    })
    .catch(() => {
      setError(true);
      setErrorDetail(null);
    })
    .finally(() => setLoading(false));
}

export function NewsPage() {
  const { t, language } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [items, setItems] = useState<NewsFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorDetail, setErrorDetail] = useState<ErrorDetail | null>(null);
  const [isFallback, setIsFallback] = useState(false);
  const [healthOk, setHealthOk] = useState<boolean | null>(null);

  useEffect(() => {
    getNewsHealth().then((r) => setHealthOk(r.ok));
  }, []);

  useEffect(() => {
    loadFeed(selectedCategory, language, setItems, setError, setErrorDetail, setIsFallback, setLoading);
  }, [selectedCategory, language]);

  const retry = () => loadFeed(selectedCategory, language, setItems, setError, setErrorDetail, setIsFallback, setLoading);

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
          {healthOk === false && (
            <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-sm">
              Debug: API unreachable. Check that <code className="bg-black/10 px-1 rounded">/api/health/news</code> is deployed (e.g. Cloudflare Pages Functions).
            </div>
          )}
          {isFallback && items.length > 0 && (
            <div className="mb-6 p-4 rounded-xl bg-muted border border-border text-muted-foreground text-sm">
              {t('news.fallbackNote') ?? 'Showing fallback feed (live sources temporarily unavailable).'}
            </div>
          )}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-56 bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-1/3" />
                    <div className="h-5 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20 text-muted-foreground space-y-4 max-w-2xl mx-auto">
              <p className="font-semibold">{t('news.apiError') ?? 'News API error'}</p>
              {errorDetail ? (
                <pre className="text-left text-xs bg-muted p-4 rounded-xl overflow-auto max-h-48">
                  {`Status: ${errorDetail.status}\nURL: ${errorDetail.requestUrl}\nBody: ${errorDetail.body}`}
                </pre>
              ) : (
                <p className="text-sm">Check browser console for request URL. Ensure /api/news is deployed (e.g. Cloudflare Pages Functions).</p>
              )}
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
