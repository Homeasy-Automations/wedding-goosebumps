"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const slides = ["/loader/couple.png", "/loader/jaimala.png", "/loader/phere.png"];

export default function Loader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F8F5EF]">
      <div className="flex flex-col items-center">
        <div className="relative h-44 w-44 md:h-56 md:w-56">
          <Image
            key={slides[index]}
            src={slides[index]}
            alt=""
            fill
            className="animate-fade object-contain"
            priority
          />
        </div>

        <p className="mt-8 text-[13px] tracking-[0.4em] text-gray-700 uppercase">
          Wedding Goosebumps
        </p>
      </div>
    </div>
  );
}
