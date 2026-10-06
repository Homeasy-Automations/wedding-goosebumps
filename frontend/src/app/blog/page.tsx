import React from "react";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import Navigation from "@/components/sections/navigation";

export const dynamic = "force-dynamic";

export default async function BlogListingPage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "Published" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="bg-ivory text-charcoal min-h-screen">
      <div className="relative z-50">
        <Navigation />
      </div>

      <section className="bg-white pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-7">
          <div className="mb-16 text-center">
            <h1 className="font-epicene-display mb-4 text-[32px] leading-[1.1] font-light sm:text-[42px] md:text-[50px]">
              Journal
            </h1>
            <p className="font-lora text-charcoal/80 mx-auto max-w-2xl text-[15px] sm:text-[17px]">
              Stories, inspiration, and insights from our latest celebrations around the world.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-charcoal/60 font-lora py-20 text-center">
              No journal entries published yet. Check back soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog${post.slug.startsWith("/") ? post.slug : `/${post.slug}`}`}
                  className="group block"
                >
                  <div className="relative mb-5 aspect-[4/3] w-full overflow-hidden bg-[#efe9df]">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="font-epicene-display absolute inset-0 flex items-center justify-center text-4xl text-[#B5A484]/30">
                        WG
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-commuter-sans text-charcoal/50 mb-2 text-[9px] tracking-[0.2em] uppercase sm:text-[10px]">
                      {post.publishDate
                        ? new Date(post.publishDate).toLocaleDateString()
                        : new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <h2 className="font-epicene-display mb-3 text-[22px] leading-[1.2] transition-colors group-hover:text-[#C2A770] sm:text-[24px]">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="font-lora text-charcoal/80 line-clamp-3 text-[14px] leading-[1.6]">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export const metadata = {
  title: "Journal | Wedding Goosebumps",
  description: "Stories, inspiration, and insights from our latest celebrations around the world.",
};
