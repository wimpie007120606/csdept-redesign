/**
 * News feed sources for the real-time CS news aggregator.
 * Add or remove feeds here; only headline + excerpt + thumbnail + link are shown (no full article).
 */

export type NewsCategory =
  | 'all'
  | 'AI'
  | 'Cybersecurity'
  | 'Software'
  | 'Research'
  | 'Local'
  | 'International'
  | 'Data Science'
  | 'Robotics';

export type Region = 'local' | 'international';

export interface NewsSourceConfig {
  url: string;
  name: string;
  category: NewsCategory;
  region: Region;
}

/** RSS and API sources. Use only legal, stable feeds. */
export const newsSources: NewsSourceConfig[] = [
  // South Africa / African
  { url: 'https://theconversation.com/africa/articles.atom', name: 'The Conversation (Africa)', category: 'Research', region: 'local' },
  // International tech
  { url: 'https://www.technologyreview.com/feed/', name: 'MIT Technology Review', category: 'Research', region: 'international' },
  { url: 'https://www.wired.com/feed/rss', name: 'Wired', category: 'International', region: 'international' },
  { url: 'https://www.theverge.com/rss/index.xml', name: 'The Verge', category: 'Software', region: 'international' },
  { url: 'https://feeds.arstechnica.com/arstechnica/index', name: 'Ars Technica', category: 'Cybersecurity', region: 'international' },
  { url: 'https://spectrum.ieee.org/feeds/feed.rss', name: 'IEEE Spectrum', category: 'Research', region: 'international' },
  { url: 'https://blog.google/technology/developers/rss/', name: 'Google Developers Blog', category: 'Software', region: 'international' },
  { url: 'https://aws.amazon.com/blogs/aws/feed/', name: 'AWS Blog', category: 'Software', region: 'international' },
  { url: 'https://openai.com/blog/rss.xml', name: 'OpenAI Blog', category: 'AI', region: 'international' },
  { url: 'https://deepmind.google/blog/rss/', name: 'DeepMind Blog', category: 'AI', region: 'international' },
];
