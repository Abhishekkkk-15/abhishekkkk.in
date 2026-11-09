import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { verifySessionToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { ResumeAsset } from "@/models/ResumeAsset";
import { updatePortfolioData } from "@/lib/portfolioService";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB limit

export async function POST(req: NextRequest) {
  // 1. Session verification
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file attached. Please select a PDF file." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File exceeds 15MB size limit." },
        { status: 400 }
      );
    }

    const isPdfExt = file.name.toLowerCase().endsWith(".pdf");
    const isPdfMime = file.type === "application/pdf";
    if (!isPdfExt && !isPdfMime) {
      return NextResponse.json(
        { error: "Only PDF documents (.pdf) are allowed." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Validate PDF magic bytes: %PDF (0x25, 0x50, 0x44, 0x46)
    if (
      buffer.length < 4 ||
      buffer[0] !== 0x25 ||
      buffer[1] !== 0x50 ||
      buffer[2] !== 0x44 ||
      buffer[3] !== 0x46
    ) {
      return NextResponse.json(
        { error: "Invalid file format. The file is not a valid PDF document." },
        { status: 400 }
      );
    }

    // 2. Persist to public/resume.pdf on local/VPS disk if possible
    try {
      const publicPath = path.join(process.cwd(), "public", "resume.pdf");
      await fs.promises.writeFile(publicPath, buffer);
    } catch (fsErr) {
      console.warn("Could not write public/resume.pdf to disk (may be read-only):", fsErr);
    }

    // 3. Persist to MongoDB for permanent storage across serverless / deployments
    await connectToDatabase();
    await ResumeAsset.findOneAndUpdate(
      {},
      {
        filename: file.name || "resume.pdf",
        contentType: "application/pdf",
        data: buffer,
        size: buffer.length,
        updatedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    // 4. Update the portfolio profile resumeUrl with a cache-busting timestamp
    const timestamp = Date.now();
    const newResumeUrl = `/api/resume?v=${timestamp}`;

    await updatePortfolioData({
      profile: {
        resumeUrl: newResumeUrl,
      } as any,
    });

    revalidatePath("/");
    revalidatePath("/admin/editor");

    return NextResponse.json({
      success: true,
      url: newResumeUrl,
      filename: file.name || "resume.pdf",
      size: buffer.length,
    });
  } catch (err: any) {
    console.error("Failed to upload resume:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error uploading resume." },
      { status: 500 }
    );
  }
}
