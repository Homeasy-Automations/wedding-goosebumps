import { getPageMetadata } from '@/lib/seo';
import SeoScripts from '@/components/seo-scripts';

export async function generateMetadata() {
  return await getPageMetadata('/galleries');
}

export default function GalleriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SeoScripts slug="/galleries" />
      {children}
    </>
  );
}
