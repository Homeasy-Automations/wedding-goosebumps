import { getPageMetadata } from '@/lib/seo';
import SeoScripts from '@/components/seo-scripts';

export async function generateMetadata() {
  return await getPageMetadata('/offerings');
}

export default function OfferingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SeoScripts slug="/offerings" />
      {children}
    </>
  );
}
