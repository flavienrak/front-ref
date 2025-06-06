import React from 'react';

import { cn } from '@/lib/utils';

export default function PrimaryButton({
  label,
  className,
  children,
  onClick,
}: {
  label: string;
  className?: string;
  children?: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-40 h-12 flex justify-center items-center gap-2 px-6 text-white bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 rounded-md cursor-pointer hover:opacity-80',
        className,
      )}
    >
      {children}
      <span>{label}</span>
    </button>
  );
}
