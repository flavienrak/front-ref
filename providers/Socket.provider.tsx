'use client';

import React from 'react';
import io, { Socket } from 'socket.io-client';

import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { VoteInterface } from '@/interfaces/vote.interface';
import {
  addRoomReducer,
  addVoteReducer,
  deleteRoomReducer,
  deleteVoteReducer,
  updateCardReducer,
  updateVoteReducer,
} from '@/redux/slices/room.slice';
import { UserRoomInterface } from '@/interfaces/user-room.interface';
import { RoomInterface } from '@/interfaces/room.interface';
import { CardInterface } from '@/interfaces/card.interface';

interface SocketContextType {
  socket: Socket | null;
  isSocketReady: boolean;
  onlineUsers: string[];
  isLoadingResponse: boolean;
  isLoadingQuestion: boolean;
  setIsLoadingResponse: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoadingQuestion: React.Dispatch<React.SetStateAction<boolean>>;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const SocketContext = React.createContext<SocketContextType | undefined>(
  undefined,
);

export const useSocket = (): SocketContextType => {
  const context = React.useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [isSocketReady, setIsSocketReady] = React.useState(false);
  const [onlineUsers, setOnlineUsers] = React.useState<string[]>([]);
  const [isLoadingResponse, setIsLoadingResponse] = React.useState(false);
  const [isLoadingQuestion, setIsLoadingQuestion] = React.useState(false);

  React.useEffect(() => {
    if (user?.id && apiUrl) {
      const newSocket = io(apiUrl, { query: { id: user.id } });
      setSocket(newSocket);
    }
  }, [user?.id]);

  React.useEffect(() => {
    if (socket) {
      socket.on('roomJoined', () => {
        setIsSocketReady(true);
      });

      socket.on('getOnlineUsers', (users: string[]) => {
        setOnlineUsers(users);
      });

      socket.on('createVote', (data: { vote: VoteInterface }) => {
        dispatch(addVoteReducer({ vote: data.vote }));
      });
      socket.on('updateVote', (data: { vote: VoteInterface }) => {
        dispatch(updateVoteReducer({ vote: data.vote }));
      });
      socket.on('deleteVote', (data: { vote: VoteInterface }) => {
        dispatch(deleteVoteReducer({ vote: data.vote }));
      });

      socket.on('joinRoom', (data: { room: RoomInterface }) => {
        dispatch(addRoomReducer({ room: data.room }));
      });
      socket.on('deleteRoom', (data: { room: RoomInterface }) => {
        dispatch(deleteRoomReducer({ room: data.room }));
      });

      socket.on('chooseCard', (data: { card: CardInterface }) => {
        dispatch(updateCardReducer({ card: data.card }));
      });
      socket.on('showCards', (data: { vote: VoteInterface }) => {
        dispatch(updateVoteReducer({ vote: data.vote }));
      });

      return () => {
        socket.off('roomJoined');

        socket.off('getOnlineUsers');

        socket.off('createVote');
        socket.off('updateVote');
        socket.off('deleteVote');

        socket.off('joinRoom');
        socket.off('deleteRoom');

        socket.off('chooseCard');
        socket.off('showCards');

        socket.disconnect();
      };
    }
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isSocketReady,
        onlineUsers,
        isLoadingResponse,
        setIsLoadingResponse,
        isLoadingQuestion,
        setIsLoadingQuestion,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
