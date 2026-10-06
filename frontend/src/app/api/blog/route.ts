import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { logActivity } from "@/lib/logger";

/**
 * GET /api/blog
 * Fetch blog posts with optional search, status filtering, and pagination
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "All";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "20", 10)));
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status && status !== "All") {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { slug: { contains: search } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
          categories: { include: { category: true } },
          tags: { include: { tag: true } },
        },
        skip,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[BLOG_GET]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

/**
 * POST /api/blog
 * Protected: Create a new blog post
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await req.json();
    const { title, slug, status } = json;

    if (!title || !slug) {
      return NextResponse.json({ error: "Missing title or slug" }, { status: 400 });
    }

    const cleanSlug = slug.trim().startsWith("/") ? slug.trim().substring(1) : slug.trim();

    const post = await prisma.blogPost.create({
      data: {
        title: title.trim(),
        slug: cleanSlug,
        status: status || "Draft",
        authorId: session.user.id || null,
      },
    });

    await logActivity({
      action: "Created Blog Post",
      module: "Blog",
      userId: session.user.id,
      details: { postId: post.id, title: post.title, slug: post.slug },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("[BLOG_POST]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
