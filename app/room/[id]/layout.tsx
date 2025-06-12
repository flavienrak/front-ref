'use client';

import React from 'react';

import { useParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getRoomService, getVoteService } from '@/services/room.service';
import { setRoomReducer, setVoteReducer } from '@/redux/slices/room.slice';

export default function RoomIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    let isMounted = true;

    if (isNaN(Number(params.id))) {
      router.push('/room');
    } else {
      (async () => {
        const res = await getRoomService(Number(params.id));

        if (isMounted) {
          if (res.room) {
            dispatch(setRoomReducer({ room: res.room }));
          } else {
            router.push('/room');
          }
        }
      })();
    }

    return () => {
      isMounted = false;
    };
  }, [params.id]);

  React.useEffect(() => {
    let isMounted = true;

    if (params.voteId) {
      if (isNaN(Number(params.voteId))) {
        router.push(`/room/${params.id}`);
      } else {
        (async () => {
          const res = await getVoteService({
            roomId: Number(params.id),
            voteId: Number(params.voteId),
          });

          if (isMounted) {
            if (res.vote) {
              dispatch(setVoteReducer({ vote: res.vote }));
            }
          }
        })();
      }
    }

    return () => {
      isMounted = false;
    };
  }, [params.voteId]);

  return <div className="w-full">{children}</div>;
}
