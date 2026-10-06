import React from "react";
import Link from "next/link";

const OfferingsSection = () => (
  <section className="bg-ivory text-charcoal py-8 sm:py-12 md:py-16 lg:py-20 pb-17 sm:pb-21 md:pb-24 mb-10">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-7">
      {/* small uppercase heading + underline */}
      <h2 className="font-commuter-sans text-[11px] sm:text-[13px] md:text-[14px] uppercase tracking-[0.3em] text-gold font-bold mb-[3px]">
        ABOUT WEDDING GOOSEBUMPS
      </h2>
      <div className="h-[2.3px] w-18 sm:w-22 md:w-28 bg-[#D9D5CF]" />

      {/* body copy */}
      <p className="mt-4 sm:mt-6 font-lora text-[15px] sm:text-[16px] md:text-[17px] lg:text-[17px] leading-[1.8] sm:leading-[1.9]">
        Wedding Goosebump is a premier wedding designing and planning studio
        based in India, specializing in crafting soul-stirring luxury
        destination weddings across Europe, the Middle East, and India. From
        the shores of Lake Como to the royal palaces of Rajasthan,&nbsp;
        <em className="italic">
          we turn once-in-a-lifetime moments into emotionally immersive
          celebrations.
        </em>{" "}
        We take the stress out of planning a wedding away from home. Our expert
        team bridges cultures, languages, and local nuances — handling
        everything from logistics to luxury detailing with precision and heart.
        Whether you dream of a cliffside vow in Santorini or a regal baraat in
        Jaipur, we’re here to turn your vision into goosebump-worthy reality.
      </p>

      {/* offerings link */}
      <Link href="/offerings" className="inline-block mt-2 sm:mt-4">
        <span className="font-commuter-sans text-[10px] sm:text-[12px] uppercase tracking-[0.3em] text-gold border-b-[1.4px] border-gold pb-1 hover:border-gold/70 transition-colors duration-300">
          OUR OFFERINGS
        </span>
      </Link>
    </div>
  </section>
);

export default OfferingsSection;
