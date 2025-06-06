import React from 'react';
import RoomComponent from '@/components/home/room/RoomComponent';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Room',
  description: 'Room Page',
};

export default function RoomPage() {
  return (
    <div className="w-full h-full">
      <RoomComponent />
    </div>
  );
}
