import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ALLOWED_FOLDERS = ["blog", "pages", "seo", "gallery", "hero", "team", "temp"];

export async function GET(req: NextRequest) {
  try {
    const folder = req.nextUrl.searchParams.get("folder") || "blog";

    if (!ALLOWED_FOLDERS.includes(folder)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid folder",
        },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);

    if (!fs.existsSync(uploadDir)) {
      return NextResponse.json({
        success: true,
        images: [],
      });
    }

    const files = fs.readdirSync(uploadDir);

    const images = files
      .filter((file) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
      .map((file) => {
        const stat = fs.statSync(path.join(uploadDir, file));

        return {
          name: file,
          url: `/uploads/${folder}/${file}`,
          size: stat.size,
          createdAt: stat.birthtime,
        };
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      images,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load images",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { folder, name } = await req.json();

    if (!ALLOWED_FOLDERS.includes(folder)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid folder",
        },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "public", "uploads", folder, name);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        {
          success: false,
          error: "Image not found",
        },
        { status: 404 }
      );
    }

    fs.unlinkSync(filePath);

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to delete image",
      },
      { status: 500 }
    );
  }
}
