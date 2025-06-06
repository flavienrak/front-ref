'use client';

import React from 'react';
import Link from 'next/link';
import LandingHeader from '@/components/landing/LandingHeader';

export default function LandingComponent() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      <LandingHeader />
      <div className="flex flex-col flex-1 justify-center items-center pt-16">
        <div className="max-w-3xl flex flex-col gap-12">
          <h2 className="text-6xl text-center font-semibold leading-14 bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 bg-clip-text text-transparent">
            Organiser des votes ?<br />
            Vous êtes au bon endroit
          </h2>
          <p className="text-xl text-center">
            Renseigner votre email et découvrez les fonctionnalités qu'on offre.
            <br />A tout de suite.
          </p>
          <div className="flex justify-center">
            <Link
              href="/home"
              className="w-40 flex justify-center items-center py-3 px-6 text-lg font-semibold tracking-wide text-white bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 rounded-xl cursor-pointer hover:opacity-80"
            >
              Découvrir
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
