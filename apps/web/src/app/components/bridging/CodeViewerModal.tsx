import { Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';

interface CodeViewerModalProps {
  open: boolean;
  onClose: () => void;
  filename: string;
  content: string;
  downloadPath: string;
  downloadLabel: string;
}

export function CodeViewerModal({
  open,
  onClose,
  filename,
  content,
  downloadPath,
  downloadLabel,
}: CodeViewerModalProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-4xl max-h-[85vh] flex flex-col gap-4 bg-card border-[color:var(--su-gold,theme(colors.border))] maroon:border-[color:var(--su-gold)]"
        aria-describedby="code-viewer-content"
      >
        <DialogHeader>
          <DialogTitle className="font-mono text-lg text-foreground border-b border-border pb-2 pr-8">
            {filename}
          </DialogTitle>
        </DialogHeader>
        <div
          id="code-viewer-content"
          className="flex-1 min-h-0 overflow-auto rounded-lg border border-border bg-muted/30 p-4"
        >
          <pre className="text-sm font-mono text-foreground whitespace-pre-wrap break-words m-0">
            <code>{content || '(empty file)'}</code>
          </pre>
        </div>
        <DialogFooter className="flex flex-row items-center justify-between gap-2 border-t border-border pt-2">
          <a
            href={downloadPath}
            download={filename}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#7B1E3A] text-white text-sm font-medium hover:bg-[#7B1E3A]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2 maroon:bg-[color:var(--su-gold)] maroon:text-[#0B1C2D] maroon:hover:opacity-90"
          >
            <Download className="w-4 h-4" aria-hidden />
            {downloadLabel}
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-border bg-muted/50 text-foreground text-sm font-medium hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2"
          >
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
