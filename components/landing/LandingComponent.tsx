'use client';

import React from 'react';
import LandingHeader from '@/components/landing/LandingHeader';
import Popup from '@/components/utils/Popup';
import LoginForm from '@/components/auth/LoginForm';
import RegisterFom from '@/components/auth/RegisterForm';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';

export default function LandingComponent() {
  const { user } = useSelector((state: RootState) => state.user);

  const router = useRouter();

  const [showAuth, setShowAuth] = React.useState<'login' | 'register' | null>(
    null,
  );

  const handleClick = () => {
    if (!user) {
      setShowAuth('login');
    } else {
      router.push('/room');
    }
  };

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
            <div
              onClick={handleClick}
              className={
                'h-14 flex justify-center items-center gap-2 px-6 text-lg font-semibold tracking-wide text-white bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 rounded-xl cursor-pointer hover:opacity-80'
              }
            >
              <span>Commencer</span>
            </div>
          </div>
        </div>
      </div>

      {showAuth && (
        <Popup onClose={() => setShowAuth(null)}>
          {showAuth === 'login' ? (
            <LoginForm setShowAuth={setShowAuth} />
          ) : (
            <RegisterFom setShowAuth={setShowAuth} />
          )}
        </Popup>
      )}
    </div>
  );
}
