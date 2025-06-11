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
import { LockKeyhole } from 'lucide-react';
import { verifyOAuthTokenService } from '@/services/token.service';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { oAuthRegisterService } from '@/services/auth.service';

const formSchema = z.object({
  password: z.string().min(6, 'Mot de passe requis'),
  cPassword: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AuthTokenComponent() {
  const params = useParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;

    if (params.token) {
      (async () => {
        const res = await verifyOAuthTokenService(params.token as string);

        if (isMounted) {
          if (res.id) {
            router.push('/room');
          } else {
            if (!res.valid) {
              router.push('/');
            }
          }
        }
      })();
    }

    return () => {
      isMounted = false;
    };
  }, [params.token]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      cPassword: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    const parseRes = formSchema.safeParse(data);

    if (parseRes.success) {
      // API CALL

      if (parseRes.data.password !== parseRes.data.cPassword) {
        form.setError('cPassword', {
          type: 'manual',
          message: 'Les mots de passe ne correspondent pas',
        });
      } else {
        setIsLoading(true);
        const res = await oAuthRegisterService({
          token: params.token as string,
          password: parseRes.data.password,
        });

        console.log('res:', res);

        if (res.id) {
          toast.success('Inscription réussie', {
            description: 'Accès à la plateforme',
          });
          window.location.href = '/room';
        } else {
          router.push('/');
        }
      }
    }
  };

  return (
    <div className="w-full">
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-[26rem] flex flex-col gap-5 p-10 border border-[var(--text-primary-color)]/10 rounded-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <h2 className="text-4xl text-center font-semibold bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 bg-clip-text text-transparent">
                  Créer un nouveau mot de passe
                </h2>

                <div className="flex flex-col gap-3">
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="password"
                          className="text-base text-[var(--text-primary-color)]"
                        >
                          Nouveau mot de passe
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
                              autoFocus
                              required
                            />
                            <i className="absolute left-4 border-r pe-3 text-[var(--text-primary-color)]/70">
                              <LockKeyhole size={20} />
                            </i>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs">
                          {form.formState.errors.password?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="cPassword"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="cPassword"
                          className="text-base text-[var(--text-primary-color)]"
                        >
                          Confirmer mot de passe
                        </FormLabel>
                        <FormControl>
                          <div className="relative flex items-center">
                            <Input
                              id="cPassword"
                              {...field}
                              type="password"
                              autoComplete="off"
                              className="h-12 ps-16 text-[var(--text-primary-color)] border-[var(--text-primary-color)]/25 placeholder:text-[var(--text-tertiary-gray)]"
                              placeholder="***************"
                              required
                            />
                            <i className="absolute left-4 border-r pe-3 text-[var(--text-primary-color)]/70">
                              <LockKeyhole size={20} />
                            </i>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs">
                          {form.formState.errors.cPassword?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>

                <PrimaryButton
                  type="submit"
                  label="Valider"
                  isLoading={isLoading}
                  className="w-full py-2.5 font-semibold"
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
