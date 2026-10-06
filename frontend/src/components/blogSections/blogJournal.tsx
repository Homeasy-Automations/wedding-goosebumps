import React from "react";
import Image from "next/image";

export default function blogJournal({ ART }) {
  return (
    <>
      <section className="bg-ivory pt-16 pb-14 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
        <div className="mx-auto max-w-[720px] px-5 text-center sm:px-8">
          <p className="font-commuter-sans text-charcoal/60 mb-4 text-[10px] tracking-[0.4em] uppercase sm:text-[11px]">
            The Journal
          </p>
          <h2 className="font-epicene-display mb-6 text-[28px] leading-[1.15] font-light uppercase sm:text-[36px] md:text-[42px]">
            {ART.heading}
          </h2>
          <p className="font-lora text-charcoal/85 text-[15px] leading-[1.8] whitespace-pre-line sm:text-[16px] sm:leading-[1.85]">
            {ART.paragraph}
          </p>

          <div className="mx-auto mt-8 h-[2px] w-12 bg-[#D9D5CF] sm:mt-9 sm:w-14" />

          {/* Byline */}
          <div className="mt-8 flex items-center justify-center gap-3 sm:mt-9">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#efe9df] sm:h-11 sm:w-11">
              <Image src={ART.author.avatar} alt={ART.author.name} fill className="object-cover" />
            </div>
            <div className="text-left">
              <p className="font-commuter-sans text-[11px] tracking-[0.08em] uppercase sm:text-[12px]">
                {ART.author.name}
              </p>
              <p className="font-commuter-sans text-charcoal/55 text-[10px] tracking-[0.06em] uppercase sm:text-[11px]">
                {ART.author.role}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
