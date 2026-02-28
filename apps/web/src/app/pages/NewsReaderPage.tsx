import { useSearchParams } from 'react-router';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

/**
 * Reader view: shows title + excerpt + "Read on Source" link.
 * No full-article scraping; only metadata passed via query (url, title, summary).
 */
export function NewsReaderPage() {
  const [params] = useSearchParams();
  const { t } = useTranslation();
  const url = params.get('url') ?? '';
  const title = params.get('title') ?? '';
  const summary = params.get('summary') ?? '';

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-2xl py-12">
        <article className="bg-card rounded-2xl border border-border shadow-lg p-8">
          {title ? (
            <h1 className="font-['Spectral'] text-2xl md:text-3xl font-bold text-foreground mb-4">{title}</h1>
          ) : null}
          {summary ? <p className="text-muted-foreground leading-relaxed mb-6">{summary}</p> : null}
          {url ? (
            <a
              href={decodeURIComponent(url)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              {t('news.readOnSource') ?? 'Read on Source'}
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <p className="text-muted-foreground">{t('news.readerNoUrl') ?? 'No article URL provided.'}</p>
          )}
        </article>
      </div>
    </div>
  );
}
