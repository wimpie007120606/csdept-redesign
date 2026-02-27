import { Link, useParams } from 'react-router';
import type { ComponentProps } from 'react';

const SUPPORTED = ['en', 'af', 'xh'] as const;

function prefixWithLang(lang: string | undefined, to: string): string {
  const currentLang = lang && (SUPPORTED as readonly string[]).includes(lang) ? lang : 'en';
  const path = typeof to === 'string' && to.startsWith('/') ? to : `/${to}`;
  return `/${currentLang}${path}`;
}

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, 'to'> & {
  to: string;
};

/**
 * Link that prefixes the "to" path with the current language segment (e.g. /en/study).
 * Use for all internal navigation when using language-prefixed routes.
 */
export function LocalizedLink({ to, ...props }: LocalizedLinkProps) {
  const { lang } = useParams<{ lang: string }>();
  const prefixedTo = prefixWithLang(lang, to);
  return <Link to={prefixedTo} {...props} />;
}
