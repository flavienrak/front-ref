import React from 'react';
import UserRoomComponent from '@/components/room/UserRoomComponent';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Room',
  description: 'Room Page',
};

export default function UserRoomPage() {
  return (
    <div className="w-full">
      <UserRoomComponent />
    </div>
  );
}
