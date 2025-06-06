'use client';

import React from 'react';

import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { UserInterface } from '@/interfaces/user.interface';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Input } from '@/components/ui/input';
import PrimaryButton from '@/components/utils/PrimaryButton';
import { Check, CupSoda } from 'lucide-react';

export default function RoomComponent() {
  const { mode } = useSelector((state: RootState) => state.persistInfos);

  const params = useParams();
  const router = useRouter();

  const [users, setUsers] = React.useState<UserInterface[]>([]);

  React.useEffect(() => {
    if (isNaN(Number(params.id))) {
      router.push('/home');
    } else {
      (async () => {})();
    }
  }, [params]);

  return (
    <div className="w-full">
      <div className="flex justify-center items-center">
        <div className="max-w-7xl w-full py-8 flex gap-8">
          <div className="w-48 flex flex-col gap-12">
            <div className="flex flex-col gap-8">
              <h2 className="text-4xl font-semibold bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 bg-clip-text text-transparent">
                Options :
              </h2>

              <div className="flex flex-col gap-3">
                <Input
                  type="number"
                  placeholder="Nombre maximale"
                  className="h-10"
                />
                <Input
                  type="number"
                  placeholder="Intervalle"
                  className="h-10"
                />

                <PrimaryButton
                  onClick={() => {}}
                  label="Modifier"
                  className="w-full h-10"
                />
              </div>
              <hr />
              <button className="w-full h-10 text-[var(--primary-color)] border border-[var(--primary-color)] hover:bg-[var(--primary-color)]/10 rounded-md cursor-pointer">
                Créer un vote
              </button>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="max-w-4xl flex flex-col justify-between items-center gap-8">
              <h2 className="font-semibold pl-4 py-2 border-l-4 border-[var(--primary-color)]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente id eos aliquid architecto aperiam harum alias ullam
                magni mollitia? Enim repudiandae quia, debitis necessitatibus
                labore et provident deleniti dolorem quas.
              </h2>

              <div className="flex-1 w-full flex flex-col py-16 px-8 items-center gap-8 bg-gray-100 rounded-md">
                <div className="w-full flex justify-center gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <p className="font-semibold text-lg">User 1</p>
                    <div className="flex justify-center items-center bg-[var(--primary-color)]/25 h-20 w-20 border border-gray-50 rounded-md">
                      <Check size={22} />
                    </div>
                  </div>
                </div>

                <button className="flex justify-center items-center text-white bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 px-6 py-2 rounded-md cursor-pointer hover:opacity-80">
                  Afficher les résultats
                </button>

                <div className="flex justify-center">
                  <Carousel className="w-full max-w-xl">
                    <CarouselContent className="-ml-1 me-4 flex justify-between">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem
                          key={index}
                          className="pl-1 basis-1/6 cursor-pointer"
                        >
                          <div className="p-1">
                            <Card className="h-20 w-20 p-0 rounded-md hover:bg-gray-100 hover:text-[var(--primary-color)]">
                              <CardContent className="flex aspect-square items-center justify-center">
                                <span className="text-2xl font-semibold select-none">
                                  {index + 1}
                                </span>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}

                      <CarouselItem className="pl-1 basis-1/6 cursor-pointer">
                        <div className="p-1">
                          <Card className="h-20 w-20 p-0 rounded-md hover:bg-gray-100 hover:text-[var(--primary-color)]">
                            <CardContent className="flex aspect-square items-center justify-center">
                              <span className="text-2xl font-semibold select-none">
                                <CupSoda />
                              </span>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
