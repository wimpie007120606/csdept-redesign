/**
 * Server-side RSS/Atom aggregation for CS news. In-memory cache 12h.
 * Only headline, excerpt, thumbnail, and link are used; no full-article scraping.
 */

import { XMLParser } from 'fast-xml-parser';
import { newsSources, type NewsCategory, type Region } from './newsSources.js';

const USER_AGENT = 'csdept-site-news-bot/1.0';
const ACCEPT = 'application/rss+xml, application/xml, text/xml, application/json';
const FETCH_TIMEOUT_MS = 8_000;
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours
const LIMIT_ALL = 40;
const LIMIT_PER_CATEGORY = 10;

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
  categoryTags: string[];
}

let cache: { items: NewsFeedItem[]; at: number } | null = null;

function stripHtml(html: string): string {
  if (!html || typeof html !== 'string') return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 400);
}

function extractImageFromDescription(desc: string): string | null {
  if (!desc) return null;
  const img = /<img[^>]+src=["']([^"']+)["']/i.exec(desc);
  if (img) return img[1];
  const enclosure = /<enclosure[^>]+url=["']([^"']+)["']/i.exec(desc);
  if (enclosure) return enclosure[1];
  return null;
}

function normalizeTitleForDedup(t: string): string {
  return t
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .trim()
    .slice(0, 80);
}

function assignCategoryTags(title: string, summary: string, source: string): string[] {
  const text = `${title} ${summary} ${source}`.toLowerCase();
  const tags: string[] = [];
  if (/\b(ai|machine learning|deep learning|llm|neural|generative|openai|deepmind)\b/.test(text)) tags.push('AI');
  if (/\b(security|hack|breach|malware|phishing|ransomware|cyber)\b/.test(text)) tags.push('Cybersecurity');
  if (/\b(programming|software|dev|javascript|python|framework|release|aws|google)\b/.test(text)) tags.push('Software');
  if (/\b(paper|study|journal|arxiv|conference|acm|ieee|research)\b/.test(text)) tags.push('Research');
  if (tags.length === 0) tags.push('Research');
  return tags;
}

function parseRssOrAtom(
  xml: string,
  sourceName: string,
  sourceCategory: NewsCategory,
  region: Region
): NewsFeedItem[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    trimValues: true,
  });
  const out: NewsFeedItem[] = [];
  try {
    const doc = parser.parse(xml);
    if (!doc) return out;

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
        const summary = stripHtml(desc);
        const categoryTags = assignCategoryTags(title, summary, sourceName);
        out.push({
          id: `rss-${btoa(link).replace(/[/+=]/g, '').slice(0, 48)}`,
          title,
          url: link,
          source: sourceName,
          publishedAt: pubDate,
          summary,
          image,
          category: sourceCategory,
          region,
          categoryTags,
        });
      }
      return out;
    }

    const feed = doc.feed;
    if (feed) {
      const entries = Array.isArray(feed.entry) ? feed.entry : feed.entry ? [feed.entry] : [];
      for (const e of entries) {
        const title = typeof e.title === 'string' ? e.title : (e.title?.__text ?? e.title?.['#text'] ?? '') as string;
        const linkArr = Array.isArray(e.link) ? e.link : e.link ? [e.link] : [];
        const linkObj = linkArr.find((l: { '@_rel'?: string }) => l['@_rel'] !== 'self') ?? linkArr[0];
        const url = (linkObj?.['@_href'] ?? '') as string;
        const updated = e.updated ?? e.published ?? e.pubDate ?? '';
        const summary = typeof e.summary === 'string' ? e.summary : (e.summary?.__text ?? e.summary?.['#text'] ?? '') as string;
        const content = typeof e.content === 'string' ? e.content : (e.content?.__text ?? e.content?.['#text'] ?? '') as string;
        const desc = summary || content;
        let image: string | null = extractImageFromDescription(desc);
        const media = e['media:content'] ?? e['media:thumbnail'];
        if (media?.['@_url']) image = media['@_url'];
        if (!url || !title) continue;
        const categoryTags = assignCategoryTags(title, stripHtml(desc), sourceName);
        out.push({
          id: `atom-${btoa(url).replace(/[/+=]/g, '').slice(0, 48)}`,
          title,
          url,
          source: sourceName,
          publishedAt: updated,
          summary: stripHtml(desc),
          image,
          category: sourceCategory,
          region,
          categoryTags,
        });
      }
    }
  } catch (_) {
    // ignore parse errors
  }
  return out;
}

async function fetchOneFeed(config: (typeof newsSources)[number]): Promise<{ items: NewsFeedItem[]; ok: boolean }> {
  try {
    const res = await fetch(config.url, {
      headers: {
        'User-Agent': USER_AGENT,
        Accept: ACCEPT,
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return { items: [], ok: false };
    const text = await res.text();
    const items = parseRssOrAtom(text, config.name, config.category, config.region);
    return { items, ok: true };
  } catch {
    return { items: [], ok: false };
  }
}

function dedupeByUrlAndTitle(items: NewsFeedItem[]): NewsFeedItem[] {
  const byUrl = new Map<string, NewsFeedItem>();
  const seenTitles = new Set<string>();
  for (const it of items) {
    const u = it.url.toLowerCase().trim();
    if (byUrl.has(u)) continue;
    const normTitle = normalizeTitleForDedup(it.title);
    if (seenTitles.has(normTitle)) continue;
    seenTitles.add(normTitle);
    byUrl.set(u, it);
  }
  return Array.from(byUrl.values());
}

function sortNewestFirst(items: NewsFeedItem[]): void {
  items.sort((a, b) => {
    const da = new Date(a.publishedAt).getTime();
    const db = new Date(b.publishedAt).getTime();
    if (Number.isNaN(da) && Number.isNaN(db)) return 0;
    if (Number.isNaN(da)) return 1;
    if (Number.isNaN(db)) return -1;
    return db - da;
  });
}

function filterAndLimit(
  items: NewsFeedItem[],
  category: NewsCategory
): NewsFeedItem[] {
  if (category === 'all') return items.slice(0, LIMIT_ALL);
  if (category === 'Local') return items.filter((i) => i.region === 'local').slice(0, LIMIT_PER_CATEGORY);
  if (category === 'International') return items.filter((i) => i.region === 'international').slice(0, LIMIT_PER_CATEGORY);
  return items
    .filter((i) => i.categoryTags.includes(category))
    .slice(0, LIMIT_PER_CATEGORY);
}

export async function getAggregatedFeed(
  category: NewsCategory = 'all',
  _locale: string = 'en'
): Promise<{ items: NewsFeedItem[]; failedFeeds: string[] }> {
  const now = Date.now();
  if (cache && now - cache.at < CACHE_TTL_MS) {
    const filtered = filterAndLimit(cache.items, category);
    return { items: filtered, failedFeeds: [] };
  }

  const results = await Promise.allSettled(
    newsSources.map(async (s) => {
      const { items, ok } = await fetchOneFeed(s);
      return { source: s.name, items, ok };
    })
  );

  const all: NewsFeedItem[] = [];
  const failedFeeds: string[] = [];
  for (const r of results) {
    if (r.status === 'rejected') continue;
    const { source, items, ok } = r.value;
    if (!ok) failedFeeds.push(source);
    all.push(...items);
  }

  const deduped = dedupeByUrlAndTitle(all);
  sortNewestFirst(deduped);
  cache = { items: deduped, at: now };

  const filtered = filterAndLimit(deduped, category);
  return { items: filtered, failedFeeds };
}
