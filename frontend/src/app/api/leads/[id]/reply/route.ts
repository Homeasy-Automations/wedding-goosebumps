import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { logActivity } from "@/lib/logger";
import { sendLeadReplyEmail } from "@/lib/mail";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/leads/[id]/reply
 * Protected: Dispatch a branded email response to a prospective client from CMS
 */
export async function POST(req: NextRequest, context: RouteContext) {
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

    const json = await req.json();
    const { subject, message } = json;

    if (!subject || typeof subject !== "string" || !subject.trim()) {
      return NextResponse.json({ error: "Email subject is required" }, { status: 400 });
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Email message content is required" }, { status: 400 });
    }

    // Dispatch email
    const mailResult = await sendLeadReplyEmail({
      to: lead.email,
      leadName: lead.name,
      subject: subject.trim(),
      message: message.trim(),
    });

    if (!mailResult.success) {
      return NextResponse.json(
        { error: mailResult.error || "Failed to send email. Please check your SMTP settings." },
        { status: 502 }
      );
    }

    // Automatically transition 'New' leads to 'Contacted'
    const newStatus = lead.status === "New" ? "Contacted" : lead.status;
    const timestampNote = `\n[Email sent on ${new Date().toLocaleDateString()} by ${session.user.name || "Admin"}]: ${subject.trim()}`;
    const updatedNotes = lead.notes ? `${lead.notes}\n${timestampNote}` : timestampNote.trim();

    await prisma.lead.update({
      where: { id },
      data: {
        status: newStatus,
        notes: updatedNotes,
      },
    });

    // Record activity log
    await logActivity({
      action: "Sent Email to Lead",
      module: "Mail",
      userId: session.user.id,
      details: {
        leadId: lead.id,
        to: lead.email,
        subject: subject.trim(),
        simulated: mailResult.simulated || false,
      },
    });

    return NextResponse.json({
      success: true,
      messageId: mailResult.messageId,
      simulated: mailResult.simulated || false,
      newStatus,
    });
  } catch (error) {
    console.error("[LEAD_REPLY_EMAIL_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
