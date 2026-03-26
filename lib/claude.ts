import Anthropic from "@anthropic-ai/sdk";
import type { Tier, LearningMode } from "@/types";
import { buildPrompt } from "./prompts";

// This file is SERVER-SIDE ONLY — never import in client components
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export { buildPrompt };

export function buildSystemPrompt(
  tier: Tier,
  subject: string,
  mode: LearningMode,
  grade?: number
): string {
  return buildPrompt(tier, mode, subject, grade);
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function streamChat(
  systemPrompt: string,
  messages: ChatMessage[]
): Promise<ReadableStream<Uint8Array>> {
  const stream = await anthropic.messages.stream({
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    system: systemPrompt,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  });

  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            const text = chunk.delta.text;
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
}

export { anthropic };
