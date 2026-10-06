import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import ServiceLevelSection from "@/components/sections/service-level";
import KindWords from "@/components/sections/kind-words";
import BlogHero from "@/components/blogSections/blogHero";
import BlogJournal from "@/components/blogSections/blogJournal";
import ReadingProgress from "@/components/ReadingProgress";

const unsplash = (w: number) =>
  `https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=${w}&auto=format&fit=crop&q=80`;

const ARTICLE = {
  category: "PRE-WEDDING",
  title: "The Art of the Pre-Wedding Shoot",
  dek: "Before the vows, before the guest list, there is one afternoon that belongs only to the two of you. Here is how we make it count.",
  author: {
    name: "Ali Waris Khan",
    role: "Founder & Creative Director",
    avatar: unsplash(200),
  },
  date: "July 17, 2026",
  readTime: "6 min read",
  hero: unsplash(1400),
  tags: ["Pre-Wedding", "Photography", "Styling", "Couples"],
};

export default function BlogPostPageCopy2() {
  return (
    <main className="bg-ivory text-charcoal">
      <div className="relative z-50">
        <Navigation />
      </div>
      <ReadingProgress />

      <BlogHero ART={ARTICLE} />
      <BlogJournal ART={ARTICLE} />
      <ServiceLevelSection />
      <KindWords />
      <Footer />
    </main>
  );
}
