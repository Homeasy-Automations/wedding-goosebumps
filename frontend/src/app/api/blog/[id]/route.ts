import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { logActivity } from "@/lib/logger";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
        sections: { orderBy: { sortOrder: "asc" } },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("[BLOG_GET]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const data = await req.json();

    const post = await prisma.blogPost.update({
      where: { id },
      data,
    });

    await logActivity({
      action: "Updated Blog Post",
      module: "Blog",
      userId: session.user.id,
      details: { postId: post.id, title: post.title, slug: post.slug },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("[BLOG_PUT]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const existing = await prisma.blogPost.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await prisma.blogPost.delete({ where: { id } });

    await logActivity({
      action: "Deleted Blog Post",
      module: "Blog",
      userId: session.user.id,
      details: { postId: id, title: existing.title, slug: existing.slug },
    });

    return NextResponse.json({ success: true, message: "Blog post deleted" });
  } catch (error) {
    console.error("[BLOG_DELETE]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
