import React from 'react';
import HomeComponent from '@/components/home/HomeComponent';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home Page',
};

export default function HomePage() {
  return (
    <div className="w-full h-full">
      <HomeComponent />
    </div>
  );
}
