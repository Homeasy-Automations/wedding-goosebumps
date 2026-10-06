import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlogEditor from "@/components/admin/blog-editor";

export const dynamic = "force-dynamic";

export default async function EditBlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">Edit Post</h1>
      <BlogEditor initialPost={post} />
    </div>
  );
}
