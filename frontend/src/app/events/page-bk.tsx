import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import ReadingProgress from "@/components/ReadingProgress";

const unsplash = (w: number) =>
  `https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=${w}&auto=format&fit=crop&q=80`;

const ARTICLE = {
  category: "PRE-WEDDING",
  title: "The Art of the Pre-Wedding Shoot",
  dek: "Before the vows, before the guest list, there is one afternoon that belongs only to the two of you. Here is how we make it count.",
  author: {
    name: "Elena Marchetti",
    role: "Founder & Creative Director",
    avatar: unsplash(200),
  },
  date: "July 17, 2026",
  readTime: "6 min read",
  hero: unsplash(1400),
  tags: ["Pre-Wedding", "Photography", "Styling", "Couples"],
};

const RELATED = [
  {
    category: "PHOTOGRAPHY",
    title: "Golden Hour: Timing Your Shoot Right",
    date: "July 3, 2026",
    image: unsplash(700),
    slug: "golden-hour-timing-your-shoot",
  },
  {
    category: "STYLING",
    title: "What to Wear for Your Couple Portraits",
    date: "June 20, 2026",
    image: unsplash(700),
    slug: "what-to-wear-couple-portraits",
  },
  {
    category: "LOCATIONS",
    title: "Five Backdrops We Never Tire Of",
    date: "June 5, 2026",
    image: unsplash(700),
    slug: "five-backdrops-we-never-tire-of",
  },
];


