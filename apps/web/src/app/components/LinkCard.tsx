import { LocalizedLink } from './LocalizedLink';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface LinkCardProps {
  title: string;
  description: string;
  href: string;
  external: boolean;
  openLabel: string;
}

export function LinkCard({
  title,
  description,
  href,
  external,
  openLabel,
}: LinkCardProps) {
  const baseClass =
    'inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2 bg-[#7B1E3A] text-white hover:bg-[#7B1E3A]/90';

  return (
    <article
      className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-lg transition-all hover:shadow-xl hover:border-[#7B1E3A]/20 focus-within:ring-2 focus-within:ring-[#7B1E3A] focus-within:ring-offset-2"
      aria-labelledby={`link-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <h3
        id={`link-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className="font-['Playfair_Display'] text-xl font-bold text-foreground mb-2"
      >
        {title}
      </h3>
      <p className="text-muted-foreground text-sm flex-1 mb-4">{description}</p>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClass}
          aria-label={`${openLabel}: ${title}`}
        >
          {openLabel}
          <ExternalLink className="w-4 h-4" aria-hidden />
        </a>
      ) : (
        <LocalizedLink to={href} className={baseClass} aria-label={`${openLabel}: ${title}`}>
          {openLabel}
          <ArrowRight className="w-4 h-4" aria-hidden />
        </LocalizedLink>
      )}
    </article>
  );
}
