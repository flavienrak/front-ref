'use client';

import React from 'react';
import Link from 'next/link';
import Popup from '@/components/utils/Popup';
import AddVote from '@/components/utils/AddVote';
import DeleteVote from '@/components/utils/DeleteVote';
import PrimaryButton from '@/components/utils/PrimaryButton';

import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Plus, Trash } from 'lucide-react';
import { RootState } from '@/redux/store';
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function RoomComponent() {
  const { room } = useSelector((state: RootState) => state.userRoom);

  const params = useParams();
  const router = useRouter();

  const [showAdd, setShowAdd] = React.useState(false);
  const [redirectLoading, setRedirectLoading] = React.useState<number | null>(
    null,
  );
  const [actualVote, setActualVote] = React.useState<number | null>(null);

  if (room)
    return (
      <div className="w-full">
        <div className="flex justify-center items-center">
          <div className="max-w-7xl w-full py-8 flex gap-8">
            <div className="max-w-7xl w-full py-8 flex flex-col gap-8">
              <h1 className="text-4xl font-semibold bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 bg-clip-text text-transparent">
                Liste des votes :
              </h1>

              <div className="flex gap-8 flex-wrap">
                {room.votes.length > 0 ? (
                  room.votes.map((item) => (
                    <Card
                      key={`vote-${item.id}`}
                      onClick={() => {
                        router.push(`/room/${params.id}/vote/${item.id}`);
                        setRedirectLoading(item.id);
                      }}
                      className="w-96 h-52 flex flex-col justify-between bg-[var(--bg-secondary-color)] border-[var(--primary-color)]/10 transition-[colors,box-shadow] duration-150 hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] customShadow group"
                    >
                      <CardHeader>
                        <CardTitle className="text-[var(--text-primary-color)]">
                          {item.content}
                        </CardTitle>

                        <CardAction
                          onClick={(event) => {
                            event.stopPropagation();
                            setActualVote(item.id);
                          }}
                          className="cursor-pointer text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
                        >
                          <Trash size={18} />
                        </CardAction>
                      </CardHeader>

                      <CardFooter>
                        <div className="w-full flex justify-end">
                          <Link
                            href={`/room/${params.id}/vote/${item.id}`}
                            onClick={() => setRedirectLoading(item.id)}
                            className={`flex justify-center items-center gap-1 px-3 py-1.5 text-sm text-[var(--primary-color)] bg-[var(--primary-color)]/25 underline-offset-1 rounded-sm ${
                              redirectLoading === item.id
                                ? 'opacity-80 pointer-events-none'
                                : 'hover:underline'
                            }`}
                          >
                            {redirectLoading === item.id && (
                              <svg
                                aria-hidden="true"
                                role="status"
                                className="inline w-4 h-4 animate-spin"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="#E5E7EB"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentColor"
                                />
                              </svg>
                            )}
                            <span>Plus de détails</span>
                          </Link>
                        </div>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <Card
                    onClick={() => setShowAdd(true)}
                    className="w-96 h-52 p-0 text-gray-400 bg-[var(--bg-secondary-color)] cursor-pointer border-[var(--primary-color)]/10 transition-[colors,box-shadow] duration-150 hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] customShadow"
                  >
                    <div className="h-full w-full flex justify-center items-center">
                      <Plus size={40} />
                    </div>
                  </Card>
                )}
              </div>

              <div className="w-96 flex items-center gap-3">
                <PrimaryButton
                  onClick={() => setShowAdd(true)}
                  label={'Créer un vote'}
                  className="h-12 flex-1 font-semibold"
                />
              </div>
            </div>
          </div>
        </div>

        {showAdd && (
          <Popup onClose={() => setShowAdd(false)}>
            <AddVote />
          </Popup>
        )}

        {actualVote && (
          <Popup onClose={() => setActualVote(null)}>
            <DeleteVote
              voteId={actualVote}
              onClose={() => setActualVote(null)}
            />
          </Popup>
        )}
      </div>
    );
}
