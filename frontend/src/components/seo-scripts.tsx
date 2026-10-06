import prisma from "@/lib/prisma";

export default async function SeoScripts({ slug }: { slug: string }) {
  try {
    const page = await prisma.page.findUnique({
      where: { slug }
    });

    if (!page || !page.structuredData) {
      return null;
    }

    return (
      <div dangerouslySetInnerHTML={{ __html: page.structuredData }} />
    );
  } catch (error) {
    return null;
  }
}
