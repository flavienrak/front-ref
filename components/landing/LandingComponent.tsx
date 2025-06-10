'use client';

import React from 'react';
import qs from 'query-string';
import LandingHeader from '@/components/landing/LandingHeader';
import Popup from '@/components/utils/Popup';
import LoginForm from '@/components/auth/LoginForm';
import RegisterFom from '@/components/auth/RegisterForm';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { googleService } from '@/services/auth.service';
import { toast } from 'sonner';

export default function LandingComponent() {
  const { user } = useSelector((state: RootState) => state.user);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showAuth, setShowAuth] = React.useState<'login' | 'register' | null>(
    null,
  );
  const [redirect, setRedirect] = React.useState(false);
  const [credentials, setCredentials] = React.useState({
    name: '',
    email: '',
    profile: '',
  });

  React.useEffect(() => {
    let isMounted = true;

    const currentQuery = qs.parse(searchParams.toString());

    if (currentQuery.googleAuth) {
      (async () => {
        if (typeof currentQuery.googleAuth === 'string') {
          // const res = await googleService(currentQuery.googleAuth);

          if (isMounted) {
            // if (res.userNotFound) {
            //   setCredentials({
            //     name: res.name,
            //     email: res.email,
            //     profile: res.profile,
            //   });
            // } else {
            //   // window.location.href = '/room';
            // }
            toast.warning('Adresse email non enregistré', {
              description: 'Veuillez vous inscrire',
            });
            setCredentials({
              name: 'email',
              email: 'email',
              profile: 'email',
            });
            setShowAuth('register');

            delete currentQuery.googleAuth;
            const url = qs.stringifyUrl({ url: pathname, query: currentQuery });
            router.push(url);
          }
        }
      })();
    }

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

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
              className={`h-14 flex justify-center items-center gap-2 px-6 text-lg font-semibold tracking-wide text-white bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 rounded-xl ${
                redirect
                  ? 'pointer-events-none opacity-80'
                  : 'cursor-pointer hover:opacity-80 '
              }`}
            >
              {redirect && (
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
            <RegisterFom setShowAuth={setShowAuth} credentials={credentials} />
          )}
        </Popup>
      )}
    </div>
  );
}
