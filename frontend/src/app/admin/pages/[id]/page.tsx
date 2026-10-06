import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import PageEditor from "@/components/admin/page-editor";

export const dynamic = "force-dynamic";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({
    where: { id },
    include: {
      sections: {
        orderBy: { order: "asc" }
      }
    }
  });

  if (!page) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">Edit Page: {page.title}</h1>
      <PageEditor initialPage={page} />
    </div>
  );
}
