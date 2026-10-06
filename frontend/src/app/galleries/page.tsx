

import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";

const HERO = {
  src: "/about-page/slide1/1.jpg", // keep as-is (add extension if needed)
  width: 1200,
  height: 1400,
  alt: "Elegant outdoor table setting",
};

export default function GalleriesPage() {
  // Prepare gallery card data as an array
  const galleryCards = [
    {
      image: "/galleries-page/headers/Tanya.jpg",
      heading: "Crafted with love ",
      subheading: "Tanya and Aayush",
      slug: "1",
    },
    {
      image: "/galleries-page/headers/Tatsav.jpg",
      heading: "Timeless modern traditions",
      subheading: "Tatsav & Vidhi",
      slug: "2",
    },
    {
      image: "/galleries-page/headers/ashish.jpg",
      heading: "Ethereal floral elegance",
      subheading: "Ashish and Juhi",
      slug: "3",
    },
    {
      image: "/galleries-page/headers/mohit.jpg",
      heading: "Culture meets joy",
      subheading: "Mohit & Hitika",
      slug: "5",
    },
    {
      image: "/galleries-page/headers/dharam.jpg",
      heading: "A majestic romance",
      subheading: "Harshil & Akanksha",
      slug: "6",
    },
    {
      image: "/galleries-page/headers/saval.jpg",
      heading: "Royal timeless luxury",
      subheading: "Dharam & Rajivi ",
      slug: "7",
    },
    {
      image: "/galleries-page/headers/mukesh.jpg",
      heading: "Love through laughter",
      subheading: "Saval & Romil ",
      slug: "8",
    },
    {
      image: "/galleries-page/headers/riya.jpg",
      heading: "Heritage in elegance",
      subheading: "Mukesh and Yamini",
      slug: "10",
    },
  ];

  return (
    <main className="bg-ivory text-charcoal">
      <Navigation />

      {/* ────────────────────────────── SLIDE 1 — Triple-image hero */}
      <section className="relative h-[85vh] w-screen overflow-hidden lg:h-[100vh]">
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3">
          <div className="relative">
            <Image
              src="/galleries-page/slide1/1.jpg"
              alt="Gallery hero 1"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/15" />
          </div>
          <div className="relative hidden md:block">
            <Image
              src="/galleries-page/slide1/2.jpg"
              alt="Gallery hero 2"
              fill
              className="object-cover"
              loading="eager"
              priority={true}
            />
            <div className="absolute inset-0 bg-black/15" />
          </div>
          <div className="relative hidden md:block">
            <Image
              src="/galleries-page/slide1/3.jpg"
              alt="Gallery hero 3"
              fill
              className="object-cover"
              loading="eager"
              priority={true}
            />
            <div className="absolute inset-0 bg-black/15" />
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div>
            <p className="mb-3 text-[11px] tracking-[0.35em] text-white/85 uppercase">
              Explore the
            </p>
            <h1 className="font-epicene-display text-[34px] leading-tight text-white/95 uppercase sm:text-[44px] md:text-[56px]">
              Galleries
            </h1>
          </div>
        </div>
      </section>

      {/* ────────────────────────────── SLIDE 2 — Two cards */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-16 px-6 md:grid-cols-2 md:gap-10">
          {galleryCards.slice(0, 4).map((card, idx) => (
            <GalleryCard
              key={card.slug}
              image={card.image}
              heading={card.heading}
              subheading={card.subheading}
              slug={card.slug}
              idx={idx}
            />
          ))}
        </div>
      </section>

      {/* ────────────────────────────── SLIDE 3 — Full-bleed video */}
      <section className="relative h-[70vh] w-screen overflow-hidden md:h-[100vh]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/gallery-page-vids/VIMAL WED TEASER 20sec 12.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/20" />
      </section>

      {/* ────────────────────────────── SLIDE 2 — Two cards */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-16 px-6 md:grid-cols-2 md:gap-10">
          {galleryCards.slice(4).map((card, idx) => (
            <GalleryCard
              key={card.slug}
              image={card.image}
              heading={card.heading}
              subheading={card.subheading}
              slug={card.slug}
              idx={idx + 4}
            />
          ))}
        </div>
      </section>

      <section className="bg-ivory pt-6 pb-16 lg:pt-12">
        {/* — Heading & intro copy */}
        <div className="container mx-auto mt-10 mb-1 px-6 text-center lg:px-8">
          {/* WE CREATE → Commuter Sans 400 */}
          <h3 className="font-commuter-sans text-charcoal mb-1 text-sm font-normal tracking-[0.3em] uppercase">
            WE CREATE
          </h3>
          {/* UNFORGETTABLE word only → Epicene Display Light 400 */}
          <h2 className="text-charcoal mb-1 font-[Epicene_Display] text-4xl leading-tight font-light tracking-tight uppercase lg:text-5xl xl:text-6xl">
            <span className="font-cormorant" style={{ fontWeight: 60 }}>
              unforgettable
            </span>{" "}
            <span className="font-cormorant" style={{ fontWeight: 60 }}>
              experiences
            </span>
          </h2>
          <div className="mx-auto my-8 h-[2.5px] w-30 bg-[#D9D5CF]" />

          {/* “Wedding Goosebump is a full-service” → Newsreader 300 italic */}
          <p className="font-lora text-charcoal mx-auto max-w-2xl pb-10 text-lg leading-relaxed">
            Wedding Goosebumps is a full-service{" "}
            <em className="italic">luxury wedding design and planning studio,</em> crafting
            emotionally immersive, couture destination weddings across the world’s most iconic
            locations.
          </p>
        </div>

        {/* — Single image, centered, responsive, no cropping */}
        <div className="mx-auto max-w-[1200px] px-3 lg:px-6">
          <figure className="relative w-full">
            <Image
              src={HERO.src}
              alt={HERO.alt}
              width={HERO.width}
              height={HERO.height}
              className="h-auto max-h-[55vh] w-full object-contain"
              loading="eager"
              priority={true}
            />
          </figure>
        </div>
      </section>

      <section className="bg-ivory text-charcoal py-6 pb-25">
        <div className="mx-auto max-w-4xl px-4">
          {" "}
          {/* equal margins: px controls sides */}
          {/* small uppercase heading + underline */}
          <h2 className="font-commuter-sans text-charcoal/80 text-[13px] tracking-[0.3em] uppercase">
            ABOUT WEDDING GOOSEBUMPS
          </h2>
          <div className="h-[2.5px] w-30 bg-[#D9D5CF]" />
          {/* body copy */}
          <p className="font-lora mt-2 text-[18px] leading-[1.9] md:text-[19px]">
            Wedding Goosebump is a premier wedding designing and planning studio based in India,
            specializing in crafting soul-stirring luxury destination weddings across Europe, the
            Middle East, and India. From the shores of Lake Como to the royal palaces of
            Rajasthan,&nbsp;
            <em className="italic">
              we turn once-in-a-lifetime moments into emotionally immersive celebrations.
            </em>{" "}
            We take the stress out of planning a wedding away from home. Our expert team bridges
            cultures, languages, and local nuances — handling everything from logistics to luxury
            detailing with precision and heart. Whether you dream of a cliffside vow in Santorini or
            a regal baraat in Jaipur, we’re here to turn your vision into goosebump-worthy reality.
          </p>
          {/* offerings link */}
          <Link href="/offerings" className="mt-2 mb-0 inline-block">
            <span className="font-commuter-sans text-gold border-gold border-b-[1.5px] text-[12px] tracking-[0.3em] uppercase">
              OUR OFFERINGS
            </span>
          </Link>
        </div>
      </section>

      {/* ────────────────────────────── SLIDE 3 — Full-bleed video */}
      <section className="relative mb-16 h-[70vh] w-screen overflow-hidden sm:mb-20 md:mb-24 md:h-[100vh]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/gallery-page-vids/YASH NISHI WED HIGHLIGHT 20 sec 9.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/20" />
      </section>

      <Footer />
    </main>
  );
}

function GalleryCard({
  image,
  heading,
  subheading,
  slug,
  idx,
}: {
  image: string;
  heading: string;
  subheading: string;
  slug: string;
  idx: number;
}) {
  return (
    <article>
      <Link href={`/galleries/${slug}`} className="group block">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#efe9df]">
          <Image
            src={image}
            alt={heading}
            fill
            className="object-cover transition-transform group-hover:scale-[1.01]"
            loading={idx < 10 ? "eager" : "lazy"}
            priority={idx < 10}
          />
        </div>

        <h3 className="font-epicene-display mt-6 text-[20px] tracking-[0.02em] uppercase md:text-[22px]">
          {heading}
        </h3>

        <div className="bg-charcoal/15 mt-3 h-[2px] w-16" />

        <p className="text-gold border-gold mt-3 pb-1 text-[12px] tracking-[0.25em] uppercase">
          {subheading}
        </p>
      </Link>
    </article>
  );
}
