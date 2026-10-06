import { getPageMetadata } from '@/lib/seo';
import SeoScripts from '@/components/seo-scripts';

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return await getPageMetadata('/about');
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SeoScripts slug="/about" />
      {children}
    </>
  );
}
