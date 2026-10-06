import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://weddinggoosebumps.com";

  // 1. Core structural static pages
  const staticPages = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/gallery`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/offerings`, lastModified: new Date() },
  ];

  try {
    // 2. Fetch all dynamic sub-page slugs from your Prisma database
    const dynamicPages = await prisma.page.findMany({
      select: { slug: true },
    });

    const dynamicUrls = dynamicPages
      .filter((page) => page.slug !== "/") // Skip homepage duplicate
      .map((page) => {
        // Clean formatting for slash placement
        const cleanSlug = page.slug.startsWith("/") ? page.slug : `/${page.slug}`;
        return {
          url: `${baseUrl}${cleanSlug}`,
          lastModified: new Date(),
        };
      });

    return [...staticPages, ...dynamicUrls];
  } catch (error) {
    // Fallback if the database fails to respond during compilation
    return staticPages;
  }
}
