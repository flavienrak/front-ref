'use client';

import React from 'react';
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
import { registerService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().trim().min(3, 'Nom requis'),
  email: z.string().trim().min(1, 'Email requis').email('Email invalide'),
  password: z.string().min(6, 'Mot de passe requis'),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegisterFom({
  credentials,
  setShowAuth,
}: {
  credentials?: { name: string; email: string; profile: string };
  setShowAuth: (value: 'login' | 'register') => void;
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: credentials?.name ?? '',
      email: credentials?.email ?? '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    const parseRes = formSchema.safeParse(data);

    if (parseRes.success) {
      // API CALL
      setIsLoading(true);

      const res = await registerService({
        name: parseRes.data.name,
        email: parseRes.data.email,
        password: parseRes.data.password,
        profile: credentials?.profile,
      });

      if (res.userAlreadyExist) {
        form.setError('email', {
          type: 'manual',
          message: 'Email déjà enregistré',
        });
        setIsLoading(false);
      } else if (res.token) {
        toast.success('Inscription réussie', {
          description: "Vérification de l'email",
        });
        router.push(`/mail/verification/${res.token}`);
      }
    }
  };

  return (
    <div className="w-96 flex flex-col gap-5 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl text-center font-semibold bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 bg-clip-text text-transparent">
              S'inscrire
            </h2>

            <div className="flex flex-col gap-3">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="name"
                      className="text-base text-[var(--text-primary-color)]"
                    >
                      Nom
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          id="name"
                          {...field}
                          autoComplete="off"
                          className="h-12 ps-16 text-[var(--text-primary-color)] border-[var(--text-primary-color)]/25 placeholder:text-[var(--text-tertiary-gray)]"
                          placeholder="Votre nom"
                          autoFocus
                          required
                        />
                        <i className="absolute left-4 border-r pe-3 text-[var(--text-primary-color)]/70">
                          <User size={20} />
                        </i>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs">
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

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
              label="Inscription"
              isLoading={isLoading}
              className="w-full py-2.5"
            />
          </div>
        </form>
      </Form>

      <label className="text-sm text-center">
        A déjà un compte ?{' '}
        <span
          onClick={() => setShowAuth('login')}
          className="text-[var(--primary-color)] cursor-pointer hover:underline"
        >
          Se connecter
        </span>
      </label>
    </div>
  );
}
