import React from 'react';

import { CardInterface } from '@/interfaces/card.interface';
import { CheckCheck, Clock, CupSoda } from 'lucide-react';

export default function UserCard({ card }: { card?: CardInterface }) {
  return (
    <div
      className={`h-20 w-20 flex justify-center items-center rounded-md shadow-xl ${
        card
          ? 'text-white bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 '
          : 'bg-[var(--bg-secondary-color)] text-[var(--text-primary-color)]'
      }`}
    >
      {card ? (
        card.value ? (
          card.value === 'coffee' ? (
            <CupSoda size={22} />
          ) : (
            <span className="text-xl font-semibold">{card.value}</span>
          )
        ) : (
          <CheckCheck size={22} />
        )
      ) : (
        <Clock size={22} />
      )}
    </div>
  );
}
