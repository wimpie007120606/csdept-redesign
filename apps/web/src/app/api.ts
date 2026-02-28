const API_BASE = typeof import.meta.env !== 'undefined' && import.meta.env.VITE_API_BASE_URL
  ? (import.meta.env.VITE_API_BASE_URL as string).replace(/\/$/, '')
  : '';

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

export async function registerForEvent(
  payload: EventRegistrationPayload
): Promise<EventRegistrationResponse | null> {
  const url = apiUrl('/api/events/register');
  if (!url) return null;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as EventRegistrationResponse & { error?: string };
    if (!res.ok) {
      return { ok: false, error: data?.error ?? 'Registration failed' };
    }
    return data as EventRegistrationResponse;
  } catch {
    return { ok: false, error: 'Network error. Please try again.' };
  }
}
