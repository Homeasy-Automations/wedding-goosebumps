import prisma from "@/lib/prisma";

export interface LogActivityParams {
  action: string;
  module: string;
  details?: Record<string, any> | string | null;
  userId?: string | null;
}

/**
 * Standardized activity logging helper.
 * Safely persists administrative and automated system events without breaking parent operations.
 */
export async function logActivity({
  action,
  module,
  details,
  userId,
}: LogActivityParams) {
  try {
    const detailsString =
      details === undefined || details === null
        ? null
        : typeof details === "string"
        ? details
        : JSON.stringify(details);

    return await prisma.activityLog.create({
      data: {
        action,
        module,
        details: detailsString,
        userId: userId || null,
      },
    });
  } catch (err) {
    console.error(`[ACTIVITY_LOG_ERROR] Failed to record log (${module}:${action}):`, err);
    return null;
  }
}
