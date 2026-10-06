import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Navigation from "@/components/sections/navigation";

export const dynamic = "force-dynamic";

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

  // SEO mapping could be done via generateMetadata but for now we just render
  return (
    <main className="bg-ivory text-charcoal min-h-screen">
      <div className="relative z-50">
        <Navigation />
      </div>

      <section className="bg-white pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-7">
          <div className="mb-10 text-center">
            <h1 className="font-epicene-display mb-6 text-[32px] leading-[1.1] font-light sm:text-[42px] md:text-[50px]">
              {finalPost.title}
            </h1>
            <p className="font-commuter-sans text-charcoal/60 text-[10px] tracking-[0.2em] uppercase sm:text-[12px]">
              {finalPost.publishDate
                ? new Date(finalPost.publishDate).toLocaleDateString()
                : new Date(finalPost.createdAt).toLocaleDateString()}
            </p>
          </div>

          {finalPost.coverImage && (
            <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden bg-[#efe9df]">
              <Image
                src={finalPost.coverImage}
                alt={finalPost.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <article
            className="prose prose-lg prose-headings:font-epicene-display prose-headings:font-light prose-p:font-lora prose-p:text-charcoal/90 prose-a:text-[#B5A484] mx-auto max-w-none text-justify leading-[1.8]"
            dangerouslySetInnerHTML={{ __html: finalPost.body || finalPost.excerpt || "" }}
          />
        </div>
      </section>

      {/* Decorative divider */}
      <div className="bg-ivory py-12">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-6 sm:gap-4">
          <div className="bg-charcoal/20 h-px flex-1" />
          <span className="text-2xl text-[#B5A484] sm:text-3xl">∞</span>
          <div className="bg-charcoal/20 h-px flex-1" />
        </div>
      </div>

      <section className="pb-20 text-center">
        <Link
          href="/blog"
          className="font-lora inline-flex items-center justify-center border border-[#C2A770] px-6 py-3 text-[10px] tracking-[0.2em] text-[#C2A770] uppercase transition-colors hover:bg-[#C2A770] hover:text-white sm:px-8 sm:text-xs"
        >
          Back to Journal
        </Link>
      </section>
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
