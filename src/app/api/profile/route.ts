import { NextResponse } from "next/server";
import { getPortfolioData } from "@/lib/portfolioService";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getPortfolioData();
    const profile = data.profile;

    const payload = {
      name: profile?.name || "Abhishek",
      role: profile?.role || "AI Research & Distributed Systems",
      headline: profile?.headline || profile?.tagline || "",
      location: profile?.location || "New Delhi, India (UTC+05:30)",
      lab: profile?.labBrand || "AP-SYS-LAB",
      status: profile?.stats?.status?.value || "OPERATIONAL // BUILDING REASONING INFRASTRUCTURE",
      telemetry: {
        throughput: `${profile?.stats?.throughput?.value || "2,840"} ${profile?.stats?.throughput?.unit || "tok/s"}`,
        coreStack: profile?.stats?.coreEngines?.value || "C++20 / CUDA / PyTorch / Rust",
      },
      focusAreas: (data.architecturalFocus || []).map((f) => ({
        index: f.index,
        title: f.title,
        description: f.description,
      })),
      selectedProjects: (data.projects || []).map((p) => ({
        code: p.codeIndex,
        title: p.title,
        version: p.version,
        metric: `${p.metric} (${p.metricSub})`,
        stack: p.techStack,
        github: p.github,
        live: p.live,
      })),
      socials: profile?.socials || {},
      contact: {
        email: profile?.email || "abhisheksingh20042004@gmail.com",
        availability: "AVAILABLE FOR HIGH-THROUGHPUT AI INFRASTRUCTURE ROLES",
      },
      schemaVersion: "1.0.0",
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(payload, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not fetch profile telemetry" },
      { status: 500 }
    );
  }
}
