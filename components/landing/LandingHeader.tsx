'use client';

import React from 'react';
import Link from 'next/link';
import PrimaryButton from '../utils/PrimaryButton';

import { SquareKanban } from 'lucide-react';

export default function LandingHeader() {
  return (
    <div className="fixed top-0 left-0 right-0 w-full h-16 flex justify-center bg-[var(--secondary-color)] border-b border-[var(--text-primary-color)]/10">
      <div className="w-full max-w-7xl flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1 text-[var(--primary-color)]"
        >
          <SquareKanban />
          <h1 className="text-2xl font-semibold">Card</h1>
        </Link>
        <div className="flex items-center gap-3">
          <div className="h-10 flex justify-center items-center px-4 text-sm text-[var(--primary-color)] border border-[var(--primary-color)] rounded-md cursor-pointer hover:bg-[var(--primary-color)]/10">
            Créer un espace
          </div>

          <PrimaryButton
            onClick={() => {}}
            label={'Rejoindre'}
            className="h-10 w-max"
          />
        </div>
      </div>
    </div>
  );
}
