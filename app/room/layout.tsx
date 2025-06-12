import React from 'react';
import LandingHeader from '@/components/landing/LandingHeader';

export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[var(--secondary-color)]">
      <LandingHeader href={'/room'} />
      <div className="flex-1 pt-16 px-4 md:px-0">{children}</div>
    </div>
  );
}
