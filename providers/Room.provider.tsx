'use client';

import React from 'react';

import { setUserRoomsReducer } from '@/redux/slices/room.slice';
import { getUserRoomsService } from '@/services/room.service';
import { useDispatch } from 'react-redux';
import { UserRoomInterface } from '@/interfaces/user-room.interface';
import { useSocket } from './Socket.provider';

interface RoomContextType {
  userRooms: UserRoomInterface[];
}
const RoomContext = React.createContext<RoomContextType | undefined>(undefined);
export const useRoom = (): RoomContextType => {
  const context = React.useContext(RoomContext);
  if (context === undefined) {
    throw new Error('useRoom must be used within a RoomProvider');
  }
  return context;
};

export default function RoomProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  const { socket } = useSocket();

  const [userRooms, setUserRooms] = React.useState<UserRoomInterface[]>([]);

  React.useEffect(() => {
    if (socket) {
      let isMounted = true;

      (async () => {
        const res = await getUserRoomsService();

        if (isMounted) {
          if (res.userRooms) {
            dispatch(setUserRoomsReducer({ userRooms: res.userRooms }));
            setUserRooms(res.userRooms);

            const roomIds = res.userRooms.map(
              (item: UserRoomInterface) => item.room.id,
            );

            socket.emit('joinRooms', roomIds);
          }
        }
      })();

      return () => {
        isMounted = false;
      };
    }
  }, [socket]);

  return (
    <RoomContext.Provider value={{ userRooms }}>
      {children}
    </RoomContext.Provider>
  );
}
