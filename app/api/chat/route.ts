import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt, streamChat } from "@/lib/claude";
import type { Tier, LearningMode } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      messages = [],
      tier = "neurolearn",
      subject = "General",
      mode = "practice",
      grade,
    } = body as {
      messages: { role: "user" | "assistant"; content: string }[];
      tier: Tier;
      subject: string;
      mode: LearningMode;
      grade?: number;
    };

    // Validate inputs
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    if (messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const validTiers: Tier[] = ["neurokids", "neurolearn", "advanced"];
    const validModes: LearningMode[] = ["practice", "test", "challenge", "teach"];

    if (!validTiers.includes(tier)) {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    if (!validModes.includes(mode)) {
      return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
    }

    // Build system prompt (server-side only)
    const systemPrompt = buildSystemPrompt(tier, subject, mode, grade);

    // Get streaming response from Claude
    const stream = await streamChat(systemPrompt, messages);

    // Return as streaming response
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error: any) {
    console.error("Chat API error:", error);

    if (error?.status === 401) {
      return NextResponse.json(
        { error: "Authentication failed. Please check the API key." },
        { status: 401 }
      );
    }

    if (error?.status === 429) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again shortly." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Failed to get AI response. Please try again." },
      { status: 500 }
    );
  }
}
