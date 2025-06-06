'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Popup from '../utils/Popup';
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
import { Mail, PenLine, Plus, Search, Trash, User, X } from 'lucide-react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { UserInterface } from '@/interfaces/user.interface';

const authSchema = z.object({
  name: z.string().trim().min(3, 'Nom requis'),
  email: z.string().trim().min(1, 'Email requis').email('Email invalide'),
});

const roomSchema = z.object({
  name: z.string().trim().min(3, 'Nom requis'),
  members: z.array(
    z.object({
      id: z.number(),
      name: z.string().trim(),
      email: z.string().trim().email(),
    }),
  ),
});

type AuthFormValues = z.infer<typeof authSchema>;
type RoomFormValues = z.infer<typeof roomSchema>;

export default function HomeComponent() {
  const { mode } = useSelector((state: RootState) => state.persistInfos);

  const [showForm, setShowForm] = React.useState(false);
  const [showAdd, setShowAdd] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [users, setUsers] = React.useState<UserInterface[]>([]);

  const authForm = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const roomForm = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: '',
      members: [],
    },
  });

  const onAuthSubmit = async (data: AuthFormValues) => {
    const parseRes = authSchema.safeParse(data);

    if (parseRes.success) {
      // API CALL
      setIsLoading(true);

      setIsLoading(false);
    }
  };

  const onRoomSubmit = async (data: RoomFormValues) => {
    const parseRes = roomSchema.safeParse(data);

    if (parseRes.success) {
      // API CALL
      setIsLoading(true);

      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {showForm && (
        <Popup onClose={() => setShowForm(false)}>
          <div className="w-96 flex flex-col gap-4 p-6">
            <Form {...authForm}>
              <form onSubmit={authForm.handleSubmit(onAuthSubmit)}>
                <div className="flex flex-col gap-6">
                  <h2 className="text-2xl font-semibold bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 bg-clip-text text-transparent">
                    Renseigner vos informations
                  </h2>

                  <div className="flex flex-col gap-3">
                    <FormField
                      name="name"
                      control={authForm.control}
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
                            {authForm.formState.errors.email?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="email"
                      control={authForm.control}
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
                            {authForm.formState.errors.email?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>

                  <PrimaryButton
                    label="Enregistrer"
                    onClick={() => {}}
                    className="w-full py-2.5"
                  />
                </div>
              </form>
            </Form>

            <button className="h-12 flex justify-center items-center gap-2 border border-[var(--text-primary-color)]/10 rounded-md cursor-pointer hover:bg-gray-50">
              <Image src="/google.png" width={25} height={25} alt="G" />
              <span>Continuer avec Google</span>
            </button>
          </div>
        </Popup>
      )}

      <div className="flex-1 flex justify-center">
        <div className="max-w-7xl w-full py-8 flex flex-col gap-8">
          <h1 className="text-4xl font-semibold bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 bg-clip-text text-transparent">
            Vos espaces :
          </h1>

          <div className="flex gap-8 flex-wrap">
            {users.length > 0 ? (
              <Card className="w-full max-w-96">
                <CardHeader>
                  <CardTitle>Noms</CardTitle>
                  <CardDescription>5 Membres</CardDescription>
                  <CardAction className="cursor-pointer text-red-400 hover:text-red-500">
                    <Trash size={18} />
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <p>5 votes effectués</p>
                </CardContent>
                <CardFooter>
                  <div className="w-full flex justify-end">
                    <Link
                      href={'#'}
                      className="text-sm text-[var(--primary-color)] hover:underline underline-offset-2"
                    >
                      Plus de détails
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ) : (
              <Card
                onClick={() => setShowAdd(true)}
                className="w-full max-w-96 h-64 p-0 bg-gray-100 hover:bg-gray-200 cursor-pointer"
              >
                <div className="h-full w-full flex justify-center items-center">
                  <Plus size={40} className="text-gray-400" />
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {showAdd && (
        <Popup onClose={() => setShowAdd(false)}>
          <div className="w-96 flex flex-col gap-4 p-6">
            <Form {...roomForm}>
              <form onSubmit={roomForm.handleSubmit(onRoomSubmit)}>
                <div className="flex flex-col gap-6">
                  <h2 className="text-2xl font-semibold bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 bg-clip-text text-transparent">
                    Renseigner le nom
                  </h2>

                  <div className="flex flex-col gap-3">
                    <FormField
                      name="name"
                      control={roomForm.control}
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
                            {roomForm.formState.errors.name?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="members"
                      control={roomForm.control}
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
                                      autoFocus
                                      required
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
                              <div className="flex items-center gap-2">
                                <div className="flex justify-center items-center gap-1 bg-[var(--primary-color)] text-white rounded-full ps-2 pe-1 py-1">
                                  <p className="text-sm">Name</p>
                                  <p className="h-6 w-6 flex justify-center items-center cursor-pointer hover:bg-white/20 rounded-full">
                                    <X size={16} />
                                  </p>
                                </div>
                              </div>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <PrimaryButton
                    label="Créer"
                    onClick={() => {}}
                    className="w-full py-2.5"
                  />
                </div>
              </form>
            </Form>
          </div>
        </Popup>
      )}
    </div>
  );
}
