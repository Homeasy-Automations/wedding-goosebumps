import nodemailer from "nodemailer";

export interface MailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  adminEmail: string;
  isConfigured: boolean;
}

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export interface SendMailResult {
  success: boolean;
  messageId?: string;
  simulated?: boolean;
  previewUrl?: string;
  error?: string;
}

export interface LeadData {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  message?: string | null;
  sourcePage?: string | null;
  createdAt?: Date;
}

/**
 * Retrieve SMTP configuration from environment variables
 */
export function getMailConfig(): MailConfig {
  const host = process.env.SMTP_HOST || "";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || "weddinggoosebumps@gmail.com";
  const from = process.env.SMTP_FROM || (user ? `"Wedding Goosebumps" <${user}>` : `"Wedding Goosebumps" <info@weddinggoosebumps.com>`);

  const isConfigured = Boolean(host && user && pass);

  return {
    host,
    port,
    secure,
    user,
    pass,
    from,
    adminEmail,
    isConfigured,
  };
}

/**
 * Creates or retrieves the nodemailer transporter
 */
function createTransporter() {
  const config = getMailConfig();

  if (!config.isConfigured) {
    return null;
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
  });
}

/**
 * Core send mail function supporting real SMTP and fallback simulated mode
 */
export async function sendMail(options: SendMailOptions): Promise<SendMailResult> {
  const config = getMailConfig();

  // If SMTP is NOT configured, safely simulate and log the email
  if (!config.isConfigured) {
    console.warn("\n=======================================================");
    console.warn("⚠️  [MAIL SIMULATION MODE - SMTP NOT CONFIGURED]");
    console.warn(`To: ${Array.isArray(options.to) ? options.to.join(", ") : options.to}`);
    console.warn(`Subject: ${options.subject}`);
    console.warn(`From: ${config.from}`);
    console.warn("Hint: Configure SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in your .env file to enable live delivery.");
    console.warn("=======================================================\n");

    return {
      success: true,
      simulated: true,
      messageId: `simulated-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
  }

  try {
    const transporter = createTransporter();
    if (!transporter) {
      throw new Error("Transporter initialization failed");
    }

    const info = await transporter.sendMail({
      from: config.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
      replyTo: options.replyTo,
    });

    console.log(`[MAIL_SUCCESS] Sent email "${options.subject}" to ${options.to}. MessageId: ${info.messageId}`);

    return {
      success: true,
      simulated: false,
      messageId: info.messageId,
    };
  } catch (error: any) {
    console.error("[MAIL_ERROR] Failed to send email:", error);
    return {
      success: false,
      error: error.message || "Failed to dispatch email",
    };
  }
}

/**
 * Verify SMTP connection health
 */
export async function verifySmtp(): Promise<{
  connected: boolean;
  configured: boolean;
  config: Partial<MailConfig>;
  error?: string;
}> {
  const config = getMailConfig();

  if (!config.isConfigured) {
    return {
      connected: false,
      configured: false,
      config: {
        host: config.host || "(not set)",
        port: config.port,
        secure: config.secure,
        user: config.user ? `${config.user.substring(0, 3)}***` : "(not set)",
        from: config.from,
        adminEmail: config.adminEmail,
      },
      error: "SMTP credentials are not fully configured in environment variables (SMTP_HOST, SMTP_USER, SMTP_PASS required).",
    };
  }

  try {
    const transporter = createTransporter();
    if (!transporter) throw new Error("Could not create transporter");

    await transporter.verify();

    return {
      connected: true,
      configured: true,
      config: {
        host: config.host,
        port: config.port,
        secure: config.secure,
        user: `${config.user.substring(0, 3)}***`,
        from: config.from,
        adminEmail: config.adminEmail,
      },
    };
  } catch (err: any) {
    return {
      connected: false,
      configured: true,
      config: {
        host: config.host,
        port: config.port,
        secure: config.secure,
        user: `${config.user.substring(0, 3)}***`,
        from: config.from,
        adminEmail: config.adminEmail,
      },
      error: err.message || "Connection verification failed",
    };
  }
}

/**
 * Helper to escape HTML characters
 */
function escapeHtml(str?: string | null): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Luxury HTML Email Template - Admin Notification
 */
export function getAdminLeadNotificationHtml(lead: LeadData): string {
  const appUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const leadsUrl = `${appUrl}/admin/leads`;
  const formattedDate = lead.createdAt ? new Date(lead.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) : new Date().toLocaleString();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry Received</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f5f2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #222222; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f7f5f2; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #eae5de;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #1a1918; padding: 36px 30px; text-align: center; border-bottom: 3px solid #c5a059;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 400; letter-spacing: 3px; color: #ffffff; text-transform: uppercase;">WEDDING GOOSEBUMPS</h1>
              <p style="margin: 8px 0 0; font-size: 11px; letter-spacing: 2px; color: #c5a059; text-transform: uppercase;">New Website Inquiry Alert</p>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding: 32px 30px 20px;">
              <h2 style="margin: 0 0 10px; font-size: 20px; color: #1a1918; font-weight: 600;">You have received a new lead!</h2>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #666666;">
                A new inquiry has been submitted through the Wedding Goosebumps website on <strong>${formattedDate}</strong>.
              </p>
            </td>
          </tr>

          <!-- Lead Details Table -->
          <tr>
            <td style="padding: 0 30px 20px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #faf8f5; border-radius: 6px; border: 1px solid #ebe5dc;">
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #ebe5dc; width: 35%; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #7a7369;">Full Name</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #ebe5dc; font-size: 15px; font-weight: 600; color: #1a1918;">${escapeHtml(lead.name)}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #ebe5dc; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #7a7369;">Email Address</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #ebe5dc; font-size: 14px; color: #1a1918;">
                    <a href="mailto:${escapeHtml(lead.email)}" style="color: #c5a059; text-decoration: none; font-weight: 500;">${escapeHtml(lead.email)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #ebe5dc; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #7a7369;">Phone Number</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #ebe5dc; font-size: 14px; color: #1a1918;">
                    ${lead.phone ? `<a href="tel:${escapeHtml(lead.phone)}" style="color: #1a1918; text-decoration: none;">${escapeHtml(lead.phone)}</a>` : '<span style="color: #999;">Not provided</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #ebe5dc; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #7a7369;">Source Page</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #ebe5dc; font-size: 13px; color: #666666;">${escapeHtml(lead.sourcePage || "/inquire")}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #7a7369; vertical-align: top;">Message</td>
                  <td style="padding: 14px 18px; font-size: 14px; line-height: 1.6; color: #222222; white-space: pre-wrap;">${escapeHtml(lead.message || "No message provided")}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Action Button -->
          <tr>
            <td style="padding: 10px 30px 30px; text-align: center;">
              <a href="${leadsUrl}" style="display: inline-block; background-color: #1a1918; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 4px; font-size: 13px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;">
                View In Admin Leads Inbox &rarr;
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f3efe9; padding: 20px 30px; text-align: center; border-top: 1px solid #e5ded5; font-size: 12px; color: #8c8478;">
              Wedding Goosebumps Automated Lead Notification System<br />
              Generated automatically by your CMS backend.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Luxury HTML Email Template - Client Confirmation
 */
export function getClientConfirmationHtml(lead: LeadData): string {
  const firstName = lead.name.split(" ")[0] || lead.name;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You For Contacting Wedding Goosebumps</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f5f2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #222222; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f7f5f2; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #eae5de;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #1a1918; padding: 40px 30px; text-align: center; border-bottom: 3px solid #c5a059;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 400; letter-spacing: 4px; color: #ffffff; text-transform: uppercase;">WEDDING GOOSEBUMPS</h1>
              <p style="margin: 8px 0 0; font-size: 11px; letter-spacing: 2px; color: #c5a059; text-transform: uppercase;">Cinematic Wedding Filmmaking &amp; Photography</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 36px 24px;">
              <h2 style="margin: 0 0 16px; font-size: 22px; color: #1a1918; font-weight: 500; font-family: Georgia, serif;">
                Dear ${escapeHtml(firstName)},
              </h2>
              <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #4a453e;">
                Thank you so much for reaching out to <strong>Wedding Goosebumps</strong>. We are thrilled you've considered us to document your most special celebration.
              </p>
              <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.7; color: #4a453e;">
                Every love story is unique, and our passion is creating timeless, cinematic memories that give you goosebumps for a lifetime.
              </p>

              <!-- Highlight Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #faf7f2; border-left: 3px solid #c5a059; border-radius: 0 6px 6px 0; padding: 18px 20px; margin: 24px 0;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 6px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #8a7346;">What Happens Next?</h3>
                    <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #555047;">
                      Our creative team is reviewing your vision and calendar availability. One of our lead cinematographers will contact you within <strong>24 to 48 hours</strong> to discuss your details and schedule an initial consultation.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0; font-size: 15px; line-height: 1.7; color: #4a453e;">
                If your celebration is right around the corner or you have immediate questions, feel free to reply directly to this email.
              </p>
            </td>
          </tr>

          <!-- Signoff -->
          <tr>
            <td style="padding: 0 36px 36px;">
              <p style="margin: 0; font-size: 14px; color: #666; font-style: italic;">Warmest regards,</p>
              <p style="margin: 4px 0 0; font-size: 16px; font-weight: 600; color: #1a1918; font-family: Georgia, serif;">The Wedding Goosebumps Team</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1a1918; padding: 24px 30px; text-align: center; color: #a39c91; font-size: 12px; line-height: 1.6;">
              <p style="margin: 0 0 6px; color: #ffffff; font-weight: 500; letter-spacing: 1px;">WEDDING GOOSEBUMPS</p>
              <p style="margin: 0;">Preserving timeless wedding stories across the globe.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Luxury HTML Email Template - Direct Reply from Admin
 */
export function getAdminReplyHtml(leadName: string, replyMessage: string, customSubject: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(customSubject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f5f2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #222222; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f7f5f2; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #eae5de;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #1a1918; padding: 32px 30px; text-align: center; border-bottom: 3px solid #c5a059;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 400; letter-spacing: 3px; color: #ffffff; text-transform: uppercase;">WEDDING GOOSEBUMPS</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 36px;">
              <h2 style="margin: 0 0 16px; font-size: 18px; color: #1a1918; font-weight: 600;">
                Dear ${escapeHtml(leadName)},
              </h2>
              <div style="font-size: 15px; line-height: 1.8; color: #333333; white-space: pre-wrap; margin-bottom: 24px;">
                ${escapeHtml(replyMessage)}
              </div>
              <p style="margin: 30px 0 0; font-size: 14px; color: #666;">Warm regards,</p>
              <p style="margin: 4px 0 0; font-size: 15px; font-weight: 600; color: #1a1918;">Wedding Goosebumps Team</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f3efe9; padding: 18px 30px; text-align: center; font-size: 12px; color: #8c8478; border-top: 1px solid #e5ded5;">
              Wedding Goosebumps | Inquiries &amp; Client Services
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Dispatch Lead Notification to Admin
 */
export async function sendLeadNotificationToAdmin(lead: LeadData): Promise<SendMailResult> {
  const config = getMailConfig();
  const subject = `✨ New Inquiry: ${lead.name} - Wedding Goosebumps`;
  const html = getAdminLeadNotificationHtml(lead);

  return await sendMail({
    to: config.adminEmail,
    subject,
    html,
    replyTo: lead.email,
  });
}

/**
 * Dispatch Confirmation Auto-Reply to Client
 */
export async function sendLeadConfirmationToClient(lead: LeadData): Promise<SendMailResult> {
  const subject = `Thank you for contacting Wedding Goosebumps | We received your inquiry`;
  const html = getClientConfirmationHtml(lead);

  return await sendMail({
    to: lead.email,
    subject,
    html,
  });
}

/**
 * Dispatch Custom Admin Reply to Lead
 */
export async function sendLeadReplyEmail({
  to,
  leadName,
  subject,
  message,
}: {
  to: string;
  leadName: string;
  subject: string;
  message: string;
}): Promise<SendMailResult> {
  const html = getAdminReplyHtml(leadName, message, subject);

  return await sendMail({
    to,
    subject,
    html,
  });
}

/**
 * Dispatch Test Email
 */
export async function sendTestEmail(toEmail?: string): Promise<SendMailResult> {
  const config = getMailConfig();
  const target = toEmail || config.adminEmail;

  const subject = `✅ Wedding Goosebumps - SMTP Test Successful`;
  const html = `
    <div style="font-family: sans-serif; padding: 24px; background: #fafafa; color: #333;">
      <h2 style="color: #1a1a1a;">Wedding Goosebumps SMTP Connection Test</h2>
      <p>This is a test email confirming that your email service integration is operational.</p>
      <ul style="line-height: 1.8;">
        <li><strong>Host:</strong> ${config.host || "(Simulated)"}</li>
        <li><strong>Port:</strong> ${config.port}</li>
        <li><strong>User:</strong> ${config.user || "(Simulated)"}</li>
        <li><strong>Sender:</strong> ${config.from}</li>
        <li><strong>Timestamp:</strong> ${new Date().toISOString()}</li>
      </ul>
      <p style="color: #666; font-size: 13px;">If you see this in your inbox, your mail pipeline is fully verified!</p>
    </div>
  `;

  return await sendMail({
    to: target,
    subject,
    html,
  });
}
