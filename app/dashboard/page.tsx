"use client";

import { ArrowLeft, Heart, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";

const images = ["/webdev.jfif", "/webdev1.png", "/webdev2.jfif"];

const page = () => {
  return (
    <main>
      <div className="flex items-center justify-between px-5 sticky top-0 bg-slate-100/70 backdrop-blur-3xl z-10 py-3">
        <Link href="/" className="px-3 pr-4 py-2 flex items-center gap-1 rounded-full cursor-pointer bg-emerald-500 text-slate-100 transition-all duration-300 hover:bg-emerald-600 focus:bg-emerald-600 outline-none">
          <ArrowLeft size={20} />
          <span>Back</span>
        </Link>
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
                            <CardContent className="relative p-0 h-full w-full">
                              <Image
                                width={800}
                                height={500}
                                className="w-full h-full object-cover"
                                src={src}
                                alt="carousel image"
                              />
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
    </main>
  );
};

export default page;
