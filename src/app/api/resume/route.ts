import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { connectToDatabase } from "@/lib/mongodb";
import { ResumeAsset } from "@/models/ResumeAsset";

export const dynamic = "force-dynamic";

export async function GET() {
  // 1. Try to fetch from MongoDB
  try {
    await connectToDatabase();
    const doc = await ResumeAsset.findOne().sort({ updatedAt: -1 }).lean<{
      data: Buffer;
      contentType?: string;
      filename?: string;
      size?: number;
    }>();

    if (doc?.data) {
      const buffer = Buffer.isBuffer(doc.data)
        ? doc.data
        : Buffer.from((doc.data as any).buffer || doc.data);

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": doc.contentType || "application/pdf",
          "Content-Disposition": `inline; filename="${encodeURIComponent(
            doc.filename || "resume.pdf"
          )}"`,
          "Content-Length": buffer.length.toString(),
          "Cache-Control": "public, max-age=60, s-maxage=300",
        },
      });
    }
  } catch (err) {
    console.warn("Could not retrieve resume from MongoDB, falling back to disk:", err);
  }

  // 2. Fallback to public/resume.pdf on disk
  try {
    const filePath = path.join(process.cwd(), "public", "resume.pdf");
    const fileBuffer = await fs.promises.readFile(filePath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="resume.pdf"',
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "public, max-age=60, s-maxage=300",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Resume document not found." },
      { status: 404 }
    );
  }
}
