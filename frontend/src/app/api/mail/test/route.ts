import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { logActivity } from "@/lib/logger";
import { sendTestEmail } from "@/lib/mail";

/**
 * POST /api/mail/test
 * Protected: Send a test email to verify SMTP configuration
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await req.json().catch(() => ({}));
    const { to } = json;

    const result = await sendTestEmail(to);

    await logActivity({
      action: "Triggered SMTP Test Email",
      module: "Mail",
      userId: session.user.id,
      details: {
        to: to || "Admin Default",
        success: result.success,
        simulated: result.simulated || false,
        error: result.error,
      },
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Failed to dispatch test email",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
      simulated: result.simulated || false,
      message: result.simulated
        ? "Test email was simulated. Configure SMTP credentials in .env for live dispatch."
        : "Test email was successfully sent via live SMTP server!",
    });
  } catch (error) {
    console.error("[MAIL_TEST_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
