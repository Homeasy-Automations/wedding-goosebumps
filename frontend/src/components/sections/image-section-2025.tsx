"use client";

import React from "react";
import Image from "next/image";

export const ImageGallery: React.FC = () => {
  const MAIN_Image = "/quintessential-section/Main image 230202105837-MM_09599.jpg";

  const THUMBNAILS = [
    "/quintessential-section/Copy of 230202105837-MM_09465 (1).jpg",
    "/quintessential-section/Copy of 230202105837-MM_09833.jpg",
    "/quintessential-section/Copy of 230202105837-MM_09845.jpg"
  ];

  return (
    <section className="py-13 sm:py-16 md:py-20 bg-[#F8F5F0] text-charcoal">
      <div className="full-bleed overflow-hidden">
        <div className="grid gap-8 sm:gap-12 md:gap-16 lg:gap-18 lg:grid-cols-[minmax(400px,600px)_1fr] xl:grid-cols-[600px_1fr] 2xl:grid-cols-[640px_1fr] items-start   ">
          <div className="relative h-[85vh] sm:h-[85vh] md:h-[90vh] lg:h-[90vh] xl:h-[100vh] bg-[#efe9df]">
            <Image src={MAIN_Image} alt="Quintessential Aesthetics" fill className="object-cover" loading="eager" priority />
          </div>
          <div className="px-3 sm:px-4 lg:px-0 lg:pr-4">
            <div className="flex gap-2 sm:gap-3 md:gap-4 mb-5 sm:mb-6 overflow-x-auto">
              {THUMBNAILS.map((src, i) => (
                <div key={i} className="relative aspect-[3/4] bg-[#efe9df] p-0.5 sm:p-1 flex-shrink-0 w-23 sm:w-38 md:w-50 lg:w-60">
                  <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover" loading="eager" priority />
                </div>
              ))}
            </div>
            <div className="max-w-[495px]">
              <p className="text-[0.6rem] sm:text-[0.64rem] md:text-[0.7rem] font-lora tracking-[0.2em] uppercase text-charcoal/80 mb-1.2">
                WE DESIGN FROM THE SOUL OF YOUR STORY
              </p>
              <h2 className="text-l sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight text-charcoal mb-1.5 uppercase">
                THE COUTURE AESTHETICS 
              </h2>
              <h2 className="text-l sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight text-charcoal mb-1.5 uppercase">
                <span className="italic lowercase">of</span>{'\u00A0'} CELEBRATION
              </h2>
              <p className="font-lora text-[15px] sm:text-[16px] md:text-[17px] lg:text-[17px] leading-relaxed text-charcoal/90 mb-4 sm:mb-5">
                Throughout our collaborative design journey, we dive deep into our couples' stories — <em>their
                cultures, family legacies, and shared dreams.</em> These conversations become the heartbeat of
                our process. We use every detail to design weddings that are emotionally resonant, visually
                stunning, and uniquely yours.
              </p>
              <div className="pt-0.5 sm:pt-1">
                <p className="font-commuter-sans text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-gold border-b-[1.2px] border-gold pb-1 inline-block">
                  HOW WE DO IT
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
