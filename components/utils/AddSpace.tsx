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
import { PenLine, Search, X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { UserInterface } from '@/interfaces/user.interface';
import { createRoomService } from '@/services/room.service';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { addRoomReducer } from '@/redux/slices/room.slice';

const formSchema = z.object({
  name: z.string().trim().min(3, 'Nom requis'),
  members: z.array(
    z.object({
      id: z.number(),
      name: z.string().trim(),
      email: z.string().trim().email(),
    }),
  ),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddSpace() {
  const { mode } = useSelector((state: RootState) => state.persistInfos);

  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(false);
  const [users, setUsers] = React.useState<UserInterface[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      members: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    const parseRes = formSchema.safeParse(data);

    if (parseRes.success) {
      // API CALL
      setIsLoading(true);

      const res = await createRoomService(parseRes.data.name);

      if (res.roomAlreadyExist) {
        form.setError('name', { type: 'manual', message: 'Nom déjà pris' });
        setIsLoading(false);
      } else if (res.userRoom) {
        toast.success('Espace créé avec succès');
        dispatch(addRoomReducer({ userRoom: res.userRoom }));
        router.push(`/room/${res.userRoom.room.id}`);
      }
    }
  };

  return (
    <div className="w-96 flex flex-col gap-4 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 bg-clip-text text-transparent">
              Renseigner le nom
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
                      Nom de l'espace
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          id="name"
                          {...field}
                          autoComplete="off"
                          className="h-12 ps-16 text-[var(--text-primary-color)] border-[var(--text-primary-color)]/25 placeholder:text-[var(--text-tertiary-gray)]"
                          placeholder="Espace..."
                          autoFocus
                          required
                        />
                        <i className="absolute left-4 border-r pe-3 text-[var(--text-primary-color)]/70">
                          <PenLine size={20} />
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
                name="members"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="members"
                      className="text-base text-[var(--text-primary-color)]"
                    >
                      Ajouter des membres
                    </FormLabel>

                    <FormControl>
                      <div className="relative flex flex-col gap-4">
                        <Popover open={users.length > 0}>
                          <PopoverTrigger asChild>
                            <div className="flex items-center">
                              <Input
                                autoComplete="off"
                                className="h-12 ps-16 text-[var(--text-primary-color)] border-[var(--text-primary-color)]/25 placeholder:text-[var(--text-tertiary-gray)]"
                                placeholder="Rechercher..."
                              />
                              <i className="absolute left-4 border-r pe-3 text-[var(--text-primary-color)]/70">
                                <Search size={20} />
                              </i>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent
                            asChild
                            align="start"
                            className="z-100"
                          >
                            <div className="w-[21rem]">
                              {users.map((u) => (
                                <div
                                  key={`domain-${u.id}`}
                                  className={`h-8 ${
                                    field.value
                                      .map((item) => item.id)
                                      .includes(u.id)
                                      ? `${
                                          mode === 'light'
                                            ? '!text-[var(--r-primary-color)] [&_svg]:!text-[var(--r-primary-color)] !bg-accent'
                                            : '!text-white [&_svg]:!text-white !bg-cyan-700'
                                        }`
                                      : `!text-[var(--text-primary-color)] hover:!text-[var(--r-primary-color)] !bg-transparent ${
                                          mode === 'light'
                                            ? 'hover:!bg-accent'
                                            : '!text-white hover:!bg-cyan-700/25'
                                        }`
                                  }`}
                                >
                                  {u.name}
                                </div>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                        {users.length > 0 && (
                          <div className="flex items-center gap-2">
                            {users.map((u) => (
                              <div
                                key={`user-select-${u.id}`}
                                className="flex justify-center items-center gap-1 bg-[var(--primary-color)] text-white rounded-full ps-2 pe-1 py-1"
                              >
                                <p className="text-sm">{u.name}</p>
                                <p className="h-6 w-6 flex justify-center items-center cursor-pointer hover:bg-white/20 rounded-full">
                                  <X size={16} />
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <PrimaryButton
              type="submit"
              label="Créer"
              isLoading={isLoading}
              className="w-full py-2.5"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
