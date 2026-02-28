/**
 * Aggregates RSS/Atom feeds into a single normalized list. In-memory cache (10–30 min).
 * Only headline, excerpt, thumbnail, and link are used; no full-article scraping.
 */

import { XMLParser } from 'fast-xml-parser';
import { newsSources, type NewsCategory, type Region } from './newsSources.js';

export interface NewsFeedItem {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  summary: string;
  image: string | null;
  category: NewsCategory;
  region: Region;
}

const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

let cache: { items: NewsFeedItem[]; at: number } | null = null;

function stripHtml(html: string): string {
  if (!html || typeof html !== 'string') return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 300);
}

function extractImageFromDescription(desc: string): string | null {
  if (!desc) return null;
  const img = /<img[^>]+src=["']([^"']+)["']/i.exec(desc);
  if (img) return img[1];
  const enclosure = /<enclosure[^>]+url=["']([^"']+)["']/i.exec(desc);
  if (enclosure) return enclosure[1];
  return null;
}

function parseRssOrAtom(xml: string, sourceName: string, category: NewsCategory, region: Region): NewsFeedItem[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    trimValues: true,
  });
  const out: NewsFeedItem[] = [];
  try {
    const doc = parser.parse(xml);
    if (!doc) return out;

    // RSS 2.0: rss.channel.item (or items)
    const channel = doc.rss?.channel;
    if (channel) {
      const items = Array.isArray(channel.item) ? channel.item : channel.item ? [channel.item] : [];
      for (const it of items) {
        const title = (typeof it.title === 'string' ? it.title : it.title?.['#text'] ?? it.title?.__text ?? '') as string;
        let link: string = typeof it.link === 'string' ? it.link : (it.link?.['@_href'] ?? it['atom:link']?.['@_href'] ?? '');
        if (Array.isArray(it.link)) link = it.link[0]?.['@_href'] ?? it.link[0] ?? link;
        const pubDate = it.pubDate ?? it.date ?? '';
        const desc = typeof it.description === 'string' ? it.description : '';
        const enclosure = it.enclosure;
        let image: string | null = null;
        if (enclosure && (enclosure['@_type']?.startsWith('image/') || enclosure['@_url'])) {
          image = enclosure['@_url'] ?? null;
        }
        if (!image) image = extractImageFromDescription(desc);
        if (!link || !title) continue;
        const id = `rss-${btoa(link).replace(/[/+=]/g, '').slice(0, 48)}`;
        out.push({
          id,
          title,
          url: link,
          source: sourceName,
          publishedAt: pubDate,
          summary: stripHtml(desc),
          image,
          category,
          region,
        });
      }
      return out;
    }

    // Atom: feed.entry
    const feed = doc.feed;
    if (feed) {
      const entries = Array.isArray(feed.entry) ? feed.entry : feed.entry ? [feed.entry] : [];
      for (const e of entries) {
        const title = typeof e.title === 'string' ? e.title : e.title?.__text ?? e.title?.['#text'] ?? '';
        const link = (Array.isArray(e.link) ? e.link.find((l: { '@_rel'?: string }) => l['@_rel'] !== 'self') ?? e.link[0] : e.link)?.['@_href'] ?? '';
        const updated = e.updated ?? e.published ?? e.pubDate ?? '';
        const summary = typeof e.summary === 'string' ? e.summary : e.summary?.__text ?? e.summary?.['#text'] ?? '';
        const content = typeof e.content === 'string' ? e.content : e.content?.__text ?? e.content?.['#text'] ?? '';
        const desc = summary || content;
        let image: string | null = extractImageFromDescription(desc);
        const media = e['media:content'] ?? e['media:thumbnail'];
        if (media && media['@_url']) image = media['@_url'];
        const url = typeof link === 'string' ? link : '';
        if (!url || !title) continue;
        const id = `atom-${btoa(url).replace(/[/+=]/g, '').slice(0, 48)}`;
        out.push({
          id,
          title,
          url,
          source: sourceName,
          publishedAt: updated,
          summary: stripHtml(desc),
          image,
          category,
          region,
        });
      }
    }
  } catch (_) {
    // ignore parse errors for this feed
  }
  return out;
}

async function fetchOneFeed(
  config: (typeof newsSources)[number]
): Promise<NewsFeedItem[]> {
  try {
    const res = await fetch(config.url, {
      headers: { 'User-Agent': 'Stellenbosch-CS-News/1.0 (CS Department News Aggregator)' },
      signal: AbortSignal.timeout(12_000),
    });
    if (!res.ok) return [];
    const text = await res.text();
    return parseRssOrAtom(text, config.name, config.category, config.region);
  } catch {
    return [];
  }
}

function dedupe(items: NewsFeedItem[]): NewsFeedItem[] {
  const byUrl = new Map<string, NewsFeedItem>();
  for (const it of items) {
    const u = it.url.toLowerCase().trim();
    if (!byUrl.has(u)) byUrl.set(u, it);
  }
  return Array.from(byUrl.values());
}

function sortNewestFirst(items: NewsFeedItem[]): void {
  items.sort((a, b) => {
    const da = new Date(a.publishedAt).getTime();
    const db = new Date(b.publishedAt).getTime();
    return db - da;
  });
}

function filterByCategory(items: NewsFeedItem[], category: NewsCategory): NewsFeedItem[] {
  if (category === 'all') return items;
  if (category === 'Local') return items.filter((i) => i.region === 'local');
  if (category === 'International') return items.filter((i) => i.region === 'international');
  return items.filter((i) => i.category === category);
}

export async function getAggregatedFeed(
  category: NewsCategory = 'all',
  _locale: string = 'en'
): Promise<NewsFeedItem[]> {
  const now = Date.now();
  if (cache && now - cache.at < CACHE_TTL_MS) {
    return filterByCategory(cache.items, category);
  }

  const results = await Promise.allSettled(newsSources.map((s) => fetchOneFeed(s)));
  const all: NewsFeedItem[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') all.push(...r.value);
  }
  const deduped = dedupe(all);
  sortNewestFirst(deduped);
  cache = { items: deduped, at: now };

  return filterByCategory(deduped, category);
}
