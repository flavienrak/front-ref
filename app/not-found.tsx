import React from 'react';
import Link from 'next/link';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Not Found',
  description: '404 - Not Found',
};

export default function NotFound() {
  return (
    <div>
      <section className="min-h-screen min-w-screen flex items-center justify-center text-[var(--text-primary-color)] [background-image:var(--bg-primary)]">
        <div className="container flex flex-col items-center px-4">
          <div className="max-w-[24rem] text-center">
            <h2 className="text-style bg-clip-text text-[var(--bg-secondary-color)] font-bold text-[6rem] sm:text-[12rem] select-none bg-style">
              404
            </h2>
            <div className="flex flex-col gap-8">
              <p className="text-2xl sm:text-4xl font-semibold bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 bg-clip-text text-transparent">
                Ooops!, Nous n'avons pas trouvé la page.
              </p>
              <p>Pour revenir à la page d'accueil, cliquer sur ce bouton.</p>
              <Link
                href="/"
                className="flex justify-center gap-4 py-3 sm:py-4 rounded-lg text-white bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 transition-opacity duration-150 hover:opacity-80"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 sm:h-7 sm:w-7"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                <span className="font-semibold text-base sm:text-lg">
                  Accueil
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
