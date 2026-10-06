// src/app/galleries/[slug]/page.tsx
import Image from "next/image";
import Navigation from "@/components/sections/navigation";
import { notFound } from "next/navigation";
import galleries from "../image-gallery";

type Image = { src: string; width: number; height: number; alt?: string };
const data = galleries as Record<string, Image[]>;

export default async function GallerySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const images = data[slug];
  if (!images) notFound();

  return (
    <main className="bg-ivory text-charcoal">
      <Navigation />
      <section className="py-10">
        <div className="mx-auto w-full max-w-[1060px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="columns-1 gap-14 [column-fill:_balance] sm:columns-2 lg:columns-2 xl:columns-2 2xl:columns-3">
            {images.map(({ src, width, height, alt }, i) => (
              <figure key={src} className="mb-14 break-inside-avoid">
                <Image
                  src={src}
                  alt={alt ?? ""}
                  width={width}
                  height={height}
                  className="block h-auto w-full rounded"
                  sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 33vw"
                  priority={i < 3}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return Object.keys(galleries).map((slug) => ({ slug }));
}
