"use client";

import { ArrowDown, BookOpen, Heart, Plus, Share2 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = ['/webdev.jfif', '/webdev1.png', '/webdev2.jfif']

export default function Home() {
  function handleScroll() {
    window.scrollTo(0, 617);
  }

  return (
    <div>
      <div className="h-dvh flex flex-col">
        <header className="flex items-center justify-end gap-3 px-5 pt-3 z-50">
          <Link
            href="/dashboard"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-500 text-white cursor-pointer transition-all duration-300 hover:bg-emerald-600 text-[15px] tracking-wide"
          >
            MZ
          </Link>
        </header>
        <section className="grow flex flex-col gap-2 items-center justify-center">
          <div className="flex flex-col items-center mb-3">
            <Share2 size={34} className="rotate-90" />
            <div className="flex items-center">
              <Share2 size={34} />
              <BookOpen size={34} />
              <Share2 size={34} className="rotate-180" />
            </div>
            <Share2 size={34} className="-rotate-90" />
          </div>
          <h1 className="text-6xl">
            Welcome To{" "}
            <span className="font-bold text-emerald-500">polyStack</span>
          </h1>
          <p className="text-neutral-700 py-3 text-lg">
            polyStack is the space where people write articles from all over the
            world
          </p>
          <button
            onClick={handleScroll}
            className="px-5 py-2 rounded-full bg-emerald-500 text-white cursor-pointer transition-all duration-300 hover:bg-emerald-600 relative z-50"
          >
            <span>Recent Articles</span>
            <ArrowDown
              color="black"
              className="absolute left-1/2 -bottom-30 -translate-1/2 animate-bounce"
            />
          </button>
        </section>
      </div>
      <div className="flex justify-end px-5 sticky top-0 bg-slate-100/70 backdrop-blur-3xl z-10 py-3">
        <div className="relative shrink-0 w-full max-w-[320px]">
          <input
            className="border border-gray-300 rounded-full py-2 px-4 pr-22.5 outline-none focus:border-emerald-300 w-full bg-slate-100"
            placeholder="Search articles..."
            type="text"
          />
          <button
            className="px-3 py-1 rounded-full cursor-pointer bg-emerald-500 text-slate-100 transition-all duration-300 hover:bg-emerald-600 focus:bg-emerald-600 outline-none absolute top-1/2 right-1.5 -translate-y-1/2"
            type="submit"
          >
            Search
          </button>
        </div>
        <button className="px-5 py-0.5 ml-2 flex items-center gap-1 rounded-full cursor-pointer bg-emerald-500 text-slate-100 transition-all duration-300 hover:bg-emerald-600 focus:bg-emerald-600 outline-none">
          <Plus size={20} />
          <span className="font-semibold">Create Article</span>
        </button>
      </div>
      <section className="p-5 grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg bg-white shadow-md p-3 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center bg-emerald-500 text-white cursor-pointer transition-all duration-300 hover:bg-emerald-600 text-[15px] tracking-wide">
                MZ
              </div>
              <div>
                <h3 className="text-neutral-700">Muhammad Zohaib</h3>
                <p className="text-neutral-500 text-sm">
                  muhammadzohaibranjha42@gmail.com
                </p>
              </div>
            </div>
            <div>
              <div>
                <Carousel className="w-full">
                  <CarouselContent>
                    {images.map((src, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1 h-full w-full">
                          <Card className="p-0 h-full w-full">
                            <CardContent className="p-0 h-full w-full">
                              <img className="w-full h-full object-cover" src={src} />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-3 bg-emerald-500 text-white transition-all duration-300 hover:bg-emerald-600 cursor-pointer border-none outline-none" />
                  <CarouselNext className="right-3 bg-emerald-500 text-white transition-all duration-300 hover:bg-emerald-600 cursor-pointer border-none outline-none" />
                </Carousel>
              </div>
              <h2 className="text-lg font-semibold text-neutral-800 mt-2">
                Web Development Roadmap in 2026
              </h2>
              <p className="text-sm text-neutral-600">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                iusto molestias culpa odio dicta dolore blanditiis. Qui voluptas
                impedit minima maxime dolores. Modi soluta sapiente aliquam
                quisquam quae molestiae laudantium.
              </p>
            </div>
            <div className="flex items-center justify-end">
              <div>
                <Heart
                  color="red"
                  className="inline-block mr-1 cursor-pointer"
                />
                <span className="text-sm text-neutral-600">10 Likes</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
