import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { logActivity } from "@/lib/logger";

/**
 * GET /api/pages
 * Protected: List all pages with section counts
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";

    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { slug: { contains: search } },
      ];
    }

    const pages = await prisma.page.findMany({
      where,
      orderBy: { createdAt: "asc" },
      include: {
        _count: {
          select: { sections: true },
        },
      },
    });

    return NextResponse.json({ success: true, pages });
  } catch (error) {
    console.error("[PAGES_GET]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

/**
 * POST /api/pages
 * Protected: Create a new page
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

    const page = await prisma.page.create({
      data: {
        title: title.trim(),
        slug: slug.trim().startsWith("/") ? slug.trim() : `/${slug.trim()}`,
        status: status || "Draft",
      },
    });

    await logActivity({
      action: "Created Page",
      module: "Pages",
      userId: session.user.id,
      details: { pageId: page.id, title: page.title, slug: page.slug },
    });

    return NextResponse.json({ success: true, page });
  } catch (error) {
    console.error("[PAGES_POST]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
