"use client";

import Image from "next/image";

interface BlogKindWordsProps {
  kindWords: {
    heading?: string;
    subheading?: string;
    paragraph?: string;
    smallImage?: string;
    bigImage?: string;
  };
}

export default function BlogKindWords({ kindWords }: BlogKindWordsProps) {
  return (
    <section className="bg-ivory text-charcoal overflow-hidden pt-7 pb-20 sm:pt-10 sm:pb-24 md:pt-14 md:pb-28 lg:pt-0 lg:pb-32">
      <div className="mx-auto max-w-none px-0">
        <div className="grid grid-cols-1 items-start gap-y-7 sm:gap-y-10 lg:grid-cols-[auto_1fr_auto] lg:gap-x-10 xl:gap-x-18">
          {/* LEFT IMAGE */}
          <div className="order-2 flex justify-center pl-0 lg:order-1 lg:mt-40 lg:ml-4 lg:justify-start xl:mt-60 xl:ml-6 2xl:mt-80">
            <div className="relative aspect-[3/4] w-[229px] sm:w-[247px] md:w-[266px] lg:w-[247px] xl:w-[266px] 2xl:w-[284px]">
              <Image
                src={kindWords.smallImage || "/kind-words-section/Copy of DSC02686.jpg"}
                alt="Small Image"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* CENTER CONTENT */}
          <div className="relative order-1 mt-8 px-4 text-center sm:mt-16 md:mt-24 lg:order-2 lg:mt-40 lg:px-0">
            <h2 className="text-center text-2xl leading-none uppercase sm:text-3xl md:text-4xl lg:text-right lg:text-5xl xl:text-6xl 2xl:text-7xl">
              {kindWords.heading}
            </h2>

            <div className="flex justify-center lg:justify-end">
              <h3 className="font-lora mb-7 max-w-[343px] text-center text-[10px] leading-none tracking-[0.2em] uppercase sm:mb-9 sm:text-[12px] lg:mb-10 lg:text-right">
                {kindWords.subheading}
              </h3>
            </div>

            <div className="bg-charcoal/15 mx-auto mt-2 mb-7 h-[2px] w-[120px] sm:mb-9 lg:mr-0 lg:mb-10 lg:ml-auto" />

            <p className="font-lora text-charcoal/85 mx-auto mt-4 max-w-[754px] text-center text-sm leading-[1.8] sm:mt-5 sm:text-[14.6px] sm:leading-[1.9] lg:ml-auto lg:text-right">
              {kindWords.paragraph}
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="order-3 flex justify-end pr-0">
            <div className="relative aspect-[3/4] w-[358px] sm:w-[422px] md:w-[450px] lg:w-[500px]">
              <Image
                src={kindWords.bigImage || "/kind-words-section/main image DSC03052.jpg"}
                alt="Large Image"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
