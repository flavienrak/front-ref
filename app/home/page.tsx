import React from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home Page',
};

export default function HomePage() {
  return (
    <div className="w-full  h-screen min-h-[100vh] bg-linear-to-l from-pink-200 to-white">
      <nav className="flex justify-between  items-center mx-20  pt-10 h-20">
        <h1 className="text-purple-300  font-bold text-2xl uppercase flex-initial">
          company logo
        </h1>
        <ul className="flex gap-5">
          <li className="text-white bg-purple-950 px-6 py-1.5 rounded-md">
            <a href="#" className="">
              home
            </a>
          </li>
          <li className="text-purple-950 px-1.5 py-0.5">
            <a href="#">about</a>
          </li>
          <li className="text-purple-950 px-1.5 py-0.5">
            <a href="#">career</a>
          </li>
          <li className="text-purple-950 px-1.5 py-0.5">
            <a href="#">contact</a>
          </li>
        </ul>
      </nav>
      <main className=" mx-20 flex flex-col justify-center gap-15 h-[80vh] min-h-[465px]">
        <div className="flex flex-col gap-10 ">
          <h1 className=" self-start text-purple-950 capitalize text-5xl font-extrabold w-[424px] ">
            graphic designer
          </h1>
          <p className=" self-start w-[424px] text-purple-900 text-justify hyphens-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            vitae nisi dignissimos eligendi molestias consequuntur, tenetur
            fugit nihil dolorum voluptatum omnis voluptatibus ea consectetur
            velit, facere quam. Nulla, facere eum!
          </p>
        </div>
        <button className=" text-white font-black w-max px-10 py-2 mt-0.5 bg-purple-950 rounded-md hover:cursor-pointer hover:bg-white hover:text-purple-950 border-purple-950 hover:border-1">
          get started
        </button>
      </main>
    </div>
  );
}
