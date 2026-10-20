import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { verifySessionToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { getPortfolioData, updatePortfolioData } from "@/lib/portfolioService";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await getPortfolioData();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch portfolio" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await updatePortfolioData(body);
    revalidatePath("/");
    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    console.error("Update portfolio error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to update portfolio" },
      { status: 500 }
    );
  }
}
