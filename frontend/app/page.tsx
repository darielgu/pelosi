"use client";
import { Hero } from "@/components/ui/animated-hero";
import BackgroundPlus from "@/components/ui/background-plus";
import Image from "next/image";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Image
        src="/bg.png"
        alt="Pelosi"
        width={200}
        height={200}
        className="position absolute left-0 top-0  hover:cursor-pointer"
      />
      <BackgroundPlus className="-z-1" />
      <Hero />
    </div>
  );
}
