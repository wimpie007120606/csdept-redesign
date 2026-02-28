/**
 * GET /api/news?category=all — Server-side news aggregator for Cloudflare Pages.
 * Same-origin so production never depends on a separate Worker.
 *
 * Verification (Phase 7):
 * - Visit https://cs.vantondertech.dev/api/health/news → must return { ok: true, runtime: "cloudflare-pages", ... }
 * - Visit https://cs.vantondertech.dev/api/news?category=all → must return { data: [...], isFallback?: boolean } with 30–40 items
 * - /en/news must render items; category tabs show max 10 each; clicking opens real external article (target=_blank)
 */

const USER_AGENT = 'csdept-news-bot/1.0 (+https://cs.vantondertech.dev)';
const ACCEPT = 'application/rss+xml, application/xml, text/xml, application/json, text/html';
const FETCH_TIMEOUT_MS = 9000;
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours
const LIMIT_ALL = 40;
const LIMIT_CATEGORY = 10;

interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  summary: string;
  image: string | null;
  categories: string[];
  region: 'local' | 'international';
}

// In-memory cache (persists in same isolate on Cloudflare)
let cache: { items: NewsItem[]; at: number } | null = null;

function stripHtml(s: string): string {
  if (!s || typeof s !== 'string') return '';
  return s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 400);
}

function assignCategories(title: string, summary: string): string[] {
  const t = `${title} ${summary}`.toLowerCase();
  const out: string[] = [];
  if (/\b(ai|machine learning|llm|deep learning|generative|neural)\b/.test(t)) out.push('AI');
  if (/\b(security|breach|malware|phishing|ransomware|vuln|CVE)\b/.test(t)) out.push('Cybersecurity');
  if (/\b(programming|software|framework|release|dev|javascript|python)\b/.test(t)) out.push('Software');
  if (/\b(arxiv|paper|journal|study|conference|ieee|acm|research)\b/.test(t)) out.push('Research');
  if (out.length === 0) out.push('Research');
  return out;
}

function parseRssItems(xml: string, sourceName: string, region: 'local' | 'international'): NewsItem[] {
  const out: NewsItem[] = [];
  const itemBlocks = xml.split(/<item\s*>/i).slice(1);
  for (const block of itemBlocks) {
    const titleMatch = block.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const linkMatch = block.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
    const descMatch = block.match(/<description[^>]*>([\s\S]*?)<\/description>/i);
    const pubMatch = block.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i);
    const title = titleMatch ? stripHtml(titleMatch[1]) : '';
    let link = linkMatch ? linkMatch[1].replace(/<[^>]+>/g, '').trim() : '';
    if (!link || !title) continue;
    const summary = descMatch ? stripHtml(descMatch[1]) : '';
    const pubDate = pubMatch ? pubMatch[1].trim() : new Date().toISOString();
    const categories = assignCategories(title, summary);
    const id = 'rss-' + btoa(link).replace(/[/+=]/g, '').slice(0, 32);
    out.push({ id, title, url: link, source: sourceName, publishedAt: pubDate, summary, image: null, categories, region });
  }
  return out;
}

function parseAtomEntries(xml: string, sourceName: string, region: 'local' | 'international'): NewsItem[] {
  const out: NewsItem[] = [];
  const entries = xml.split(/<entry\s*>/i).slice(1);
  for (const block of entries) {
    const titleMatch = block.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const linkMatch = block.match(/<link[^>]+href=["']([^"']+)["']/i);
    const updatedMatch = block.match(/<updated[^>]*>([\s\S]*?)<\/updated>/i);
    const summaryMatch = block.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i);
    const title = titleMatch ? stripHtml(titleMatch[1]) : '';
    const link = linkMatch ? linkMatch[1].trim() : '';
    if (!link || !title) continue;
    const publishedAt = updatedMatch ? updatedMatch[1].trim() : new Date().toISOString();
    const summary = summaryMatch ? stripHtml(summaryMatch[1]) : '';
    const categories = assignCategories(title, summary);
    const id = 'atom-' + btoa(link).replace(/[/+=]/g, '').slice(0, 32);
    out.push({ id, title, url: link, source: sourceName, publishedAt, summary, image: null, categories, region });
  }
  return out;
}

async function fetchWithTimeout(url: string): Promise<string> {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT, Accept: ACCEPT },
      redirect: 'follow',
      signal: c.signal,
    });
    clearTimeout(t);
    if (!res.ok) return '';
    return await res.text();
  } catch {
    clearTimeout(t);
    return '';
  }
}

async function fetchHn(query: string): Promise<NewsItem[]> {
  const url = `https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(query)}&tags=story&hitsPerPage=15`;
  try {
    const text = await fetchWithTimeout(url);
    if (!text) return [];
    const json = JSON.parse(text);
    const hits = json.hits || [];
    return hits.map((h: { objectID: string; title: string; url?: string; story_url?: string; created_at: string; _highlightResult?: { story_title?: { value?: string } } }) => {
      const title = (h._highlightResult?.story_title?.value || h.title || '').replace(/<[^>]+>/g, '');
      const link = h.url || h.story_url || `https://news.ycombinator.com/item?id=${h.objectID}`;
      return {
        id: 'hn-' + h.objectID,
        title: title || 'Hacker News',
        url: link,
        source: 'Hacker News',
        publishedAt: h.created_at || new Date().toISOString(),
        summary: '',
        image: null,
        categories: assignCategories(title, ''),
        region: 'international' as const,
      };
    });
  } catch {
    return [];
  }
}

