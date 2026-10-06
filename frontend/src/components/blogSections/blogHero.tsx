import React from "react";
import Image from "next/image";

interface BlogHeroProps {
  ART: {
    category: string;
    title: string;
    hero: string;
    date: string;
    readTime: string;
  };
}

export default function BlogHero({ ART }: BlogHeroProps) {
  return (
    <>
      <section className="bg-charcoal relative">
        <div className="full-bleed">
          <div className="relative h-[62vh] w-full sm:h-[74vh] lg:h-[92vh]">
            <Image
              src={ART.hero || "/images/default-blog.jpg"}
              alt={ART.title || "Couple during their pre-wedding photoshoot"}
              fill
              className="object-cover object-center"
              priority
            />
            {/* Scrim so the overlaid type stays legible on any photo */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/45" />

            <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
              <h1 className="font-epicene-display max-w-[880px] text-[32px] leading-[1.12] font-light tracking-[0.02em] text-white uppercase sm:text-[46px] md:text-[56px] lg:text-[64px]">
                {ART.title?.replaceAll("-", " ")?.toUpperCase() ?? ""}
              </h1>
              <p className="font-commuter-sans mb-4 text-[10px] tracking-[0.4em] text-white/80 uppercase sm:text-[11px]">
                {ART.category}
              </p>
              <p className="font-commuter-sans mt-5 text-[10px] tracking-[0.3em] text-white/70 uppercase sm:text-[11px]">
                {ART.date} · {ART.readTime}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
