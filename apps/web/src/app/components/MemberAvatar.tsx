import { useState } from 'react';

/** Get initials from display name (e.g. "Lynette van Zijl" → "LvZ"). */
function getInitials(name: string): string {
  const parts = name.replace(/\b(Prof\.|Dr\.|Mr\.|Ms\.)\s*/gi, '').trim().split(/\s+/);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

interface MemberAvatarProps {
  displayName: string;
  /** Explicit photo path under public/ (e.g. /people/Andrew_ColletPeople.jpg). */
  photo?: string | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = { sm: 'w-12 h-12 text-sm', md: 'w-16 h-16 text-lg', lg: 'w-24 h-24 text-xl' };
const PLACEHOLDER = '/people/placeholder.jpg';

export function MemberAvatar({ displayName, photo, className = '', size = 'md' }: MemberAvatarProps) {
  const [errored, setErrored] = useState(false);
  const initials = getInitials(displayName);
  const sizeClass = sizeClasses[size];

  const effectivePhoto = !errored ? photo : null;

  if (!effectivePhoto) {
    // Use explicit placeholder image so layout never breaks.
    return (
      <img
        src={PLACEHOLDER}
        alt={displayName}
        className={`rounded-full object-cover flex-shrink-0 ${sizeClass} ${className}`}
      />
    );
  }

  return (
    <img
      src={effectivePhoto}
      alt={displayName}
      className={`rounded-full object-cover flex-shrink-0 ${sizeClass} ${className}`}
      onError={() => setErrored(true)}
    />
  );
}
