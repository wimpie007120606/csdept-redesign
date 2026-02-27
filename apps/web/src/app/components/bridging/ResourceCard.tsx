import { FileText, ExternalLink, Download } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

interface ResourceCardProps {
  label: string;
  path: string;
  type: 'pdf' | 'txt';
}

export function ResourceCard({ label, path, type }: ResourceCardProps) {
  const { t } = useTranslation();
  const openLabel = t('bridging.openResource');
  const downloadLabel = t('bridging.downloadResource');
  return (
    <div
      className="group flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-[#7B1E3A]/30 focus-within:ring-2 focus-within:ring-[#7B1E3A] focus-within:ring-offset-2"
      data-resource-type={type}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-[#7B1E3A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#7B1E3A]/20 transition-colors">
          <FileText className="w-5 h-5 text-[#7B1E3A]" aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="font-medium text-foreground truncate">{label}</p>
          <span className="inline-block mt-0.5 px-2 py-0.5 text-xs font-medium rounded bg-muted text-muted-foreground uppercase">
            {type}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <a
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#7B1E3A] text-white text-sm font-medium hover:bg-[#7B1E3A]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2"
          aria-label={`${openLabel} ${label}`}
        >
          <ExternalLink className="w-4 h-4" aria-hidden />
          {openLabel}
        </a>
        {type === 'pdf' && (
          <a
            href={path}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-muted/50 text-foreground text-sm font-medium hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2"
            aria-label={`${downloadLabel} ${label}`}
          >
            <Download className="w-4 h-4" aria-hidden />
            {downloadLabel}
          </a>
        )}
      </div>
    </div>
  );
}
