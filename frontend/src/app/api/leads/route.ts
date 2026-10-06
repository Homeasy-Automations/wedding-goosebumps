import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { logActivity } from "@/lib/logger";
import { sendLeadNotificationToAdmin, sendLeadConfirmationToClient } from "@/lib/mail";

/**
 * GET /api/leads
 * Protected: Fetch leads with filtering, search, pagination, and status breakdown counts
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "All";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "25", 10)));
    const skip = (page - 1) * limit;

    // Build Prisma query condition
    const where: any = {};

    if (status && status !== "All") {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
        { message: { contains: search } },
      ];
    }

    // Run parallel queries: paginated items, total matching items, and status breakdown
    const [leads, totalMatching, allCounts] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.lead.count({ where }),
      prisma.lead.groupBy({
        by: ["status"],
        _count: { _all: true },
      }),
    ]);

    // Format counts
    const statusCounts: Record<string, number> = {
      All: 0,
      New: 0,
      Contacted: 0,
      Qualified: 0,
      Closed: 0,
      Spam: 0,
    };

    allCounts.forEach((group) => {
      statusCounts[group.status] = group._count._all;
      statusCounts.All += group._count._all;
    });

    return NextResponse.json({
      success: true,
      leads,
      pagination: {
        total: totalMatching,
        page,
        limit,
        totalPages: Math.ceil(totalMatching / limit),
      },
      counts: statusCounts,
    });
  } catch (error) {
    console.error("[LEADS_GET_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * POST /api/leads
 * Public: Submit a new inquiry, persist to database, log activity, and dispatch email alerts
 */
export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { name, email, phone, message, sourcePage, utmSource, utmMedium, utmCampaign, hp } = json;

    // Honeypot spam protection (bots filling hidden fields)
    if (hp) {
      return NextResponse.json({ success: true, leadId: "spam-ignored" });
    }

    // Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone?.toString().trim() || null;
    const cleanMessage = message?.toString().trim() || null;
    const cleanSource = sourcePage?.toString().trim() || "/inquire";

    // 1. Create lead in database
    const lead = await prisma.lead.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        message: cleanMessage,
        sourcePage: cleanSource,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
        status: "New",
      },
    });

    // 2. Record in Activity Log
    await logActivity({
      action: "New Lead Received",
      module: "Leads",
      details: {
        leadId: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        sourcePage: lead.sourcePage,
      },
    });

    // 3. Dispatch Emails (Admin Alert + Client Confirmation)
    // We execute them in parallel; failures in email transport will not crash the lead record
    const [adminMailResult, clientMailResult] = await Promise.allSettled([
      sendLeadNotificationToAdmin(lead),
      sendLeadConfirmationToClient(lead),
    ]);

    const adminEmailSuccess =
      adminMailResult.status === "fulfilled" && adminMailResult.value.success;
    const clientEmailSuccess =
      clientMailResult.status === "fulfilled" && clientMailResult.value.success;

    // Log email dispatch events
    if (adminEmailSuccess) {
      await logActivity({
        action: "Email Notification Dispatched",
        module: "Mail",
        details: {
          recipient: "Admin",
          leadId: lead.id,
          simulated: (adminMailResult as any).value?.simulated || false,
        },
      });
    }

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      lead: {
        id: lead.id,
        name: lead.name,
        email: lead.email,
        createdAt: lead.createdAt,
      },
      mailStatus: {
        adminNotified: adminEmailSuccess,
        clientConfirmed: clientEmailSuccess,
      },
    });
  } catch (error) {
    console.error("[LEAD_SUBMISSION_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
