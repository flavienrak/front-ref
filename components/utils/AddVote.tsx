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
import { PenLine, SquareM, SquareMinus, SquarePlus } from 'lucide-react';
import { createVoteService } from '@/services/room.service';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { addVoteReducer } from '@/redux/slices/room.slice';
import { useDispatch } from 'react-redux';

const formSchema = z.object({
  content: z.string().trim().min(3, 'Sujet requis'),
  min: z.union([z.number().min(0), z.literal('')]),
  max: z.union([z.number().min(0), z.literal('')]),
  mid: z.union([z.number().min(0), z.literal('')]),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddVote() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      max: 5,
      min: 1,
      mid: 1,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const parseRes = formSchema.safeParse(data);

    if (parseRes.success && params.id) {
      if (isNaN(Number(parseRes.data.max))) {
        form.setError('max', {
          type: 'manual',
          message: 'Nombre maximale requis',
        });
      } else if (
        isNaN(Number(parseRes.data.min)) ||
        Number(parseRes.data.min) < 1
      ) {
        form.setError('min', {
          type: 'manual',
          message: 'Nombre minimale requis',
        });
      } else if (
        isNaN(Number(parseRes.data.mid)) ||
        Number(parseRes.data.mid) < 1
      ) {
        form.setError('mid', {
          type: 'manual',
          message: 'Intervalle de vote requis',
        });
      } else {
        // API CALL
        setIsLoading(true);

        const res = await createVoteService({
          id: Number(params.id),
          content: parseRes.data.content,
          max: Number(parseRes.data.max),
          min: Number(parseRes.data.min),
          mid: Number(parseRes.data.mid),
        });

        if (res.vote) {
          toast.success('Vote créé avec succès');
          dispatch(addVoteReducer({ vote: res.vote }));
          router.push(`/room/${params.id}/vote/${res.vote.id}`);
        }
      }
    }
  };

  return (
    <div className="w-96 flex flex-col gap-4 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 bg-clip-text text-transparent">
              Créer un vote
            </h2>

            <div className="flex flex-col gap-3">
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="content"
                      className="text-base text-[var(--text-primary-color)]"
                    >
                      Sujet
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          id="content"
                          {...field}
                          autoComplete="off"
                          className="h-12 ps-16 text-[var(--text-primary-color)] border-[var(--text-primary-color)]/25 placeholder:text-[var(--text-tertiary-gray)]"
                          placeholder="Vote..."
                          autoFocus
                          required
                        />
                        <i className="absolute left-4 border-r pe-3 text-[var(--text-primary-color)]/70">
                          <PenLine size={20} />
                        </i>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs">
                      {form.formState.errors.content?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                name="max"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="max"
                      className="text-base text-[var(--text-primary-color)]"
                    >
                      Nombre maximale
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          {...field}
                          type="number"
                          onChange={(event) => {
                            const value = event.target.value;
                            if (value && !isNaN(Number(value))) {
                              field.onChange(Number(value));
                            } else if (value === '') {
                              field.onChange(value);
                            }
                          }}
                          id="max"
                          autoComplete="off"
                          className="h-12 ps-16 text-[var(--text-primary-color)] border-[var(--text-primary-color)]/25 placeholder:text-[var(--text-tertiary-gray)]"
                          placeholder="Nombre maximale"
                        />
                        <i className="absolute left-4 border-r pe-3 text-[var(--text-primary-color)]/70">
                          <SquarePlus size={20} />
                        </i>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="min"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="min"
                      className="text-base text-[var(--text-primary-color)]"
                    >
                      Nombre minimale
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          {...field}
                          type="number"
                          onChange={(event) => {
                            const value = event.target.value;
                            if (value && !isNaN(Number(value))) {
                              field.onChange(Number(value));
                            } else if (value === '') {
                              field.onChange(value);
                            }
                          }}
                          id="min"
                          min={1}
                          autoComplete="off"
                          className="h-12 ps-16 text-[var(--text-primary-color)] border-[var(--text-primary-color)]/25 placeholder:text-[var(--text-tertiary-gray)]"
                          placeholder="Nombre minimale"
                        />
                        <i className="absolute left-4 border-r pe-3 text-[var(--text-primary-color)]/70">
                          <SquareMinus size={20} />
                        </i>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="mid"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="mid"
                      className="text-base text-[var(--text-primary-color)]"
                    >
                      Intervalle de vote
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          {...field}
                          type="number"
                          onChange={(event) => {
                            const value = event.target.value;
                            if (value && !isNaN(Number(value))) {
                              field.onChange(Number(value));
                            } else if (value === '') {
                              field.onChange(value);
                            }
                          }}
                          id="mid"
                          min={1}
                          autoComplete="off"
                          className="h-12 ps-16 text-[var(--text-primary-color)] border-[var(--text-primary-color)]/25 placeholder:text-[var(--text-tertiary-gray)]"
                          placeholder="Intervalle de vote"
                        />
                        <i className="absolute left-4 border-r pe-3 text-[var(--text-primary-color)]/70">
                          <SquareM size={20} />
                        </i>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <PrimaryButton
              type="submit"
              label="Ajouter"
              isLoading={isLoading}
              className="w-full font-semibold tracking-wide py-2.5"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
