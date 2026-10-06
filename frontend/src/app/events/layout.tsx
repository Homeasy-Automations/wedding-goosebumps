import { getPageMetadata } from "@/lib/seo";
import SeoScripts from "@/components/seo-scripts";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return await getPageMetadata("/events");
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SeoScripts slug="/events" />
      {children}
    </>
  );
}
