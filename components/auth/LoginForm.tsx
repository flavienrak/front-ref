'use client';

import React from 'react';
import Image from 'next/image';
import qs from 'query-string';
import PrimaryButton from '../utils/PrimaryButton';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Mail, User } from 'lucide-react';
import { loginService } from '@/services/auth.service';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().trim().min(1, 'Email requis').email('Email invalide'),
  password: z.string().min(6, 'Mot de passe requis'),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm({
  setShowAuth,
}: {
  setShowAuth: (value: 'login' | 'register') => void;
}) {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    const parseRes = formSchema.safeParse(data);

    if (parseRes.success) {
      // API CALL
      setIsLoading(true);

      const res = await loginService({
        email: parseRes.data.email,
        password: parseRes.data.password,
      });

      if (res.userNotFound) {
        form.setError('email', { type: 'manual', message: 'Email inconnu' });
        setIsLoading(false);
      } else if (res.incorrectPassword) {
        form.setError('password', {
          type: 'manual',
          message: 'Mot de passe incorrect',
        });
        setIsLoading(false);
      } else {
        toast.success('Connexion réussie', { description: 'Accès à la page' });
        window.location.href = '/room';
      }
    }
  };

  const connectWithGoogle = async () => {
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/api/google`, '_self');
  };

  return (
    <div className="w-96 flex flex-col gap-5 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl text-center font-semibold bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 bg-clip-text text-transparent">
              Se connecter
            </h2>

            <div className="flex flex-col gap-3">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="email"
                      className="text-base text-[var(--text-primary-color)]"
                    >
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          id="email"
                          {...field}
                          autoComplete="off"
                          className="h-12 ps-16 text-[var(--text-primary-color)] border-[var(--text-primary-color)]/25 placeholder:text-[var(--text-tertiary-gray)]"
                          placeholder="xyz@domain.com"
                          autoFocus
                          required
                        />
                        <i className="absolute left-4 border-r pe-3 text-[var(--text-primary-color)]/70">
                          <Mail size={20} />
                        </i>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs">
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="password"
                      className="text-base text-[var(--text-primary-color)]"
                    >
                      Mot de passe
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          id="password"
                          {...field}
                          type="password"
                          autoComplete="off"
                          className="h-12 ps-16 text-[var(--text-primary-color)] border-[var(--text-primary-color)]/25 placeholder:text-[var(--text-tertiary-gray)]"
                          placeholder="***************"
                          required
                        />
                        <i className="absolute left-4 border-r pe-3 text-[var(--text-primary-color)]/70">
                          <User size={20} />
                        </i>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs">
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <PrimaryButton
              type="submit"
              label="Connexion"
              isLoading={isLoading}
              className="w-full py-2.5"
            />
          </div>
        </form>
      </Form>

      <button
        onClick={connectWithGoogle}
        className="h-12 flex justify-center items-center gap-2 border border-[var(--text-primary-color)]/10 rounded-md cursor-pointer hover:bg-[var(--bg-primary-color)]"
      >
        <Image src="/google.png" width={25} height={25} alt="G" />
        <span>Continuer avec Google</span>
      </button>

      <label className="text-sm text-center">
        N'as pas encore de compte ?{' '}
        <span
          onClick={() => setShowAuth('register')}
          className="text-[var(--primary-color)] cursor-pointer hover:underline"
        >
          S'inscrire
        </span>
      </label>
    </div>
  );
}
