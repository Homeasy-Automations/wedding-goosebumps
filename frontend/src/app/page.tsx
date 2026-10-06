import HeroVideo from "@/components/sections/hero-video";
import Navigation from "@/components/sections/navigation";
import OfferingsSection from "@/components/sections/offerings";
import GallerySection from "@/components/sections/gallery";
import ScrollVideo1 from "@/components/sections/scroll-video-1";
import ImageSection2025 from "@/components/sections/image-section-2025";
import ServiceLevelSection from "@/components/sections/service-level";
import ScrollVideo3 from "@/components/sections/scroll-video-3";
import KindWords from "@/components/sections/kind-words";
import JournalSection from "@/components/sections/journal";
import Footer from "@/components/sections/footer";
import { getPageMetadata } from "@/lib/seo";
import SeoScripts from "@/components/seo-scripts";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return {
    title: "Wedding Goosebumps | Luxury Wedding Planner In India",
    description: "Luxury Wedding Planner In India",
  };
}

export default function Home() {
  return (
    <main>
      <SeoScripts slug="/" />
      <Navigation />
      <HeroVideo />
      <GallerySection />
      <OfferingsSection />
      <ScrollVideo1 />
      <ImageSection2025 />
      <ServiceLevelSection />
      <KindWords />
      <JournalSection />
      <ScrollVideo3 />
      <Footer />
    </main>
  );
}
