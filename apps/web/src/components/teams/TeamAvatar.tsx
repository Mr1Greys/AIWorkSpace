'use client';

import Image from 'next/image';

interface TeamAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  src?: string | null;
}

const sizeMap = {
  sm: { container: 'h-10 w-10 text-base', font: 'text-sm' },
  md: { container: 'h-16 w-16 text-xl', font: 'text-lg' },
  lg: { container: 'h-20 w-20 text-2xl', font: 'text-xl' },
};

const gradientBackground = 'bg-gradient-to-br from-[#EEF2FF] via-[#E0F2FE] to-[#E5E7EB]';

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('') || 'КО';

export function TeamAvatar({ name, size = 'md', src }: TeamAvatarProps) {
  const sizeClasses = sizeMap[size];
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-full ${gradientBackground} ${sizeClasses.container} shadow-sm`}
    >
      {src ? (
        <Image src={src} alt={name} fill sizes="100%" className="object-cover" />
      ) : (
        <span className={`font-semibold text-slate-600 ${sizeClasses.font}`}>{getInitials(name)}</span>
      )}
    </div>
  );
}
