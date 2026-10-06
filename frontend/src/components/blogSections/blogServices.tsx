"use client";

import Image from "next/image";
import Link from "next/link";

interface BlogServicesProps {
  service: {
    heading?: string;
    paragraph?: string;
    image?: string;
  };
}
export default function BlogServices({ service }: BlogServicesProps) {
  return (
    <section className="text-charcoal bg-[#FFFFFF] py-12 sm:py-15 md:py-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:gap-1.2 grid grid-cols-1 items-center gap-7 lg:grid-cols-5">
          {/* TEXT SIDE */}
          <div className="mb-8 flex flex-col items-center text-center lg:col-span-2 lg:mb-0 lg:items-end lg:text-right">
            <h2 className="mb-1.7 text-3xl leading-none uppercase sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
              {service.heading || "MEET THE HEART BEHIND THE GOOSEBUMPS"}
            </h2>

            <div className="bg-charcoal/20 my-4 h-px w-16 sm:my-6 sm:w-20 md:w-24" />

            <p className="font-lora mb-6 max-w-md text-sm leading-relaxed sm:mb-7 sm:text-base sm:leading-loose lg:mb-9">
              {service.paragraph || ""}
            </p>

            <Link href="/about">
              <p className="font-commuter-sans text-gold border-gold pb-1.2 hover:border-gold/70 inline-block border-b-[1.4px] text-[9px] tracking-[0.3em] uppercase transition-colors duration-300 sm:text-[10px] md:text-[12px]">
                THE SOUL OF WEDDING GOOSEBUMPS
              </p>
            </Link>
          </div>

          {/* IMAGE SIDE — full image visible, centered */}
          <div className="flex w-full justify-center py-2 lg:col-span-3">
            <Image
              src={service.image || "/service-level-section/Copy of MM_09664.jpg"}

              alt={service.heading || "Ali and couple on stairs"}
              width={736}
              height={1200}
              className="h-auto w-full max-w-[430px] object-contain sm:max-w-[406px] md:max-w-[450px] lg:max-w-[468px]"
              sizes="(max-width: 640px) 250px, (max-width: 768px) 300px, (max-width: 1024px) 350px, 400px"
              loading="eager"
              priority={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

