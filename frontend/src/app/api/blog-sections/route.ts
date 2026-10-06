import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
export async function POST(req: NextRequest) {
    try {
      const session = await auth();

      if (!session?.user) {
        return NextResponse.json(
          {
            success: false,
            message: "Unauthorized",
          },
          { status: 401 }
        );
      }
    const { blogId, section, content } = await req.json();

    if (!blogId || !section) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const existing = await prisma.blogSection.findFirst({
      where: {
        blogId,
        section,
      },
    });

    if (existing) {
      const updated = await prisma.blogSection.update({
        where: {
          id: existing.id,
        },
        data: {
          content,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Section updated",
        data: updated,
      });
    }

    const created = await prisma.blogSection.create({
      data: {
        blogId,
        section,
        content,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Section created",
      data: created,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const blogId = searchParams.get("blogId");
    const section = searchParams.get("section");

    if (!blogId || !section) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const data = await prisma.blogSection.findFirst({
      where: {
        blogId,
        section,
      },
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
