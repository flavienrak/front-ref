import React from 'react';
import VoteComponent from '@/components/room/VoteComponent';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vote',
  description: 'Vote Page',
};

export default function VotePage() {
  return (
    <div className="w-full">
      <VoteComponent />
    </div>
  );
}
