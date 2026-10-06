import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import ServiceLevelSection from "@/components/sections/service-level";
import KindWords from "@/components/sections/kind-words";
import BlogHero from "@/components/blogSections/blogHero";
import BlogJournal from "@/components/blogSections/blogJournal";
import BlogServices from "@/components/blogSections/blogServices";
import BlogKindWords from "@/components/blogSections/blogKindWords";

export const dynamic = "force-dynamic";
const unsplash = (w: number) =>
  `https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=${w}&auto=format&fit=crop&q=80`;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Use a transaction or single query depending on relations (author, etc)
  const post = await prisma.blogPost.findUnique({
    where: { slug: slug.startsWith("/") ? slug : `/${slug}` },
  });

  // If not found by exact slug, try with/without leading slash
  const finalPost =
    post ||
    (await prisma.blogPost.findUnique({
      where: { slug: slug.startsWith("/") ? slug.substring(1) : slug },
    }));

  if (!finalPost) {
    notFound();
  }

  const heroSection = await prisma.blogSection.findFirst({
    where: {
      blogId: finalPost.id,
      section: "hero",
    },
  });

  const heroContent = (heroSection?.content ?? {}) as {
    category?: string;
    heroImage?: string;
  };

  const heroData = {
    category: heroContent.category || "",
    title: finalPost.title,
    dek: finalPost.excerpt || "",
    author: {
      name: "Ali Waris Khan",
      role: "Founder & Creative Director",
      avatar: unsplash(200),
    },
    date: new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(finalPost.publishDate ?? finalPost.createdAt),

    readTime: "6 min read",
    hero: heroContent.heroImage || finalPost.coverImage || "",
    tags: [],
  };

  const serviceSection = await prisma.blogSection.findFirst({
    where: {
      blogId: finalPost.id,
      section: "service",
    },
  });

  const serviceContent = (serviceSection?.content ?? {}) as {
    heading?: string;
    paragraph?: string;
    image?: string;
  };

  const kindWordsSection = await prisma.blogSection.findFirst({
    where: {
      blogId: finalPost.id,
      section: "kindWords",
    },
  });

  const kindWords =
    (kindWordsSection?.content as {
      heading?: string;
      subheading?: string;
      paragraph?: string;
      smallImage?: string;
      bigImage?: string;
    }) || {};

  // SEO mapping could be done via generateMetadata but for now we just render
  return (
    <main className="bg-ivory text-charcoal">
      {/* Navbar */}
      <div className="relative z-50">
        <Navigation />
      </div>
      <BlogHero ART={heroData} />
      {/* Section 2 — centered eyebrow + heading + intro copy, mirrors "WE CREATE / UNFORGETTABLE EXPERIENCES" */}
      <BlogJournal ART={heroData} />
      <BlogServices service={serviceContent} />
      {/* Section 3 — two-image row, mirrors the about-page gallery pair */}
      <BlogKindWords kindWords={kindWords} />
      <div className="mx-auto max-w-7xl py-10">
        <div className="h-[5px] rounded-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>

      <Footer />
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post =
    (await prisma.blogPost.findUnique({
      where: { slug: slug.startsWith("/") ? slug : `/${slug}` },
    })) ||
    (await prisma.blogPost.findUnique({
      where: { slug: slug.startsWith("/") ? slug.substring(1) : slug },
    }));

  if (!post) return {};
 
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,

    keywords: post.metaKeywords || "",

    alternates: {
      canonical: post.canonicalUrl,
    },

    openGraph: {
      title: post.ogTitle || post.metaTitle || post.title,
      description: post.ogDescription || post.metaDescription || post.excerpt,
      images: post.ogImage || post.coverImage ? [post.ogImage || post.coverImage] : [],
    },

    robots: post.robots,
  };

 
}
