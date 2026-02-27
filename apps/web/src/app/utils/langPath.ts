import { useParams } from 'react-router';
import type { Language } from '@/i18n/types';

const SUPPORTED = ['en', 'af', 'xh'] as const;

export function useLangParam(): Language | null {
  const { lang } = useParams<{ lang: string }>();
  if (lang && (SUPPORTED as readonly string[]).includes(lang)) return lang as Language;
  return null;
}

/**
 * Returns a path prefixed with the current language (e.g. /en/study).
 * Use for internal navigation so the URL reflects the current language.
 */
export function useWithLang(): (path: string) => string {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang && (SUPPORTED as readonly string[]).includes(lang) ? lang : 'en';
  return (path: string) => {
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return `/${currentLang}${normalized}`;
  };
}

/**
 * Get path without the language prefix (e.g. /en/links -> /links).
 * Used when switching language to keep the same page.
 */
export function pathWithoutLang(pathname: string): string {
  const match = pathname.match(/^\/(en|af|xh)(\/.*|$)/);
  return match ? (match[2] || '/') : pathname;
}

export function isSupportedLang(lang: string): lang is Language {
  return (SUPPORTED as readonly string[]).includes(lang);
}
