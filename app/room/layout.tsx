'use client';

import React from 'react';
import LandingHeader from '@/components/landing/LandingHeader';

import { getUserRoomsService } from '@/services/room.service';
import { useDispatch } from 'react-redux';
import { setUserRoomsReducer } from '@/redux/slices/room.slice';

export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    let isMounted = true;

    (async () => {
      const res = await getUserRoomsService();

      if (isMounted) {
        if (res.userRooms) {
          dispatch(setUserRoomsReducer({ userRooms: res.userRooms }));
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[var(--secondary-color)]">
      <LandingHeader href={'/room'} />
      <div className="flex-1 pt-16">{children}</div>
    </div>
  );
}
