// next.config.ts
import type { NextConfig } from "next";
import path from "node:path";

const ASSET_HOST = process.env.NEXT_PUBLIC_ASSET_BASE ?? "https://img.weddinggoosebumps.com"; // R2 CDN

const nextConfig: NextConfig = {
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: false,
    remotePatterns: [
      { protocol: "https", hostname: "img.weddinggoosebumps.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  async rewrites() {
    return [
      { source: "/logo/:path*", destination: `${ASSET_HOST}/logo/:path*` },
      { source: "/about/:path*", destination: `${ASSET_HOST}/about/:path*` },
      { source: "/about-page/:path*", destination: `${ASSET_HOST}/about-page/:path*` },
      { source: "/footer/:path*", destination: `${ASSET_HOST}/footer/:path*` },
      { source: "/galleries-page/:path*", destination: `${ASSET_HOST}/galleries-page/:path*` },
      { source: "/gallery/:path*", destination: `${ASSET_HOST}/gallery/:path*` },
      { source: "/journal-section/:path*", destination: `${ASSET_HOST}/journal-section/:path*` },
      {
        source: "/kind-words-section/:path*",
        destination: `${ASSET_HOST}/kind-words-section/:path*`,
      },
      {
        source: "/quintessential-section/:path*",
        destination: `${ASSET_HOST}/quintessential-section/:path*`,
      },
      {
        source: "/service-level-section/:path*",
        destination: `${ASSET_HOST}/service-level-section/:path*`,
      },
      { source: "/offerings-page/:path*", destination: `${ASSET_HOST}/offerings-page/:path*` },
      { source: "/videos/:path*", destination: `${ASSET_HOST}/videos/:path*` },
      { source: "/inquire-page/:path*", destination: `${ASSET_HOST}/inquire-page/:path*` },
    ];
  },

  webpack: (config) => {
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
};

export default nextConfig;