export default function BlogPostPage() {
  return (
    <main className="bg-ivory text-charcoal">
      {/* Navbar */}
      <div className="relative z-50">
        <Navigation />
      </div>
      <ReadingProgress />

      {/* Section 1 — full-bleed hero with overlaid wordmark, mirrors homepage slide 1 */}
      <section className="bg-charcoal relative">
        <div className="full-bleed">
          <div className="relative h-[62vh] w-full sm:h-[74vh] lg:h-[92vh]">
            <Image
              src={ARTICLE.hero}
              alt="Couple during their pre-wedding photoshoot"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Scrim so the overlaid type stays legible on any photo */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/45" />

            <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
              <p className="font-commuter-sans mb-4 text-[10px] tracking-[0.4em] text-white/80 uppercase sm:text-[11px]">
                {ARTICLE.category}
              </p>
              <h1 className="font-epicene-display max-w-[880px] text-[32px] leading-[1.12] font-light tracking-[0.02em] text-white uppercase sm:text-[46px] md:text-[56px] lg:text-[64px]">
                {ARTICLE.title}
              </h1>
              <p className="font-commuter-sans mt-5 text-[10px] tracking-[0.3em] text-white/70 uppercase sm:text-[11px]">
                {ARTICLE.date} · {ARTICLE.readTime}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — centered eyebrow + heading + intro copy, mirrors "WE CREATE / UNFORGETTABLE EXPERIENCES" */}
      <section className="bg-ivory pt-16 pb-14 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
        <div className="mx-auto max-w-[720px] px-5 text-center sm:px-8">
          <p className="font-commuter-sans text-charcoal/60 mb-4 text-[10px] tracking-[0.4em] uppercase sm:text-[11px]">
            The Journal
          </p>
          <h2 className="font-epicene-display mb-6 text-[28px] leading-[1.15] font-light uppercase sm:text-[36px] md:text-[42px]">
            A Session Made for Two
          </h2>
          <p className="font-lora text-charcoal/85 text-[15px] leading-[1.8] sm:text-[16px] sm:leading-[1.85]">
            {ARTICLE.dek}{" "}
            <i>It is the one afternoon on the calendar that belongs only to the couple.</i>
          </p>

          <div className="mx-auto mt-8 h-[2px] w-12 bg-[#D9D5CF] sm:mt-9 sm:w-14" />

          {/* Byline */}
          <div className="mt-8 flex items-center justify-center gap-3 sm:mt-9">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#efe9df] sm:h-11 sm:w-11">
              <Image
                src={ARTICLE.author.avatar}
                alt={ARTICLE.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <p className="font-commuter-sans text-[11px] tracking-[0.08em] uppercase sm:text-[12px]">
                {ARTICLE.author.name}
              </p>
              <p className="font-commuter-sans text-charcoal/55 text-[10px] tracking-[0.06em] uppercase sm:text-[11px]">
                {ARTICLE.author.role}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — two-image row, mirrors the about-page gallery pair */}
      <section className="bg-ivory pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#efe9df]">
              <Image
                src={unsplash(900)}
                alt="Couple portrait, pre-wedding shoot"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#efe9df]">
              <Image
                src={unsplash(900)}
                alt="Candid moment, pre-wedding shoot"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-white pt-12 pb-4 sm:pt-16 lg:pt-20">
        <article className="mx-auto max-w-[680px] px-5 sm:px-8">
          <p className="font-lora text-[17px] leading-[1.9] sm:text-[18px] sm:leading-[1.9]">
            <span className="font-epicene-display float-left mt-1 mr-3 text-[64px] leading-[0.85] font-light sm:text-[76px]">
              L
            </span>
            ong before the seating chart and the send-off sparklers, there is the pre-wedding shoot
            — the one session with no guests, no schedule to keep, and no one watching but the
            photographer. It is where a couple's real chemistry shows up on camera for the first
            time, and it quietly sets the visual language for everything that follows on the big day
            itself.
          </p>

          <h2 className="font-epicene-display mt-10 mb-4 text-[24px] leading-[1.2] font-light sm:text-[28px]">
            Choose a place that means something
          </h2>
          <p className="font-lora mb-6 text-[16px] leading-[1.85] sm:text-[17px]">
            The most affecting pre-wedding photographs rarely come from the most photogenic location
            — they come from the most personal one. The café of your first date, the trail you hiked
            on a whim, the coastline from a trip that mattered. We ask couples to hand us a memory
            before we ever hand them a mood board.
          </p>

          <p className="font-lora mb-6 text-[16px] leading-[1.85] sm:text-[17px]">
            If nowhere feels obvious, lean on texture instead: weathered stone, open water, golden
            fields at the right hour. A location with its own quiet mood will do half the emotional
            work for you.
          </p>

          {/* Pull quote */}
          <blockquote className="border-charcoal/15 my-10 border-t border-b py-8 text-center sm:my-12 sm:py-10">
            <span className="font-epicene-display block text-[40px] leading-none text-[#B08968] sm:text-[48px]">
              “
            </span>
            <p className="font-epicene-display mx-auto max-w-[520px] text-[22px] leading-[1.35] font-light sm:text-[26px]">
              The best pre-wedding photographs aren't posed at all — they're the two of you, caught
              mid-laugh, forgetting the camera exists.
            </p>
          </blockquote>

          <h2 className="font-epicene-display mt-10 mb-4 text-[24px] leading-[1.2] font-light sm:text-[28px]">
            Dress for movement, not just the photograph
          </h2>
          <p className="font-lora mb-6 text-[16px] leading-[1.85] sm:text-[17px]">
            Flowing fabrics, a coat that catches the wind, shoes you can actually walk in — the
            outfits that photograph best are the ones you can forget you're wearing. Save the
            structured, formal pieces for the wedding itself; this shoot rewards ease over
            perfection.
          </p>

          <p className="font-lora mb-6 text-[16px] leading-[1.85] sm:text-[17px]">
            Coordinate tones rather than matching outright. Two or three complementary colors
            against a natural backdrop will always read more intentional than an exact match.
          </p>
        </article>

        {/* Inline image break, full-bleed */}
        <div className="full-bleed my-10 sm:my-14">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            <div className="relative h-[42vh] sm:h-[56vh]">
              <Image
                src={unsplash(900)}
                alt="Couple walking together outdoors"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[42vh] sm:h-[56vh]">
              <Image
                src={unsplash(900)}
                alt="Close portrait from a pre-wedding shoot"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <article className="mx-auto max-w-[680px] px-5 sm:px-8">
          <h2 className="font-epicene-display mt-2 mb-4 text-[24px] leading-[1.2] font-light sm:text-[28px]">
            Shoot for the light, not the clock
          </h2>
          <p className="font-lora mb-6 text-[16px] leading-[1.85] sm:text-[17px]">
            We build every shoot around two windows — the hour after sunrise and the hour before
            sunset — when the light is low, warm, and forgiving. Everything in between is for
            scouting, resting, and letting the two of you simply enjoy being somewhere together.
          </p>
          <p className="font-lora mb-2 text-[16px] leading-[1.85] sm:text-[17px]">
            Treat the session less like a shoot and more like a date with a photographer quietly
            along for it. The photographs that move people later are almost always the ones taken
            when the couple briefly forgot they were being photographed at all.
          </p>
        </article>
      </section>

      {/* Tags + share */}
      <section className="bg-white pt-8 pb-10 sm:pt-10 sm:pb-14">
        <div className="mx-auto max-w-[680px] px-5 sm:px-8">
          <div className="border-charcoal/10 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
            <div className="flex flex-wrap gap-2">
              {ARTICLE.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-commuter-sans border-charcoal/20 rounded-full border px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase sm:text-[11px]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="font-commuter-sans text-charcoal/50 text-[10px] tracking-[0.2em] uppercase">
                Share
              </span>
              {["X", "P", "L"].map((letter) => (
                <button
                  key={letter}
                  aria-label={`Share on ${letter}`}
                  className="border-charcoal/20 hover:bg-charcoal font-commuter-sans flex h-8 w-8 items-center justify-center rounded-full border text-[11px] transition-colors hover:text-white"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Author bio */}
      <section className="bg-white pb-16 sm:pb-20">
        <div className="mx-auto max-w-[680px] px-5 sm:px-8">
          <div className="flex flex-col items-center gap-5 bg-[#efe9df] px-6 py-9 text-center sm:flex-row sm:text-left">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full sm:h-20 sm:w-20">
              <Image
                src={ARTICLE.author.avatar}
                alt={ARTICLE.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-commuter-sans mb-1 text-[11px] tracking-[0.1em] uppercase sm:text-[12px]">
                Written by {ARTICLE.author.name}
              </p>
              <p className="font-commuter-sans text-charcoal/55 mb-2 text-[10px] tracking-[0.08em] uppercase">
                {ARTICLE.author.role}
              </p>
              <p className="font-lora text-charcoal/80 text-[14px] leading-[1.7] sm:text-[15px]">
                Elena has directed pre-wedding and destination shoots on four continents and
                believes the quietest sessions produce the most honest photographs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      <section className="bg-white pb-20 sm:pb-24">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <div className="mb-8 flex items-end justify-between sm:mb-10">
            <h3 className="font-epicene-display text-[22px] font-light uppercase sm:text-[26px]">
              Further Reading
            </h3>
            <Link
              href="/blog"
              className="font-commuter-sans text-[10px] tracking-[0.25em] uppercase underline underline-offset-4 sm:text-[11px]"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {RELATED.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="relative mb-4 aspect-[4/5] overflow-hidden bg-[#efe9df]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="font-commuter-sans mb-2 text-[10px] tracking-[0.25em] text-[#B08968] uppercase">
                  {post.category}
                </p>
                <h4 className="font-epicene-display mb-1.5 text-[18px] leading-[1.25] font-light sm:text-[20px]">
                  {post.title}
                </h4>
                <p className="font-commuter-sans text-charcoal/50 text-[10px] tracking-[0.08em] uppercase">
                  {post.date}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
