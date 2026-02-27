import { useState } from 'react';
import { getMemberImagePathsToTry } from '../utils/researchPeople';

/** Get initials from display name (e.g. "Lynette van Zijl" → "LvZ"). */
function getInitials(name: string): string {
  const parts = name.replace(/\b(Prof\.|Dr\.|Mr\.|Ms\.)\s*/gi, '').trim().split(/\s+/);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

interface MemberAvatarProps {
  displayName: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = { sm: 'w-12 h-12 text-sm', md: 'w-16 h-16 text-lg', lg: 'w-24 h-24 text-xl' };

export function MemberAvatar({ displayName, className = '', size = 'md' }: MemberAvatarProps) {
  const paths = getMemberImagePathsToTry(displayName);
  const [tryIndex, setTryIndex] = useState(0);
  const showFallback = tryIndex >= paths.length;
  const initials = getInitials(displayName);
  const sizeClass = sizeClasses[size];

  if (showFallback) {
    return (
      <div
        className={`rounded-full bg-[#7B1E3A]/20 text-[#7B1E3A] font-semibold flex items-center justify-center flex-shrink-0 ${sizeClass} ${className}`}
        aria-hidden
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={paths[tryIndex]}
      alt=""
      className={`rounded-full object-cover flex-shrink-0 ${sizeClass} ${className}`}
      onError={() => setTryIndex((i) => i + 1)}
    />
  );
}
