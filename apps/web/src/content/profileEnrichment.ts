/**
 * Staff profile enrichment guard.
 * Profiles listed here have real content (About >150 chars, bio, timeline, or
 * multiple structured sections) and must NEVER be modified, reformatted, or
 * have sources appended.
 */

/** Slugs for which enrichment is NOT required and must be skipped entirely. */
export const ENRICHMENT_NOT_REQUIRED = new Set<string>([
  'whk-bester',
  'lynette-van-zijl',
  'brink-van-der-merwe',
  'walter-schulze',
  'bernd-fischer',
  'jaco-geldenhuys',
  'cornelia-inggs',
  'willem-visser',
  'steve-kroon',
]);

/**
 * Returns false if the profile must not be enriched (has real content).
 * Only profiles not in ENRICHMENT_NOT_REQUIRED may be considered for enrichment.
 */
export function isEnrichmentAllowed(slug: string): boolean {
  return !ENRICHMENT_NOT_REQUIRED.has(slug?.trim() ?? '');
}
