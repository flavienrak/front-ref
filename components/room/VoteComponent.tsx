'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Popup from '@/components/utils/Popup';
import EditVote from '@/components/utils/EditVote';
import PrimaryButton from '@/components/utils/PrimaryButton';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ArrowLeft, CheckCheck, CupSoda, Pen } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { chooseCardService } from '@/services/room.service';
import { RootState } from '@/redux/store';
import { updateCardReducer } from '@/redux/slices/room.slice';

export default function VoteComponent() {
  const { user } = useSelector((state: RootState) => state.user);
  const { vote, room } = useSelector((state: RootState) => state.userRoom);

  const params = useParams();
  const dispatch = useDispatch();

  const [showEdit, setShowEdit] = React.useState(false);

  const getNumberList = (data: {
    min: number;
    max: number;
    mid: number;
  }): number[] => {
    const result: number[] = [];
    for (let i = data.min; i <= data.max; i += data.mid) {
      result.push(i);
    }
    return result;
  };

  const lists = vote
    ? getNumberList({
        max: vote.max,
        min: vote.min,
        mid: vote.mid,
      })
    : [];

  const handleChooseCard = async (value: string | number) => {
    if (params.id && params.voteId) {
      const res = await chooseCardService({
        roomId: Number(params.id),
        voteId: Number(params.voteId),
        value,
      });

      if (res.card) {
        dispatch(updateCardReducer({ card: res.card }));
      }
    }
  };

  const getCard = () => {
    if (user) {
      return vote?.cards.find((c) => c.userId === user.id);
    }
    return null;
  };

  const mineCard = getCard();

  if (vote && room)
    return (
      <div className="w-full">
        <div className="flex-1 flex justify-center">
          <div className="max-w-7xl w-full flex flex-col justify-between items-center gap-8 py-8">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href={`/room/${params.id}`}
                  className="h-10 w-10 flex justify-center items-center text-white bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 rounded-full hover:opacity-80 cursor-pointer"
                >
                  <ArrowLeft />
                </Link>
                <h2 className="text-xl text-[var(--text-primary-color)] font-semibold">
                  {vote.content}
                </h2>
              </div>
              <PrimaryButton
                onClick={() => setShowEdit(true)}
                label="Editer"
                className="h-10 w-36"
              >
                <i>
                  <Pen size={16} />
                </i>
              </PrimaryButton>
            </div>

            <div className="flex-1 w-full flex flex-col py-16 px-8 items-center gap-8 bg-[var(--bg-tertiary-color)] rounded-md">
              <div className="w-full flex justify-center gap-8">
                {room?.userRooms.map((u) => (
                  <div
                    key={`user-${u.id}`}
                    className="flex flex-col items-center gap-2"
                  >
                    <p className="font-semibold text-lg text-[var(--text-primary-color)]">
                      {u.user.name}
                    </p>
                    <div className="flex justify-center items-center text-white bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 h-20 w-20 border border-[var(--text-primary-color)]/10 rounded-md">
                      <CheckCheck size={22} />
                    </div>
                  </div>
                ))}
              </div>

              <button className="flex justify-center items-center text-white bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 px-6 py-2 rounded-md cursor-pointer hover:opacity-80">
                Afficher les résultats
              </button>

              <div className="flex justify-center">
                <Carousel className="w-full max-w-xl">
                  <CarouselContent className="-ml-1 flex">
                    {lists.map((item) => (
                      <CarouselItem
                        key={`card-${item}`}
                        className={clsx(
                          'pl-1 cursor-pointer',
                          lists.length < 6
                            ? `basis-1/${lists.length}`
                            : 'basis-1/6',
                        )}
                        onClick={() => handleChooseCard(item)}
                      >
                        <div className="p-1">
                          <Card
                            className={`h-20 w-20 p-0 rounded-md text-[var(--text-primary-color)] ${
                              mineCard && Number(mineCard.value) === item
                                ? 'bg-[var(--primary-color)] border-[var(--primary-color)]/10 text-white'
                                : 'bg-[var(--bg-secondary-color)] border-[var(--primary-color)]/10 hover:text-[var(--primary-color)] hover:border-[var(--primary-color)]/25'
                            }`}
                          >
                            <CardContent className="flex aspect-square items-center justify-center">
                              <span className="text-2xl font-semibold select-none">
                                {item}
                              </span>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}

                    <CarouselItem
                      className={clsx(
                        'pl-1 cursor-pointer',
                        lists.length < 6
                          ? `basis-1/${lists.length}`
                          : 'basis-1/6',
                      )}
                      onClick={() => handleChooseCard('coffee')}
                    >
                      <div className="p-1">
                        <Card
                          className={`h-20 w-20 p-0 rounded-md text-[var(--text-primary-color)] ${
                            mineCard && mineCard.value === 'coffee'
                              ? 'bg-[var(--primary-color)] border-[var(--primary-color)]/10 text-white'
                              : 'bg-[var(--bg-secondary-color)] border-[var(--primary-color)]/10 hover:text-[var(--primary-color)] hover:border-[var(--primary-color)]/25'
                          }`}
                        >
                          {' '}
                          <CardContent className="flex aspect-square items-center justify-center">
                            <span className="text-2xl font-semibold select-none">
                              <CupSoda />
                            </span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </div>
        </div>

        {showEdit && (
          <Popup onClose={() => setShowEdit(false)}>
            <EditVote onClose={() => setShowEdit(false)} />
          </Popup>
        )}
      </div>
    );
}
