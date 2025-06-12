'use client';

import React from 'react';
import Link from 'next/link';
import Popup from '@/components/utils/Popup';
import AddSpace from '@/components/utils/AddSpace';
import PrimaryButton from '@/components/utils/PrimaryButton';
import JoinRoom from '@/components/utils/JoinRoom';
import DeleteSpace from '@/components/utils/DeleteSpace';

import { Plus, Share2, Trash } from 'lucide-react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';

export default function UserRoomComponent() {
  const { userRooms } = useSelector((state: RootState) => state.userRoom);

  const router = useRouter();

  const [showAdd, setShowAdd] = React.useState(false);
  const [showJoin, setShowJoin] = React.useState(false);
  const [redirectLoading, setRedirectLoading] = React.useState<number | null>(
    null,
  );
  const [actualUserRoom, setActualUserRoom] = React.useState<number | null>(
    null,
  );

  const handleCopy = async (id: number) => {
    const { origin } = window.location;
    const link = `${origin}/room/${id}`;

    await navigator.clipboard.writeText(link);
    toast.success('Lien copié avec succès');
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex justify-center">
        <div className="max-w-7xl w-full py-8 flex flex-col gap-8">
          <h1 className="text-4xl font-semibold bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 bg-clip-text text-transparent">
            Vos espaces :
          </h1>

          <div className="flex gap-8 flex-wrap">
            {userRooms.length > 0 ? (
              userRooms.map((item) => (
                <Card
                  key={`room-${item.id}`}
                  onClick={() => {
                    router.push(`/room/${item.room.id}`);
                    setRedirectLoading(item.room.id);
                  }}
                  className="w-96 h-52 bg-[var(--bg-secondary-color)] border-[var(--primary-color)]/10 transition-[colors,box-shadow] duration-150 hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] customShadow group"
                >
                  <CardHeader>
                    <CardTitle className="text-[var(--text-primary-color)]">
                      {item.room.name}
                    </CardTitle>
                    <CardDescription className="text-[var(--primary-color)]">
                      {item.room.userRooms.length} Membres
                    </CardDescription>
                    <CardAction
                      onClick={(event) => {
                        event.stopPropagation();
                        setActualUserRoom(item.room.id);
                      }}
                      className="cursor-pointer text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
                    >
                      <Trash size={18} />
                    </CardAction>
                  </CardHeader>
                  <CardContent className="text-[var(--text-secondary-gray)] font-semibold">
                    <p className="flex px-4 py-2 bg-[var(--bg-tertiary-color)] rounded-sm">
                      {item.room.votes.length > 0
                        ? item.room.votes.length
                        : 'Aucun'}{' '}
                      vote{item.room.votes.length > 1 ? 's' : ''} créé
                      {item.room.votes.length > 1 ? 's' : ''}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full flex justify-between">
                      <Tooltip>
                        <TooltipTrigger
                          onClick={(event) => {
                            event.stopPropagation();
                            handleCopy(item.room.id);
                          }}
                        >
                          <i className="h-8 w-8 flex items-center justify-center text-[var(--primary-color)] bg-[var(--primary-color)]/10 rounded-full hover:bg-[var(--primary-color)]/25 cursor-pointer">
                            <Share2 size={16} className="-translate-x-[1px]" />
                          </i>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Partager</p>
                        </TooltipContent>
                      </Tooltip>
                      <Link
                        href={`/room/${item.room.id}`}
                        onClick={() => setRedirectLoading(item.room.id)}
                        className={`flex justify-center items-center gap-1 text-sm text-[var(--primary-color)] underline-offset-1 rounded-sm ${
                          redirectLoading === item.room.id
                            ? 'opacity-80 pointer-events-none'
                            : 'hover:underline'
                        }`}
                      >
                        {redirectLoading === item.room.id && (
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
            <button
              onClick={() => setShowAdd(true)}
              className="h-10 flex-1 flex justify-center items-center px-4 text-sm text-[var(--primary-color)] border border-[var(--primary-color)] rounded-md cursor-pointer hover:bg-[var(--primary-color)]/10"
            >
              Créer un espace
            </button>

            <PrimaryButton
              onClick={() => setShowJoin(true)}
              label={'Rejoindre'}
              className="h-10 flex-1"
            />
          </div>
        </div>
      </div>

      {showAdd && (
        <Popup onClose={() => setShowAdd(false)}>
          <AddSpace />
        </Popup>
      )}

      {showJoin && (
        <Popup onClose={() => setShowJoin(false)}>
          <JoinRoom />
        </Popup>
      )}

      {actualUserRoom && (
        <Popup onClose={() => setActualUserRoom(null)}>
          <DeleteSpace
            roomId={actualUserRoom}
            onClose={() => setActualUserRoom(null)}
          />
        </Popup>
      )}
    </div>
  );
}
