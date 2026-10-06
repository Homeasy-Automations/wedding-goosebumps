import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { logActivity } from "@/lib/logger";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    const settings = await prisma.globalSettings.findUnique({
      where: { id: "global" }
    });

    return NextResponse.json(settings || {});
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    const json = await req.json();
    
    const settings = await prisma.globalSettings.upsert({
      where: { id: "global" },
      update: json,
      create: { id: "global", ...json }
    });

    await logActivity({
      action: "Updated Global SEO Settings",
      module: "SEO",
      userId: session.user.id,
      details: {
        updatedFields: Object.keys(json),
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
