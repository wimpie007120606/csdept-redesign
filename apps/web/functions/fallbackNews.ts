/**
 * Fallback news items when live feeds fail. Evergreen links so the page never shows empty.
 * 40 items for "All"; categories are assigned for filtering.
 */
export interface FallbackNewsItem {
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

const now = new Date();
const iso = now.toISOString();

export const FALLBACK_NEWS: FallbackNewsItem[] = [
  { id: 'fb-1', title: 'arXiv Computer Science (cs)', url: 'https://arxiv.org/list/cs/recent', source: 'arXiv', publishedAt: iso, summary: 'Latest computer science preprints.', image: null, categories: ['Research'], region: 'international' },
  { id: 'fb-2', title: 'arXiv AI (cs.AI)', url: 'https://arxiv.org/list/cs.AI/recent', source: 'arXiv', publishedAt: iso, summary: 'Artificial intelligence preprints.', image: null, categories: ['AI', 'Research'], region: 'international' },
  { id: 'fb-3', title: 'arXiv Machine Learning (cs.LG)', url: 'https://arxiv.org/list/cs.LG/recent', source: 'arXiv', publishedAt: iso, summary: 'Machine learning and neural networks.', image: null, categories: ['AI', 'Research'], region: 'international' },
  { id: 'fb-4', title: 'arXiv Cryptography (cs.CR)', url: 'https://arxiv.org/list/cs.CR/recent', source: 'arXiv', publishedAt: iso, summary: 'Cryptography and security.', image: null, categories: ['Cybersecurity', 'Research'], region: 'international' },
  { id: 'fb-5', title: 'Hacker News – Computer Science', url: 'https://hn.algolia.com/?query=computer%20science&sort=byDate', source: 'Hacker News', publishedAt: iso, summary: 'Stories tagged or about computer science.', image: null, categories: ['Software', 'Research'], region: 'international' },
  { id: 'fb-6', title: 'Hacker News – Artificial Intelligence', url: 'https://hn.algolia.com/?query=artificial%20intelligence&sort=byDate', source: 'Hacker News', publishedAt: iso, summary: 'AI and ML discussions.', image: null, categories: ['AI'], region: 'international' },
  { id: 'fb-7', title: 'IEEE Spectrum Computing', url: 'https://spectrum.ieee.org/computing', source: 'IEEE Spectrum', publishedAt: iso, summary: 'Computing and technology news.', image: null, categories: ['Research', 'Software'], region: 'international' },
  { id: 'fb-8', title: 'ACM News', url: 'https://news.acm.org/', source: 'ACM', publishedAt: iso, summary: 'Association for Computing Machinery news.', image: null, categories: ['Research'], region: 'international' },
  { id: 'fb-9', title: 'MIT Technology Review', url: 'https://www.technologyreview.com/', source: 'MIT Technology Review', publishedAt: iso, summary: 'Technology and innovation.', image: null, categories: ['Research', 'AI'], region: 'international' },
  { id: 'fb-10', title: 'Ars Technica', url: 'https://arstechnica.com/', source: 'Ars Technica', publishedAt: iso, summary: 'Technology and science.', image: null, categories: ['Software', 'Cybersecurity'], region: 'international' },
  { id: 'fb-11', title: 'The Verge', url: 'https://www.theverge.com/tech', source: 'The Verge', publishedAt: iso, summary: 'Tech and science coverage.', image: null, categories: ['Software'], region: 'international' },
  { id: 'fb-12', title: 'Wired – Security', url: 'https://www.wired.com/tag/security/', source: 'Wired', publishedAt: iso, summary: 'Cybersecurity and privacy.', image: null, categories: ['Cybersecurity'], region: 'international' },
  { id: 'fb-13', title: 'Google AI Blog', url: 'https://blog.google/technology/ai/', source: 'Google AI', publishedAt: iso, summary: 'Google AI research and updates.', image: null, categories: ['AI'], region: 'international' },
  { id: 'fb-14', title: 'DeepMind Blog', url: 'https://deepmind.google/blog', source: 'DeepMind', publishedAt: iso, summary: 'DeepMind research and news.', image: null, categories: ['AI'], region: 'international' },
  { id: 'fb-15', title: 'OpenAI Blog', url: 'https://openai.com/blog', source: 'OpenAI', publishedAt: iso, summary: 'OpenAI updates and research.', image: null, categories: ['AI'], region: 'international' },
  { id: 'fb-16', title: 'Microsoft Research', url: 'https://www.microsoft.com/en-us/research/blog/', source: 'Microsoft Research', publishedAt: iso, summary: 'Microsoft Research blog.', image: null, categories: ['Research', 'AI'], region: 'international' },
  { id: 'fb-17', title: 'AWS News Blog', url: 'https://aws.amazon.com/blogs/aws/', source: 'AWS', publishedAt: iso, summary: 'Amazon Web Services updates.', image: null, categories: ['Software'], region: 'international' },
  { id: 'fb-18', title: 'GitHub Blog', url: 'https://github.blog/', source: 'GitHub', publishedAt: iso, summary: 'Developer and platform news.', image: null, categories: ['Software'], region: 'international' },
  { id: 'fb-19', title: 'Krebs on Security', url: 'https://krebsonsecurity.com/', source: 'Krebs on Security', publishedAt: iso, summary: 'Cybersecurity investigations.', image: null, categories: ['Cybersecurity'], region: 'international' },
  { id: 'fb-20', title: 'Schneier on Security', url: 'https://www.schneier.com/', source: 'Schneier on Security', publishedAt: iso, summary: 'Security and privacy.', image: null, categories: ['Cybersecurity'], region: 'international' },
  { id: 'fb-21', title: 'arXiv Software Engineering (cs.SE)', url: 'https://arxiv.org/list/cs.SE/recent', source: 'arXiv', publishedAt: iso, summary: 'Software engineering preprints.', image: null, categories: ['Software', 'Research'], region: 'international' },
  { id: 'fb-22', title: 'arXiv Neural and Evolutionary (cs.NE)', url: 'https://arxiv.org/list/cs.NE/recent', source: 'arXiv', publishedAt: iso, summary: 'Neural and evolutionary computation.', image: null, categories: ['AI', 'Research'], region: 'international' },
  { id: 'fb-23', title: 'ITWeb South Africa', url: 'https://www.itweb.co.za/', source: 'ITWeb', publishedAt: iso, summary: 'South African technology news.', image: null, categories: ['Software'], region: 'local' },
  { id: 'fb-24', title: 'MyBroadband', url: 'https://mybroadband.co.za/news/', source: 'MyBroadband', publishedAt: iso, summary: 'South African tech and broadband.', image: null, categories: ['Software'], region: 'local' },
  { id: 'fb-25', title: 'The Conversation – Technology', url: 'https://theconversation.com/africa/topics/technology-719', source: 'The Conversation', publishedAt: iso, summary: 'Expert analysis on technology.', image: null, categories: ['Research'], region: 'local' },
  { id: 'fb-26', title: 'TechCentral', url: 'https://techcentral.co.za/', source: 'TechCentral', publishedAt: iso, summary: 'South African tech news.', image: null, categories: ['Software'], region: 'local' },
  { id: 'fb-27', title: 'Stellenbosch University', url: 'https://www.sun.ac.za/english', source: 'Stellenbosch University', publishedAt: iso, summary: 'Stellenbosch University news.', image: null, categories: ['Research'], region: 'local' },
  { id: 'fb-28', title: 'Nature – Computer Science', url: 'https://www.nature.com/subjects/computer-science', source: 'Nature', publishedAt: iso, summary: 'Computer science research.', image: null, categories: ['Research'], region: 'international' },
  { id: 'fb-29', title: 'ScienceDaily – Computers & Math', url: 'https://www.sciencedaily.com/news/computers_math/', source: 'ScienceDaily', publishedAt: iso, summary: 'Computing and mathematics news.', image: null, categories: ['Research'], region: 'international' },
  { id: 'fb-30', title: 'VentureBeat – AI', url: 'https://venturebeat.com/ai/', source: 'VentureBeat', publishedAt: iso, summary: 'AI and machine learning news.', image: null, categories: ['AI'], region: 'international' },
  { id: 'fb-31', title: 'TechCrunch', url: 'https://techcrunch.com/', source: 'TechCrunch', publishedAt: iso, summary: 'Startups and technology.', image: null, categories: ['Software'], region: 'international' },
  { id: 'fb-32', title: 'ZDNet – Security', url: 'https://www.zdnet.com/topic/security/', source: 'ZDNet', publishedAt: iso, summary: 'Security news and analysis.', image: null, categories: ['Cybersecurity'], region: 'international' },
  { id: 'fb-33', title: 'Dark Reading', url: 'https://www.darkreading.com/', source: 'Dark Reading', publishedAt: iso, summary: 'Cybersecurity news.', image: null, categories: ['Cybersecurity'], region: 'international' },
  { id: 'fb-34', title: 'arXiv Human-Computer Interaction (cs.HC)', url: 'https://arxiv.org/list/cs.HC/recent', source: 'arXiv', publishedAt: iso, summary: 'HCI preprints.', image: null, categories: ['Research', 'Software'], region: 'international' },
  { id: 'fb-35', title: 'arXiv Robotics (cs.RO)', url: 'https://arxiv.org/list/cs.RO/recent', source: 'arXiv', publishedAt: iso, summary: 'Robotics preprints.', image: null, categories: ['Research', 'AI'], region: 'international' },
  { id: 'fb-36', title: 'Python Software Foundation News', url: 'https://pyfound.blogspot.com/', source: 'PSF', publishedAt: iso, summary: 'Python language and community.', image: null, categories: ['Software'], region: 'international' },
  { id: 'fb-37', title: 'Mozilla Hacks', url: 'https://hacks.mozilla.org/', source: 'Mozilla', publishedAt: iso, summary: 'Web and browser technology.', image: null, categories: ['Software'], region: 'international' },
  { id: 'fb-38', title: 'Cloudflare Blog', url: 'https://blog.cloudflare.com/', source: 'Cloudflare', publishedAt: iso, summary: 'Cloud and security updates.', image: null, categories: ['Software', 'Cybersecurity'], region: 'international' },
  { id: 'fb-39', title: 'Netflix Tech Blog', url: 'https://netflixtechblog.com/', source: 'Netflix', publishedAt: iso, summary: 'Engineering at scale.', image: null, categories: ['Software'], region: 'international' },
  { id: 'fb-40', title: 'Meta Research', url: 'https://research.facebook.com/blog/', source: 'Meta Research', publishedAt: iso, summary: 'Meta AI and systems research.', image: null, categories: ['AI', 'Research'], region: 'international' },
];