async function fetchArxivRss(feedUrl: string, sourceName: string): Promise<NewsItem[]> {
  const text = await fetchWithTimeout(feedUrl);
  if (!text) return [];
  if (text.trim().startsWith('<?xml') && text.includes('<entry>')) return parseAtomEntries(text, sourceName, 'international');
  return parseRssItems(text, sourceName, 'international');
}

async function fetchAllLive(): Promise<NewsItem[]> {
  const sources: Promise<NewsItem[]>[] = [
    fetchHn('computer science'),
    fetchHn('artificial intelligence'),
    fetchArxivRss('https://export.arxiv.org/rss/cs.AI', 'arXiv cs.AI'),
    fetchArxivRss('https://export.arxiv.org/rss/cs.LG', 'arXiv cs.LG'),
    fetchArxivRss('https://export.arxiv.org/rss/cs.CR', 'arXiv cs.CR'),
    fetchArxivRss('https://export.arxiv.org/rss/cs', 'arXiv cs'),
  ];
  const results = await Promise.allSettled(sources);
  const all: NewsItem[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') all.push(...r.value);
  }
  return all;
}

function dedupe(items: NewsItem[]): NewsItem[] {
  const byUrl = new Map<string, NewsItem>();
  for (const it of items) {
    const u = it.url.toLowerCase().trim();
    if (!byUrl.has(u)) byUrl.set(u, it);
  }
  return Array.from(byUrl.values());
}

function sortAndLimit(items: NewsItem[], category: string): NewsItem[] {
  items.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  if (category === 'all') return items.slice(0, LIMIT_ALL);
  if (category === 'Local') return items.filter((i) => i.region === 'local').slice(0, LIMIT_CATEGORY);
  if (category === 'International') return items.filter((i) => i.region === 'international').slice(0, LIMIT_CATEGORY);
  return items.filter((i) => i.categories.includes(category)).slice(0, LIMIT_CATEGORY);
}

function filterByCategory(items: NewsItem[], category: string): NewsItem[] {
  if (category === 'all') return items;
  if (category === 'Local') return items.filter((i) => i.region === 'local');
  if (category === 'International') return items.filter((i) => i.region === 'international');
  return items.filter((i) => i.categories.includes(category));
}

/** Map to frontend shape: category (string) + categoryTags (string[]). */
function toFrontend(items: Array<{ id: string; title: string; url: string; source: string; publishedAt: string; summary: string; image: string | null; categories: string[]; region: string }>) {
  return items.map((i) => ({
    id: i.id,
    title: i.title,
    url: i.url,
    source: i.source,
    publishedAt: i.publishedAt,
    summary: i.summary,
    image: i.image,
    region: i.region,
    category: i.categories[0] ?? 'Research',
    categoryTags: i.categories,
  }));
}

/** Minimal inline fallback so we never 500 or return empty (e.g. if fallbackNews import fails). */
const MINIMAL_FALLBACK: NewsItem[] = [
  { id: 'm1', title: 'arXiv Computer Science', url: 'https://arxiv.org/list/cs/recent', source: 'arXiv', publishedAt: new Date().toISOString(), summary: 'Latest CS preprints.', image: null, categories: ['Research'], region: 'international' },
  { id: 'm2', title: 'Hacker News', url: 'https://news.ycombinator.com/', source: 'Hacker News', publishedAt: new Date().toISOString(), summary: 'Tech and startup news.', image: null, categories: ['Software'], region: 'international' },
  { id: 'm3', title: 'IEEE Spectrum', url: 'https://spectrum.ieee.org/computing', source: 'IEEE Spectrum', publishedAt: new Date().toISOString(), summary: 'Computing and technology.', image: null, categories: ['Research'], region: 'international' },
  { id: 'm4', title: 'MIT Technology Review', url: 'https://www.technologyreview.com/', source: 'MIT Technology Review', publishedAt: new Date().toISOString(), summary: 'Technology and innovation.', image: null, categories: ['Research', 'AI'], region: 'international' },
  { id: 'm5', title: 'Ars Technica', url: 'https://arstechnica.com/', source: 'Ars Technica', publishedAt: new Date().toISOString(), summary: 'Technology and science.', image: null, categories: ['Software'], region: 'international' },
];

async function getFallbackList(category: string): Promise<NewsItem[]> {
  try {
    const { FALLBACK_NEWS } = await import('../fallbackNews.js');
    return sortAndLimit(FALLBACK_NEWS, category);
  } catch {
    return sortAndLimit(MINIMAL_FALLBACK, category);
  }
}

function jsonResponse(data: unknown): Response {
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export const onRequestGet = async (context: { request: Request }) => {
  const category = (new URL(context.request.url).searchParams.get('category')) || 'all';

  try {
    const now = Date.now();
    if (cache && now - cache.at < CACHE_TTL_MS) {
      const list = sortAndLimit(filterByCategory(cache.items, category), category);
      const data = list.length ? list : await getFallbackList(category);
      return jsonResponse({ data: toFrontend(data), isFallback: !list.length });
    }

    let live = await fetchAllLive();
    live = dedupe(live);

    if (live.length === 0) {
      const list = await getFallbackList(category);
      return jsonResponse({ data: toFrontend(list), isFallback: true });
    }

    cache = { items: live, at: now };
    const list = sortAndLimit(filterByCategory(live, category), category);
    return jsonResponse({ data: toFrontend(list), isFallback: false });
  } catch (_err) {
    const list = await getFallbackList(category);
    return jsonResponse({ data: toFrontend(list), isFallback: true });
  }
};
