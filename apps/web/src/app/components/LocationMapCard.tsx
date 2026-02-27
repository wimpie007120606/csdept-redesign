import { useState, useCallback } from 'react';
import { MapPin, ExternalLink, Copy, Check } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

/** Single source of truth for CS Division location (official department coordinates). */
export const LOCATION = {
  name: 'Computer Science Division – General Engineering Building',
  addressLine: 'Banghoek Rd & Joubert St, Stellenbosch (General Engineering Building / A508 area)',
  lat: -33.92525,
  lng: 18.853083,
} as const;

/** Human-readable coordinates (exact format from legacy site). */
export const COORDINATES_DISPLAY = {
  lat: "33° 55' 30.90\" South",
  lng: "18° 51' 55.10\" East",
} as const;

export const COORDINATES_STRING = `${LOCATION.lat}, ${LOCATION.lng}`;

/** Google Maps: open location (or directions). No API key. */
export function getGoogleMapsDirectionsUrl(
  lat: number,
  lng: number,
  _label?: string
): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

/** Apple Maps: open location. */
export function getAppleMapsUrl(lat: number, lng: number, _label?: string): string {
  return `https://maps.apple.com/?ll=${lat},${lng}&q=${encodeURIComponent(LOCATION.name)}`;
}

/** Google Maps embed iframe URL (no API key). Centers on coordinates. */
export function getGoogleMapsEmbedUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`;
}

interface LocationMapCardProps {
  name?: string;
  addressLine?: string;
  lat?: number;
  lng?: number;
}

export function LocationMapCard({
  name = LOCATION.name,
  addressLine = LOCATION.addressLine,
  lat = LOCATION.lat,
  lng = LOCATION.lng,
}: LocationMapCardProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopyCoordinates = useCallback(async () => {
    const text = `${lat}, ${lng}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }, [lat, lng]);

  const googleUrl = getGoogleMapsDirectionsUrl(lat, lng, name);
  const appleUrl = getAppleMapsUrl(lat, lng, name);
  const embedUrl = getGoogleMapsEmbedUrl(lat, lng);

  return (
    <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
      <div className="p-6 lg:p-8">
        <h3 className="font-['Spectral'] text-xl font-bold text-foreground mb-2">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm flex items-start gap-2">
          <MapPin className="w-4 h-4 text-[#7B1E3A] flex-shrink-0 mt-0.5" aria-hidden />
          {addressLine}
        </p>
      </div>

      <div className="px-6 lg:px-8 pb-4">
        <div className="rounded-xl border border-border overflow-hidden bg-muted/30">
          <iframe
            src={embedUrl}
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map: ${name}`}
            className="w-full aspect-video min-h-[280px]"
          />
        </div>

        <p className="mt-3 text-sm text-muted-foreground font-mono" aria-label={t('common.coordinatesLabel')}>
          {COORDINATES_DISPLAY.lat}<br />
          {COORDINATES_DISPLAY.lng}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 bg-[#7B1E3A] text-white rounded-xl font-semibold hover:bg-[#7B1E3A]/90 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2"
          >
            <ExternalLink className="w-4 h-4" aria-hidden />
            {t('contact.openInGoogleMaps')}
          </a>
          <a
            href={appleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 bg-foreground text-background rounded-xl font-semibold hover:bg-foreground/90 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
          >
            <ExternalLink className="w-4 h-4" aria-hidden />
            {t('contact.openInAppleMaps')}
          </a>
          <button
            type="button"
            onClick={handleCopyCoordinates}
            className="inline-flex items-center gap-2 px-4 py-3 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-colors text-sm border border-border focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" aria-hidden />
                <span>{t('contact.copied')}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" aria-hidden />
                <span>{t('contact.copyCoordinates')}</span>
              </>
            )}
          </button>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          {t('contact.mapTip')}
        </p>
      </div>
    </div>
  );
}
