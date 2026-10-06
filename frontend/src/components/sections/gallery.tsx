"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

const IMAGES = [
  "/gallery/BB_01961.jpg",
  "/gallery/BB_02895.jpg",
  "/gallery/DEV06384.jpg",
  "/gallery/DSC05463.jpg",
  "/gallery/DSC05495.jpg",
  "/gallery/DSC07473.jpg",
  "/gallery/DSC07748 (1).jpg",
  "/gallery/DSC07927.jpg",
  "/gallery/DSC08363.jpg",
  "/gallery/MM_09867.jpg",
];

export default function GallerySection() {
  const slidesToShow = 2;

  // chunk images into pages of 2
  const groups = useMemo(() => {
    const g: string[][] = [];
    for (let i = 0; i < IMAGES.length; i += slidesToShow) {
      g.push(IMAGES.slice(i, i + slidesToShow));
    }
    return g;
  }, []);

  const [groupIndex, setGroupIndex] = useState(0);
  const lastIndex = groups.length - 1;

  const prev = () => setGroupIndex((i) => (i === 0 ? lastIndex : i - 1));
  const next = () => setGroupIndex((i) => (i === lastIndex ? 0 : i + 1));

  return (
  <section className="bg-ivory py-2 sm:py-3 md:py-5">
      {/* — Heading & intro copy */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mt-5 sm:mt-8 lg:mt-10">
        {/* WE CREATE → Commuter Sans 400 */}
        <h3 className="font-commuter-sans font-normal text-xs sm:text-sm uppercase tracking-[0.3em] text-charcoal mb-1">
          WE CREATE
        </h3>
        {/* UNFORGETTABLE word only → Epicene Display Light 400 */}
        <h2 className="font-[Epicene_Display] font-light uppercase text-charcoal text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-1 leading-tight tracking-tight">
        <span className="font-cormorant font-extralight">unforgettable</span>{" "}
        <span className="font-cormorant font-extralight">experiences</span>
        </h2>
        <div className="h-[2.5px] w-20 sm:w-24 md:w-30 bg-[#D9D5CF] mx-auto my-6 sm:my-8" />

        {/* "Wedding Goosebump is a full-service" → Newsreader 300 italic */}
        <p className="mx-auto max-w-2xl font-lora text-base sm:text-lg leading-relaxed text-charcoal pb-7 sm:pb-9">
            Wedding Goosebumps is a full-service
          {" "}
          <em className="italic">
            luxury wedding design and planning studio,
          </em>{" "}
          crafting emotionally immersive, couture destination weddings across
          the world's most iconic locations.
        </p>
      </div>

      {/* — Carousel wrapper */}
      <div className="relative mx-auto max-w-[522px] sm:max-w-[683px] md:max-w-[836px] lg:max-w-[997px] h-[436px] sm:h-[501px] md:h-[577px] lg:h-[653px]">
        {/* — Images container (overflow-hidden) */}
        <div className="relative h-full overflow-hidden">
          {groups.map((group, gi) => (
            <div
              key={gi}
              className={`absolute top-0 left-0 flex w-full h-full gap-2 sm:gap-3 md:gap-4 px-2 sm:px-5 md:px-7 transition-opacity duration-700 ease-in-out ${
                gi === groupIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {group.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-1/2 h-full rounded overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`Gallery image ${gi * slidesToShow + idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 25vw"
                    loading={idx < 10 ? 'eager' : 'lazy'}
                    priority={idx < 10}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ← Prev */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-0 -ml-7 sm:-ml-9 md:-ml-13 top-1/2 -translate-y-1/2 w-7 sm:w-9 md:w-13 h-7 sm:h-8 md:h-9 bg-[#E8E3DC] hover:bg-[#D8D3CC] flex items-center justify-center z-20 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 sm:w-5 sm:h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* → Next */}
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-0 -mr-7 sm:-mr-9 md:-mr-13 top-1/2 -translate-y-1/2 w-7 sm:w-9 md:w-13 h-7 sm:h-8 md:h-9 bg-[#E8E3DC] hover:bg-[#D8D3CC] flex items-center justify-center z-20 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 sm:w-5 sm:h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
