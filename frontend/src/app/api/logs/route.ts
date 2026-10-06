import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { logActivity } from "@/lib/logger";

/**
 * GET /api/logs
 * Protected: Fetch activity audit logs with search, module filtering, and pagination
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const moduleFilter = searchParams.get("module")?.trim() || "All";
    const search = searchParams.get("search")?.trim() || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "50", 10)));
    const skip = (page - 1) * limit;

    const where: any = {};

    if (moduleFilter && moduleFilter !== "All") {
      where.module = moduleFilter;
    }

    if (search) {
      where.OR = [
        { action: { contains: search } },
        { details: { contains: search } },
        { user: { name: { contains: search } } },
        { user: { email: { contains: search } } },
      ];
    }

    const [logs, total] = await Promise.all([
      prisma.activityLog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { id: true, name: true, email: true, role: true },
          },
        },
        skip,
        take: limit,
      }),
      prisma.activityLog.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      logs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[LOGS_GET_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * DELETE /api/logs
 * Protected: Clear activity logs (restricted to Super Admin)
 */
export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Role check if desired, or allow all authenticated admins
    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get("olderThanDays") || "0", 10);

    let deletedCount = 0;

    if (days > 0) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      const res = await prisma.activityLog.deleteMany({
        where: {
          createdAt: { lt: cutoffDate },
        },
      });
      deletedCount = res.count;
    } else {
      const res = await prisma.activityLog.deleteMany({});
      deletedCount = res.count;
    }

    // Record the clear event
    await logActivity({
      action: days > 0 ? `Pruned logs older than ${days} days` : "Cleared All Activity Logs",
      module: "System",
      userId: session.user.id,
      details: { deletedCount },
    });

    return NextResponse.json({
      success: true,
      message: `Cleared ${deletedCount} logs`,
      deletedCount,
    });
  } catch (error) {
    console.error("[LOGS_DELETE_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
