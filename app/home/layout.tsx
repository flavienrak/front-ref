import React from 'react';
import LandingHeader from '@/components/landing/LandingHeader';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <LandingHeader />
      <div className="flex-1 pt-16">{children}</div>
    </div>
  );
}
