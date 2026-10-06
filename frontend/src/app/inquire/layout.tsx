import { getPageMetadata } from '@/lib/seo';
import SeoScripts from '@/components/seo-scripts';

export async function generateMetadata() {
  return await getPageMetadata('/inquire');
}

export default function InquireLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SeoScripts slug="/inquire" />
      {children}
    </>
  );
}
