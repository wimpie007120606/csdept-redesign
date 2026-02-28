import { useState, useEffect, useCallback } from 'react';
import { getNewsFeed, type NewsFeedItem } from '../api';

const TOP_N = 3;

/**
 * Fetches the same news feed as the News page and returns the top N items
 * (newest by publishedAt). Single source of truth: getNewsFeed from api.
 */
export function useNewsForHome(locale: string) {
  const [items, setItems] = useState<NewsFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTopNews = useCallback(() => {
    setLoading(true);
    setError(false);
    getNewsFeed('all', locale)
      .then((res) => {
        if (!res.ok) {
          setError(true);
          setItems([]);
          return;
        }
        const sorted = [...(res.items ?? [])].sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
        setItems(sorted.slice(0, TOP_N));
      })
      .catch(() => {
        setError(true);
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, [locale]);

  useEffect(() => {
    fetchTopNews();
  }, [fetchTopNews]);

  return { items, loading, error, refetch: fetchTopNews };
}

/** Format news date for display (same logic as News page). */
export function formatNewsDate(isoOrRss: string): string {
  if (!isoOrRss) return '';
  const d = new Date(isoOrRss);
  if (Number.isNaN(d.getTime())) return isoOrRss.slice(0, 16);
  return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
}
