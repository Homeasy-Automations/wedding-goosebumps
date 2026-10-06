"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/sections/footer";
import { useEffect, useRef, useState } from "react";

export default function OfferingsPage() {
  // ── Slideshow state (for the centered slideshow above "Our approach")
  const SLIDES = [
    "/offerings-page/slide-section/main.jpg",
    "/offerings-page/slide-section/1.jpg",
    "/offerings-page/slide-section/2.jpg",
    "/offerings-page/slide-section/3.jpg",
    "/offerings-page/slide-section/4.jpg",
  ];

  const [current, setCurrent] = useState(0);
  const hoverRef = useRef(false);

  // Handlers for the slideshow
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  // Data for the new Offerings Slider
  const OFFERINGS_DATA = [
    {
      title: "DESTINATION WEDDINGS",
      description: [
        `At Wedding Goosebumps, we specialize in curating unforgettable destination weddings across India and abroad. Whether you envision a royal celebration in a grand palace, a charming affair in a heritage haveli, or a serene escape in a luxury resort—our team ensures the perfect venue that matches your dream. From Jaipur and Udaipur to Goa and the Himalayas, our destinations offer exceptional hospitality and stunning backdrops.`,
        `For an international flair, we organize weddings at handpicked locations like Bali, Phuket, Tuscany, Dubai, or the Maldives—bringing your vision to life with elegance and ease. With us, your wedding becomes more than an event—it's a destination experience.`,
      ],
      image: "/offerings-page/slide-section/Photo-11.jpg",
    },
    {
      title: "BESPOKE WEDDING COLLATERAL DESIGN",
      description: [
        `Our bespoke wedding collateral design service is crafted for couples who want every detail of their celebration to reflect their personality. We translate your journey into a signature visual identity—designing couple monograms, illustrations, and themed artwork that seamlessly tie every element together.`,
        `From animated invites and handcrafted cards to save-the-dates, menus, favor tags, and seating charts—each piece is curated to match your colors, mood, and décor. This isn't just collateral—it's an immersive extension of your story, ensuring your guests experience your style at every touchpoint.`,
      ],
      image: "/offerings-page/slide-section/Photo-12.jpg",
    },
    {
      title: "DESIGN & DECOR",
      description: [
        `At Wedding Goosebumps, décor isn't just decoration—it's the soul of your celebration. We create complete, immersive themes where every texture, color, and detail reflects your personality, heritage, and vision.`,
        `Our team blends global trends, cultural aesthetics, and creative concepts to deliver decor that is not only visually stunning but deeply personal. Whether you dream of a royal palace affair or a boho-chic beach celebration, we ensure every element harmonizes to tell your story in the most breathtaking way.`,
      ],
      image: "/offerings-page/slide-section/Photo-2.jpg",
    },
    {
      title: "CAPTURING MOMENTS",
      description: [
        `We believe the best moments are those that happen naturally. We don't ask you to pose or act—we quietly capture every genuine laugh, tear, and embrace as it unfolds. Our lens becomes a silent witness, allowing you to live fully in the moment.`,
        `Partnering with top photography and cinematography talents from around the world, we blend artistry with emotion. From candid moments to cinematic films, every memory is preserved with care, creating timeless visuals that give you goosebumps for a lifetime.`,
      ],
      image: "/offerings-page/slide-section/Photo-3.jpg",
    },
    {
      title: "CULINARY JOURNEYS, CRAFTED FOR YOU",
      description: [
        `We know that exceptional cuisine is at the heart of every celebration. That's why we collaborate with top chefs to curate menus that delight every palate. From traditional Indian delicacies to global gourmet experiences, each offering is crafted with precision, creativity, and flair.`,
        `Whether it's Indian cuisine, international flavors, or a vibrant fusion buffet, we ensure every dish is a celebration in itself. With a focus on taste, quality, and seamless service, we transform meals into unforgettable culinary journeys that guests will savor long after the event ends.`,
      ],
      image: "/offerings-page/slide-section/Photo-7.jpg",
    },
  ];

  // State for the new Offerings Slider
  const [currentOffering, setCurrentOffering] = useState(0);

  // Handlers for the new Offerings Slider
  const nextOffering = () => {
    setCurrentOffering((prev) => (prev + 1) % OFFERINGS_DATA.length);
  };

  const prevOffering = () => {
    setCurrentOffering((prev) => (prev - 1 + OFFERINGS_DATA.length) % OFFERINGS_DATA.length);
  };

  useEffect(() => {
    if (SLIDES.length <= 1) return;
    const id = setInterval(() => {
      if (!hoverRef.current) {
        setCurrent((i) => (i + 1) % SLIDES.length);
      }
    }, 3500);
    return () => clearInterval(id);
  }, [SLIDES.length]);

  return (
    <main className="bg-ivory text-charcoal">
     

      {/* Hero Section - Responsive */}
      <section className="relative h-[50vh] w-full overflow-hidden sm:h-[70vh] md:h-[80vh] lg:h-[100vh]">
        <Image
          src="/offerings-page/hero.jpg"
          alt="Full Service Luxury Wedding Design and Planning"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center px-3 pt-43">
          <div className="max-w-3xl text-center">
            <h1 className="font-epicene-display text-[20px] leading-tight text-white uppercase drop-shadow sm:text-[26px] md:text-[34px] lg:text-[42px]">
              FULL SERVICE
              <br />
              LUXURY WEDDING DESIGN AND PLANNING
            </h1>
            <p className="font-lora mt-2 text-[9px] tracking-[0.12em] text-white/95 uppercase sm:mt-3 sm:text-[10px] sm:tracking-[0.16em]">
              BY WEDDING GOOSEBUMPS
            </p>
          </div>
        </div>
      </section>

      {/* Signature Service Section - Mobile Responsive */}
      <section className="bg-ivory py-10 sm:py-13 lg:py-20">
        <div className="mx-auto max-w-[1000px] px-3 sm:px-5">
          <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-8">
            {/* LEFT: copy */}
            <div className="order-2 lg:order-1">
              {/* Headline */}
              <h2 className="font-epicene-display text-charcoal text-[26px] leading-[1.08] tracking-[0.01em] uppercase sm:text-[32px] md:text-[38px] lg:text-[44px] xl:text-[50px]">
                Signature White glove
                <br />
                SERVICE <span className="font-epicene-display lowercase italic">for you</span>
              </h2>

              {/* Small uppercase line */}
              <p className="text-charcoal/70 mt-2 text-[9px] leading-[1.5] tracking-[0.2em] uppercase sm:mt-3 sm:text-[10px] sm:tracking-[0.24em] md:text-[11px]">
                BECAUSE WE ARE OBSESSIVELY DETAIL-DRIVEN AND METICULOUSLY ORGANIZED,{" "}
                <br className="hidden sm:inline" />
                WE STAY TWO STEPS AHEAD AT EVERY MOMENT..
              </p>

              {/* thin rule */}
              <div className="bg-charcoal/15 mt-3 h-[1.5px] w-10 sm:mt-4 sm:w-12" />

              {/* Body copy */}
              <p className="font-lora text-charcoal/90 mt-4 max-w-[52ch] pb-1 text-[13px] leading-[1.7] sm:mt-6 sm:text-[14px] sm:leading-[1.8] md:text-[14.5px]">
                We design a<em> one of a kind concept and a flawless production plan,</em> ensuring
                we are present on the day to make every element come to life seamlessly. At Wedding
                Goosebump, we take pride in delivering a perfectly executed wedding planning and
                design experience <em>for you and your guests</em> — one that blends creativity with
                precision. With equal mastery in planning and design{" "}
                <em>we deeply value the significance of both,</em> ensuring every moment is handled
                with care, foresight, and unmatched attention to detail.
              </p>

              {/* CTA: underlined text link */}
              <Link href="/inquire" className="mt-1 inline-block">
                <span className="font-commuter-sans text-gold border-gold border-b-[1.2px] pb-0.5 text-[10px] tracking-[0.2em] uppercase sm:text-[11px] sm:tracking-[0.24em]">
                  WORK WITH US
                </span>
              </Link>
            </div>

            {/* RIGHT: image */}
            <div className="relative order-1 h-[40vh] bg-[#efe9df] sm:h-[48vh] md:h-[64vh] lg:order-2 lg:h-[80vh]">
              <Image
                src="/offerings-page/2.jpg"
                alt="High touch service dining room"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section - Responsive Slideshow */}
      <section className="bg-[#ffffff] py-8 sm:py-12 md:py-16">
        {/* Centered slideshow container */}
        <div className="bg-grey/5 mx-auto mb-10 h-[350px] w-full max-w-[900px] px-3 sm:mb-12 sm:h-[450px] sm:px-5 md:mb-14 md:h-[550px] lg:h-[650px] xl:h-[700px] 2xl:h-[750px]">
          {/* Inner slideshow container with overflow hidden */}
          <div
            className="group relative h-full w-full overflow-hidden"
            onMouseEnter={() => (hoverRef.current = true)}
            onMouseLeave={() => (hoverRef.current = false)}
          >
            {/* Slide track */}
            <div
              className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {SLIDES.map((src, i) => (
                <div key={i} className="relative h-full w-full flex-shrink-0">
                  <Image
                    src={src}
                    alt={`Wedding Detail ${i + 1}`}
                    fill
                    priority={i === 0}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="text-charcoal/75 hover:text-gold absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 opacity-0 shadow-md transition-all group-hover:opacity-100 hover:bg-white sm:left-4 sm:p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 sm:h-5 sm:w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="text-charcoal/75 hover:text-gold absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 opacity-0 shadow-md transition-all group-hover:opacity-100 hover:bg-white sm:right-4 sm:p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 sm:h-5 sm:w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Text content */}
        <div className="mx-auto w-full max-w-[1000px] px-3 text-center sm:px-5">
          {/* small overline */}
          <p className="text-charcoal/60 mb-2 text-[9px] tracking-[0.24em] uppercase sm:mb-3 sm:text-[10px] sm:tracking-[0.28em]">
            Our approach
          </p>

          {/* big headline */}
          <h2 className="font-epicene-display text-charcoal text-[23px] leading-[1.08] uppercase sm:text-[28px] md:text-[34px] lg:text-[38px] xl:text-[44px]">
            to flawless wedding celebrations
          </h2>

          {/* italic sub-headline */}
          <p className="font-cormorant text-charcoal/85 mx-auto mt-2 max-w-2xl text-[14px] italic sm:mt-3 sm:text-[15px] md:text-[16px]">
            Our Full-Service Luxury Wedding Planning approach ensures we handle every detail from
            the first idea to the final farewell.
          </p>

          {/* divider */}
          <div className="mt-6 flex items-center justify-center sm:mt-8">
            <span className="bg-charcoal/15 block h-[1px] w-24 sm:w-32 md:w-40" />
          </div>

          {/* body paragraph */}
          <p className="font-lora text-charcoal/90 mx-auto mt-6 max-w-[780px] text-[13px] leading-[1.7] sm:mt-8 sm:text-[14px] sm:leading-[1.8] md:text-[14.5px]">
            We take the time to understand you both — your personalities, your vision, and your
            story — and then craft a bespoke design concept that is a true reflection of who you
            are. With a handpicked team of world-class vendors, we bring that vision to life with
            precision and artistry. Your comfort, along with that of your guests, is our highest
            priority, and we go above and beyond to make sure your wedding is not only spectacular
            but also stress-free and flawlessly executed.
          </p>

          {/* CTA */}
          <div className="mt-6 sm:mt-8">
            <Link
              href="/inquire"
              className="font-lora inline-flex items-center justify-center bg-[#C2A770] px-6 py-2 text-[10px] tracking-[0.15em] text-white uppercase transition-colors hover:bg-[#B79A63] sm:px-8 sm:py-3 sm:tracking-[0.16em]"
            >
              Work with us
            </Link>
          </div>
        </div>
      </section>

      {/* Video Section - Responsive Heights */}
      <section className="relative h-[50vh] w-full overflow-hidden sm:h-[60vh] md:h-[70vh] lg:h-[100vh]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/offerings-page-vids/ANUJ WEDDING TEASER 20sec 9.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/25" />
      </section>

      {/* Offerings Slider Section - Mobile Responsive */}
      <section className="bg-ivory py-13 sm:py-16 md:py-22">
        <div className="mx-auto max-w-[1000px] px-3 sm:px-5">
          {/* Static Header */}
          <div className="mb-8 max-w-2xl sm:mb-10 md:mb-13">
            <p className="text-charcoal/60 mb-2 text-[9px] tracking-[0.2em] uppercase sm:mb-3 sm:text-[10px] sm:tracking-[0.24em]">
              OUR OFFERINGS
            </p>
            <h2 className="font-epicene-display text-charcoal text-[23px] leading-[1.08] uppercase sm:text-[28px] md:text-[34px] lg:text-[38px] xl:text-[44px]">
              FULL SERVICE WEDDING PLANNING{" "}
              <span className="font-epicene-display lowercase italic">and</span> DESIGN
            </h2>
            <p className="font-lora text-charcoal/90 mt-3 max-w-[70ch] text-[13px] leading-[1.7] sm:mt-4 sm:text-[14px] sm:leading-[1.8] md:text-[14.5px]">
              In order to guarantee our couples have the best planning experience and the attention
              they deserve, we only offer full service wedding planning & design that includes:
            </p>
          </div>

          {/* Dynamic Slider Content */}
          <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-20">
            {/* LEFT: Text Content */}
            <div className="order-2 flex h-full flex-col lg:order-1">
              <div className="flex-grow">
                {/* Title */}
                <h3 className="font-epicene-display text-charcoal mb-4 text-[18px] leading-[1.1] uppercase sm:mb-5 sm:text-[22px] md:mb-6 md:text-[26px] lg:text-[28px] xl:text-[30px]">
                  {OFFERINGS_DATA[currentOffering].title}
                </h3>

                {/* Description */}
                <div className="font-lora text-charcoal/90 space-y-4 text-[13px] leading-[1.7] sm:space-y-5 sm:text-[14px] sm:leading-[1.8] md:text-[14.5px]">
                  {OFFERINGS_DATA[currentOffering].description.map((paragraph, idx) => (
                    <p key={idx} className="max-w-[55ch] lg:max-w-[60ch]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="mt-8 flex items-center justify-between sm:mt-10 md:mt-12">
                <button
                  onClick={prevOffering}
                  aria-label="Previous offering"
                  className="text-charcoal/75 hover:text-gold group flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase transition-colors sm:text-[12px] sm:tracking-[0.18em]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3 w-3 transition-transform group-hover:-translate-x-1 sm:h-3.5 sm:w-3.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                  PREV
                </button>
                <button
                  onClick={nextOffering}
                  aria-label="Next offering"
                  className="text-charcoal/75 hover:text-gold group flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase transition-colors sm:text-[12px] sm:tracking-[0.18em]"
                >
                  NEXT OFFERING
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-3.5 sm:w-3.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* RIGHT: Image */}
            <div className="relative order-1 h-[400px] bg-[#efe9df] sm:h-[450px] md:h-[55vh] lg:order-2 lg:h-[65vh] xl:h-[65vh]">
              <Image
                key={currentOffering}
                src={OFFERINGS_DATA[currentOffering].image}
                alt={OFFERINGS_DATA[currentOffering].title}
                fill
                className="animate-fade-in object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section - Mobile Responsive */}
      <section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT — Big Image Column: Responsive heights */}
          <div className="h-[35vh] sm:h-[42vh] md:h-[58vh] lg:sticky lg:top-0 lg:h-[95vh]">
            <div className="relative h-full w-full">
              <Image
                src="/offerings-page/images-sec/main.jpg"
                alt="Bridal party with bouquets"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* RIGHT — Content Column */}
          <div className="px-3 py-10 sm:px-5 sm:py-13 md:px-8 lg:px-13 lg:py-20">
            {/* Top Thumbnails: Horizontally scrolling */}
            <div className="mb-6 overflow-x-auto [scrollbar-width:none] sm:mb-8 md:mb-10 [&::-webkit-scrollbar]:hidden">
              <div className="grid auto-cols-[60%] grid-flow-col gap-2 sm:auto-cols-[45%] sm:gap-3 md:auto-cols-[30%] lg:auto-cols-[22%]">
                {[
                  "/offerings-page/images-sec/1.jpg",
                  "/offerings-page/images-sec/2.jpg",
                  "/offerings-page/images-sec/3.jpg",
                  "/offerings-page/images-sec/4.jpg",
                ].map((src, i) => (
                  <div key={i} className="relative aspect-[4/5] overflow-hidden bg-[#efe9df]">
                    <Image
                      src={src}
                      alt={`Process detail ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Heading */}
            <h2 className="font-epicene-display text-charcoal pt-0.5 text-[23px] leading-tight uppercase sm:pt-2 sm:text-[26px] md:text-[29px] lg:text-[32px] xl:text-[38px]">
              Our Process
            </h2>

            {/* Steps List */}
            <ol className="divide-charcoal/10 border-charcoal/10 mt-4 divide-y border-y sm:mt-6">
              {[
                "Reach out to Us",
                "Schedule a meeting",
                "Tell us your requirements",
                "Get a quote",
                "Finalize, sit back and relax",
              ].map((step, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[auto_1fr] items-baseline gap-3 py-3 sm:gap-5 sm:py-4"
                >
                  <span className="font-sans text-[9px] tracking-[0.28em] text-[#b6a78f] uppercase tabular-nums sm:text-[10px] sm:tracking-[0.32em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-lora text-charcoal/90 text-[13px] leading-relaxed sm:text-[14px] md:text-[15px]">
                    {step}
                  </span>
                </li>
              ))}
            </ol>

            {/* CTA Button */}
            <div className="mt-4 sm:mt-6">
              <Link
                href="/inquire"
                className="font-lora inline-flex items-center justify-center bg-[#C2A770] px-6 py-2 text-[10px] tracking-[0.15em] text-white uppercase transition-colors hover:bg-[#B79A63] sm:px-8 sm:py-3 sm:tracking-[0.16em]"
              >
                Work with Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Footer Section - Mobile Responsive */}
      <section className="bg-ivory py-13 sm:py-16 md:py-22">
        <div className="mx-auto max-w-6xl px-3 sm:px-5 lg:px-6">
          {/* Top row: two images */}
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
            <div className="relative h-[320px] bg-[#efe9df] sm:h-[400px] md:h-[450px] lg:h-[560px] xl:h-[660px]">
              <Image
                src="/offerings-page/pre-footer/1.jpg"
                alt="Celebration portrait"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="relative h-[320px] bg-[#efe9df] sm:h-[400px] md:h-[450px] lg:h-[560px] xl:h-[660px]">
              <Image
                src="/offerings-page/pre-footer/2.jpg"
                alt="Detail 1"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Bottom row: heading + copy */}
          <div className="mt-8 grid grid-cols-1 items-start gap-6 sm:mt-10 sm:gap-8 md:grid-cols-2">
            {/* LEFT — stacked headline */}
            <div className="text-left">
              <h2 className="font-epicene-display text-[23px] leading-[1.04] tracking-[0.02em] uppercase sm:text-[28px] md:text-[34px] lg:text-[38px] xl:text-[42px]">
                EXCEPTIONAL,
                <br />
                PERSONALIZED
                <br />
                ATTENTIVENESS
              </h2>

              {/* hairline divider under heading */}
              <div className="mt-2 h-px w-full max-w-[280px] bg-neutral-300/60 sm:mt-3" />
            </div>

            {/* RIGHT — body copy + cta */}
            <div className="max-w-[480px]">
              <p className="font-lora text-[14px] leading-[1.8] text-neutral-800 sm:text-[15px] sm:leading-[1.9] md:text-[16px]">
                We accept a limited amount of select weddings per year, and offer tailor-made
                wedding planning and design services for an exclusive clientele. We&apos;ve
                designed, planned and produced every size of celebration from luxury elopements for
                2 to large scale weddings for 200.
              </p>

              <Link href="/inquire" className="mt-0.5 inline-block">
                <span className="font-commuter-sans text-gold border-gold border-b-[1.2px] pb-0.5 text-[10px] tracking-[0.2em] uppercase sm:text-[11px] sm:tracking-[0.24em]">
                  WORK WITH US
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final Video Section - Responsive */}
      <section className="relative mb-16 h-[48vh] w-full overflow-hidden sm:mb-20 sm:h-[64vh] md:mb-24 lg:h-[80vh]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/offerings-page-vids/DHARAM RAJVI WED HIGHLIGHT 4K 20 sec 25.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/25 pb-40" />
      </section>

      <Footer />
    </main>
  );
}

function ServiceBlock({
  title,
  copy,
  image,
  reverse,
}: {
  title: string;
  copy: string;
  image: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`container grid grid-cols-1 items-center gap-8 lg:grid-cols-2 ${reverse ? "lg:grid-flow-dense" : ""}`}
    >
      {/* image */}
      <div className={`relative h-[43vh] bg-[#efe9df] ${reverse ? "lg:order-2" : ""}`}>
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      {/* text */}
      <div className={`${reverse ? "lg:order-1" : ""}`}>
        <h3 className="font-epicene-display mb-3 text-[21px] leading-tight uppercase md:text-[26px]">
          {title}
        </h3>
        <p className="font-lora text-charcoal/90 text-[14.5px] leading-[1.8]">{copy}</p>
      </div>
    </div>
  );
}
