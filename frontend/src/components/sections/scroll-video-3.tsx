// components/VideoFullBleed.tsx
"use client";

import React from "react";
import Image from "next/image";

const TEXT_LOGO_URL = "/logo//logo/Text Logo.png";

export default function VideoFullBleed() {
  return (
    // 1) w-screen makes it stretch full viewport width
    // 2) h-screen makes it full viewport height (remove if you want auto height)
    // 3) overflow-hidden clips any slight scaling artifacts
    <section className="relative w-screen h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen overflow-hidden flex flex-col items-center justify-center">
     
      <video
        className="absolute inset-0 w-full h-[85vh] object-cover"
        src="/videos/home-page-vids/MOHIT WED VIDEO 4K 20 Sec 9.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
    </section>
  );
}
