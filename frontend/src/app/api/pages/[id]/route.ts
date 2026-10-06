import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { logActivity } from "@/lib/logger";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/pages/[id]
 * Protected: Fetch a page and its ordered sections
 */
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const page = await prisma.page.findUnique({
      where: { id },
      include: {
        sections: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, page });
  } catch (error) {
    console.error("[PAGE_GET_ERROR]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

/**
 * PUT /api/pages/[id]
 * Protected: Update page metadata, SEO, and details
 */
export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const json = await req.json();
    const {
      title,
      slug,
      status,
      metaTitle,
      metaKeywords,
      metaDescription,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogImage,
      robots,
      structuredData,
    } = json;

    const page = await prisma.page.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(status !== undefined && { status }),
        ...(metaTitle !== undefined && { metaTitle }),
        ...(metaKeywords !== undefined && { metaKeywords }),
        ...(metaDescription !== undefined && { metaDescription }),
        ...(canonicalUrl !== undefined && { canonicalUrl }),
        ...(ogTitle !== undefined && { ogTitle }),
        ...(ogDescription !== undefined && { ogDescription }),
        ...(ogImage !== undefined && { ogImage }),
        ...(robots !== undefined && { robots }),
        ...(structuredData !== undefined && { structuredData }),
      },
    });

    await logActivity({
      action: "Updated Page",
      module: "Pages",
      userId: session.user.id,
      details: { pageId: page.id, title: page.title, slug: page.slug },
    });

    return NextResponse.json({ success: true, page });
  } catch (error) {
    console.error("[PAGE_UPDATE_ERROR]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

/**
 * DELETE /api/pages/[id]
 * Protected: Remove page
 */
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const existing = await prisma.page.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    await prisma.page.delete({ where: { id } });

    await logActivity({
      action: "Deleted Page",
      module: "Pages",
      userId: session.user.id,
      details: { pageId: id, title: existing.title, slug: existing.slug },
    });

    return NextResponse.json({ success: true, message: "Page deleted" });
  } catch (error) {
    console.error("[PAGE_DELETE_ERROR]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
