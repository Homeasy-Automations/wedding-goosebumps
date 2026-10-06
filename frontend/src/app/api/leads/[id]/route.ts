import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { logActivity } from "@/lib/logger";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/leads/[id]
 * Fetch a single lead by ID
 */
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("[LEAD_GET_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * PATCH /api/leads/[id]
 * Update lead properties: status, notes, assignedTo
 */
export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const existing = await prisma.lead.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const json = await req.json();
    const { status, notes, assignedTo } = json;

    const dataToUpdate: any = {};
    if (status !== undefined) dataToUpdate.status = status;
    if (notes !== undefined) dataToUpdate.notes = notes;
    if (assignedTo !== undefined) dataToUpdate.assignedTo = assignedTo;

    const updated = await prisma.lead.update({
      where: { id },
      data: dataToUpdate,
    });

    // Record activity log
    await logActivity({
      action: status && status !== existing.status ? `Updated Lead Status to ${status}` : "Updated Lead Details",
      module: "Leads",
      userId: session.user.id,
      details: {
        leadId: id,
        previousStatus: existing.status,
        newStatus: status || existing.status,
        hasNotesChanged: notes !== undefined,
      },
    });

    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    console.error("[LEAD_UPDATE_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * DELETE /api/leads/[id]
 * Remove lead from database
 */
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const existing = await prisma.lead.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    await prisma.lead.delete({
      where: { id },
    });

    await logActivity({
      action: "Deleted Lead",
      module: "Leads",
      userId: session.user.id,
      details: {
        leadId: id,
        name: existing.name,
        email: existing.email,
      },
    });

    return NextResponse.json({ success: true, message: "Lead successfully removed" });
  } catch (error) {
    console.error("[LEAD_DELETE_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
