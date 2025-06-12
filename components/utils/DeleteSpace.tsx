'use client';

import React from 'react';

import { useDispatch } from 'react-redux';
import { deleteRoomService } from '@/services/room.service';
import { deleteRoomReducer } from '@/redux/slices/room.slice';
import { toast } from 'sonner';

export default function DeleteSpace({
  roomId,
  onClose,
}: {
  roomId: number;
  onClose: () => void;
}) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const res = await deleteRoomService(roomId);

    if (res.room) {
      toast.success('Espace supprimé avec succès');
      dispatch(deleteRoomReducer({ room: res.room }));
      onClose();
    }
  };

  return (
    <div className="w-96 flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-semibold bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 bg-clip-text text-transparent">
        Supprimer l'espace
      </h2>
      <p className="text-[var(--text-primary-color)]">
        Êtes-vous sûr de vouloir supprimer cet espace ? Cette action est
        irréversible et supprimera toutes les données associées à cet espace.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={onClose}
          className="flex-1 h-12 font-semibold text-[var(--text-primary-color)] bg-[var(--bg-primary-color)] rounded-full cursor-pointer hover:opacity-80"
        >
          Annuler
        </button>
        <button
          onClick={handleDelete}
          className={`flex-1 h-12 flex justify-center items-center gap-2 font-semibold text-white bg-red-500 rounded-full ${
            isLoading
              ? 'opacity-80 pointer-events-none'
              : 'cursor-pointer hover:opacity-80'
          }`}
        >
          {isLoading && (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-5 h-5 animate-spin"
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
          <span>Supprimer</span>
        </button>
      </div>
    </div>
  );
}
