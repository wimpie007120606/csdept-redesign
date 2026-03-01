import { motion } from 'motion/react';

export interface TimelineItemProps {
  year: string;
  title: string;
  description?: string;
}

interface TimelineProps {
  items: TimelineItemProps[];
  /** Optional className for the root container */
  className?: string;
}

export function Timeline({ items, className = '' }: TimelineProps) {
  return (
    <ul
      className={`relative ${className}`}
      aria-label="Timeline"
    >
      {/* Vertical center line - hidden on mobile, visible from md */}
      <div
        className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-[#7B1E3A]/30 hidden md:block"
        aria-hidden
      />

      {items.map((item, index) => {
        const isLeft = index % 2 === 0;
        return (
          <motion.li
            key={`${item.year}-${item.title}-${index}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-24px' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative flex flex-col md:flex-row md:items-stretch gap-4 md:gap-0 py-6 md:py-4 min-h-[4rem]"
          >
            {/* Dot marker - left on mobile, centered on desktop */}
            <div
              className="absolute w-3 h-3 rounded-full border-2 border-[#7B1E3A] bg-background flex-shrink-0 top-[1.125rem] left-0 md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 z-10"
              aria-hidden
            />

            {/* Spacer when item is on the right (desktop only) */}
            {!isLeft && (
              <div className="hidden md:block w-1/2 pr-6 flex-shrink-0" aria-hidden />
            )}

            {/* Content box - left or right half on desktop */}
            <div
              className={`
                flex-1 min-w-0 bg-card rounded-lg p-4 border border-border text-foreground/90
                ml-6 md:ml-0 md:w-1/2 md:flex-shrink-0
                ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}
              `}
            >
              <p className="font-semibold text-[#7B1E3A] text-lg mb-1">
                {item.year}
              </p>
              <p className="font-semibold text-foreground">
                {item.title}
              </p>
              {item.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {item.description}
                </p>
              )}
            </div>

            {/* Spacer when item is on the left (desktop only) */}
            {isLeft && (
              <div className="hidden md:block w-1/2 pl-6 flex-shrink-0" aria-hidden />
            )}
          </motion.li>
        );
      })}
    </ul>
  );
}
