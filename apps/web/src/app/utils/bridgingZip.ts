import JSZip from 'jszip';
import type { BridgingZipEntry } from '@/content/bridgingCourse';

/**
 * Fetches all bridging course files and builds a ZIP blob.
 * Reports progress via onProgress(current, total).
 */
export async function buildBridgingZip(
  entries: BridgingZipEntry[],
  onProgress?: (current: number, total: number) => void
): Promise<Blob> {
  const zip = new JSZip();
  const total = entries.length;
  let current = 0;

  for (const { fetchPath, zipPath } of entries) {
    try {
      const res = await fetch(fetchPath);
      const blob = await res.blob();
      const content = await blob.text();
      zip.file(zipPath, content);
    } catch {
      // On failure, add a placeholder so the ZIP still has the expected structure
      zip.file(zipPath, `(Could not load: ${fetchPath})\n`);
    }
    current += 1;
    onProgress?.(current, total);
  }

  return zip.generateAsync({ type: 'blob' });
}

/** Triggers browser download of a blob with the given filename. */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
