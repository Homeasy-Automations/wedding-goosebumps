import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getMailConfig } from "@/lib/mail";

/**
 * GET /api/dashboard/stats
 * Protected: Aggregates real-time business metrics, recent activities, and service status
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [
      pagesCount,
      publishedPagesCount,
      blogCount,
      publishedBlogCount,
      totalLeadsCount,
      newLeadsCount,
      contactedLeadsCount,
      closedLeadsCount,
      recentLeads,
      recentLogs,
    ] = await Promise.all([
      prisma.page.count(),
      prisma.page.count({ where: { status: "Published" } }),
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { status: "Published" } }),
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "New" } }),
      prisma.lead.count({ where: { status: "Contacted" } }),
      prisma.lead.count({ where: { status: "Closed" } }),
      prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          status: true,
          createdAt: true,
          sourcePage: true,
        },
      }),
      prisma.activityLog.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { name: true, email: true },
          },
        },
      }),
    ]);

    const mailConfig = getMailConfig();

    return NextResponse.json({
      success: true,
      metrics: {
        pages: {
          total: pagesCount,
          published: publishedPagesCount,
        },
        blog: {
          total: blogCount,
          published: publishedBlogCount,
        },
        leads: {
          total: totalLeadsCount,
          new: newLeadsCount,
          contacted: contactedLeadsCount,
          closed: closedLeadsCount,
        },
      },
      recentLeads,
      recentLogs,
      mailStatus: {
        isConfigured: mailConfig.isConfigured,
        host: mailConfig.host || null,
        from: mailConfig.from,
        adminEmail: mailConfig.adminEmail,
      },
    });
  } catch (error) {
    console.error("[DASHBOARD_STATS_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
