import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { verifySmtp, getMailConfig } from "@/lib/mail";

/**
 * GET /api/mail
 * Protected: Check mail service configuration and SMTP connection health
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const testConnection = searchParams.get("verify") === "true";

    if (testConnection) {
      const verification = await verifySmtp();
      return NextResponse.json({
        success: true,
        ...verification,
      });
    }

    const config = getMailConfig();
    return NextResponse.json({
      success: true,
      configured: config.isConfigured,
      host: config.host || null,
      port: config.port,
      secure: config.secure,
      user: config.user ? `${config.user.substring(0, 3)}***` : null,
      from: config.from,
      adminEmail: config.adminEmail,
    });
  } catch (error) {
    console.error("[MAIL_STATUS_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
