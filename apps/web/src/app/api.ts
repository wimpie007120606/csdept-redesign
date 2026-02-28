/** API base URL: from env in production; in dev defaults to http://localhost:8787 if unset. */
export function getApiBaseUrl(): string {
  const env = typeof import.meta.env !== 'undefined' ? import.meta.env : undefined;
  const fromEnv = (env?.VITE_API_BASE_URL as string)?.trim?.();
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  if (env?.DEV) return 'http://localhost:8787';
  return '';
}

const API_BASE = getApiBaseUrl();

export function apiUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return API_BASE ? `${API_BASE}${p}` : '';
}

export async function fetchApi<T>(path: string, options?: RequestInit): Promise<T | null> {
  const url = apiUrl(path);
  if (!url) return null;
  try {
    const res = await fetch(url, { credentials: 'include', ...options });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export interface Person {
  id: number;
  slug: string;
  full_name: string;
  title: string | null;
  role: string | null;
  division: string | null;
  email_primary: string | null;
  email_secondary: string | null;
  phone: string | null;
  office: string | null;
  bio: string | null;
  research_interests_json: string | null;
  qualifications: string | null;
  links_json: string | null;
  image_key: string | null;
  created_at: string;
  updated_at: string;
}

export interface Publication {
  id: number;
  person_id: number;
  year: number;
  citation: string;
  venue: string | null;
  tags_json: string | null;
  url: string | null;
}

export interface PersonDetail extends Person {
  publications?: Publication[];
  publications_by_year?: { year: number; publications: Publication[] }[];
}

export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  body_md: string | null;
  cover_image_key: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

/** Real-time aggregated feed item (from GET /api/news/feed). */
export interface NewsFeedItem {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  summary: string;
  image: string | null;
  category: string;
  region: string;
  categoryTags?: string[];
}

export interface NewsFeedResult {
  items: NewsFeedItem[];
  ok: boolean;
  isFallback?: boolean;
  /** When ok is false: for debugging (status, body snippet, request URL). */
  errorDetail?: { status: number; body: string; requestUrl: string };
}

/** Same-origin news API (Cloudflare Pages Function). Use relative URL so production always works. */
function newsApiUrl(category: string): string {
  const base = typeof window !== 'undefined' ? '' : getApiBaseUrl();
  const path = `/api/news?category=${encodeURIComponent(category)}`;
  return base ? `${base.replace(/\/$/, '')}${path}` : path;
}

export async function getNewsFeed(category: string = 'all', _locale: string = 'en'): Promise<NewsFeedResult> {
  const path = newsApiUrl(category);
  const requestUrl = path.startsWith('http') ? path : (typeof window !== 'undefined' ? window.location.origin + path : path);
  try {
    const res = await fetch(requestUrl, { credentials: 'include' });
    const bodyText = await res.text();
    let data: { data?: NewsFeedItem[]; isFallback?: boolean };
    try {
      data = JSON.parse(bodyText) as { data?: NewsFeedItem[]; isFallback?: boolean };
    } catch {
      data = {};
    }
    if (!res.ok) {
      return {
        items: [],
        ok: false,
        errorDetail: { status: res.status, body: bodyText.slice(0, 200), requestUrl },
      };
    }
    return {
      items: data?.data ?? [],
      ok: true,
      isFallback: data?.isFallback === true,
    };
  } catch (e) {
    const body = e instanceof Error ? e.message : String(e);
    return {
      items: [],
      ok: false,
      errorDetail: { status: 0, body, requestUrl },
    };
  }
}

/** GET /api/health/news — verify news API is reachable (same-origin). */
export async function getNewsHealth(): Promise<{ ok: boolean; runtime?: string; time?: string }> {
  const path = '/api/health/news';
  const url = typeof window !== 'undefined' ? window.location.origin + path : getApiBaseUrl() ? getApiBaseUrl() + path : path;
  try {
    const res = await fetch(url, { credentials: 'include' });
    if (!res.ok) return { ok: false };
    const data = (await res.json()) as { ok?: boolean; runtime?: string; time?: string };
    return { ok: data?.ok === true, runtime: data?.runtime, time: data?.time };
  } catch {
    return { ok: false };
  }
}

export interface EventItem {
  id: number;
  slug: string;
  title: string;
  body_md: string | null;
  location: string | null;
  start_at: string;
  end_at: string | null;
  cover_image_key: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProgrammeModule {
  id: number;
  programme_year_id: number;
  group_name: string | null;
  module_code: string;
  module_name: string;
  credits: number;
  is_compulsory: boolean;
  notes_md: string | null;
  sort_order: number;
}

export interface ProgrammeYear {
  id: number;
  programme_id: number;
  year_number: number;
  min_credits: number | null;
  max_credits: number | null;
  notes_md: string | null;
  modules?: ProgrammeModule[];
}

export interface Programme {
  id: number;
  slug: string;
  name: string;
  focal_area: string | null;
  admission_requirements_md: string | null;
  continued_study_md: string | null;
  notes_md: string | null;
  created_at: string;
  updated_at: string;
  years?: ProgrammeYear[];
}

export async function getPeople(): Promise<Person[]> {
  const data = await fetchApi<{ data: Person[] }>('/api/people');
  return data?.data ?? [];
}

export async function getPerson(slug: string): Promise<PersonDetail | null> {
  return fetchApi<PersonDetail>(`/api/people/${encodeURIComponent(slug)}`);
}

export async function getNews(): Promise<NewsItem[]> {
  const data = await fetchApi<{ data: NewsItem[] }>('/api/news');
  return data?.data ?? [];
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  return fetchApi<NewsItem>(`/api/news/${encodeURIComponent(slug)}`);
}

export async function getEvents(): Promise<EventItem[]> {
  const data = await fetchApi<{ data: EventItem[] }>('/api/events');
  return data?.data ?? [];
}

export async function getEvent(slug: string): Promise<EventItem | null> {
  return fetchApi<EventItem>(`/api/events/${encodeURIComponent(slug)}`);
}

export async function getProgrammes(): Promise<Programme[]> {
  const data = await fetchApi<{ data: Programme[] }>('/api/programmes');
  return data?.data ?? [];
}

export async function getProgramme(slug: string): Promise<Programme | null> {
  return fetchApi<Programme>(`/api/programmes/${encodeURIComponent(slug)}`);
}

export function assetUrl(key: string | null): string | null {
  if (!key || !API_BASE) return null;
  return `${API_BASE}/api/assets/${encodeURIComponent(key)}`;
}

export interface EventRegistrationPayload {
  eventId: string;
  email: string;
  title?: string;
  date?: string;
  time?: string;
  location?: string;
  capacity?: number;
}

export interface EventRegistrationResponse {
  ok: boolean;
  alreadyRegistered?: boolean;
  emailSent?: boolean;
  count?: number;
  error?: string;
}

function registrationErrorFromStatus(status: number, bodyError?: string): string {
  if (status === 404) return 'API route not found (404). Check that the API is deployed and VITE_API_BASE_URL is set.';
  if (status === 401) return 'Unauthorized (401).';
  if (status === 403) return 'Forbidden (403).';
  if (status === 429) return bodyError ?? 'Too many requests. Please try again later.';
  if (status >= 500) return bodyError ?? `Server error (${status}). Please try again later.`;
  return bodyError ?? `Request failed (${status}).`;
}

export async function registerForEvent(
  payload: EventRegistrationPayload
): Promise<EventRegistrationResponse> {
  const url = apiUrl('/api/events/register');
  if (typeof window !== 'undefined') {
    console.info('[event-register] request URL:', url || '(empty – set VITE_API_BASE_URL)');
  }
  if (!url) {
    return {
      ok: false,
      error: 'API not configured. Set VITE_API_BASE_URL to your API URL (e.g. https://your-worker.workers.dev).',
    };
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    const rawText = await res.text();
    let data: EventRegistrationResponse & { error?: string };
    try {
      data = JSON.parse(rawText) as EventRegistrationResponse & { error?: string };
    } catch {
      data = {};
    }
    if (!res.ok) {
      if (typeof window !== 'undefined') {
        console.warn('[event-register] failure:', res.status, rawText.slice(0, 300));
      }
      const message = registrationErrorFromStatus(res.status, data?.error);
      return { ok: false, error: message };
    }
    return data as EventRegistrationResponse;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (typeof window !== 'undefined') {
      console.warn('[event-register] fetch error:', msg);
    }
    if (msg.toLowerCase().includes('failed to fetch') || msg.toLowerCase().includes('network')) {
      return { ok: false, error: 'Network error. Check CORS and that the API URL is reachable.' };
    }
    return { ok: false, error: msg || 'Network error. Please try again.' };
  }
}
