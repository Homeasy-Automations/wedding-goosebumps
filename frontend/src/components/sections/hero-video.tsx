// src/components/sections/hero-video.tsx
"use client";

import Image from "next/image";

const LOGO_URL = "/logo/Logo.png";
const TEXT_LOGO_URL = "/logo/Text Logo.png";
const HERO_VIDEO_URL = "/videos/home-page-vids/Top Slide.webm";

export default function HeroVideo() {
  return (
    <header className="relative h-screen min-h-[500px] sm:min-h-[600px] w-full overflow-hidden">
      {/* video: no negative z-index */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={HERO_VIDEO_URL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* overlay: above video */}
      <div className="absolute inset-0 bg-black/25 z-10" />

      {/* content: above both */}
      <div className="relative z-30 flex h-full flex-col items-center justify-center px-4 py-8 sm:p-6">
        <Image
          src={TEXT_LOGO_URL}
          alt="WEDDING GOOSBUMPS"
          width={1000}
          height={500}
          className="h-auto w-full max-w-[384px] sm:max-w-[453px] md:max-w-[600px] lg:max-w-[670px] xl:max-w-[729px] invert brightness-0"
          priority
        />
      </div>
    </header>
  );
}
