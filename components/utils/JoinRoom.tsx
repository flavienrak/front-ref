'use client';

import React from 'react';
import PrimaryButton from './PrimaryButton';

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
import { LinkIcon } from 'lucide-react';
import { protocol } from '@/providers/User.provider';

const formSchema = z.object({
  link: z
    .string()
    .trim()
    .url('Lien invalide')
    .refine(
      (val) => {
        try {
          const url = new URL(val);
          return (
            url.protocol === `${protocol}:` &&
            /^\/room\/\d+$/.test(url.pathname)
          );
        } catch (e) {
          return false;
        }
      },
      {
        message: `Lien invalide`,
      },
    ),
});

type FormValues = z.infer<typeof formSchema>;

export default function JoinRoom() {
  const [isLoading, setIsLoading] = React.useState(false);

  const roomForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    const parseRes = formSchema.safeParse(data);

    if (parseRes.success) {
      // API CALL
      setIsLoading(true);

      window.open(parseRes.data.link, '_self');
    }
  };

  return (
    <div className="w-96 flex flex-col gap-4 p-6">
      <Form {...roomForm}>
        <form onSubmit={roomForm.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 bg-clip-text text-transparent">
              Rejoindre un espace
            </h2>

            <div className="flex flex-col gap-3">
              <FormField
                name="link"
                control={roomForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="link"
                      className="text-base text-[var(--text-primary-color)]"
                    >
                      Ajouter le lien
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          id="link"
                          {...field}
                          autoComplete="off"
                          className="h-12 ps-16 text-[var(--text-primary-color)] border-[var(--text-primary-color)]/25 placeholder:text-[var(--text-tertiary-gray)]"
                          placeholder="http://..."
                          autoFocus
                          required
                        />
                        <i className="absolute left-4 border-r pe-3 text-[var(--text-primary-color)]/70">
                          <LinkIcon size={20} />
                        </i>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs">
                      {roomForm.formState.errors.link?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <PrimaryButton
              type="submit"
              label="Valider"
              className="w-full py-2.5"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
