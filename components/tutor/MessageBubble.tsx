"use client";

import React from "react";
import type { Message } from "@/types";

interface MessageBubbleProps {
  message: Message;
  tier?: string;
}

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/```(\w*)\n?([\s\S]*?)```/g, "<pre><code>$2</code></pre>")
    .replace(/^#{3}\s(.+)$/gm, "<h3>$1</h3>")
    .replace(/^#{2}\s(.+)$/gm, "<h2>$1</h2>")
    .replace(/^#{1}\s(.+)$/gm, "<h1>$1</h1>")
    .replace(/^-\s(.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>")
    .replace(/^>\s(.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>");
}

export function MessageBubble({ message, tier }: MessageBubbleProps) {
  const isNero = message.role === "assistant";
  const formattedTime = new Date(message.timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isNero) {
    return (
      <div className="flex items-start gap-3 animate-slide-in-left max-w-[85%]">
        {/* Nero Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center flex-shrink-0 shadow-md shadow-[var(--glow-color)] mt-0.5">
          <span className="text-sm">🧠</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-[var(--accent)]">Nero</span>
            <span className="text-[10px] text-[var(--text-muted)]">{formattedTime}</span>
          </div>
          <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl rounded-tl-none px-4 py-3">
            {message.imageUrl && (
              <img
                src={message.imageUrl}
                alt="Attached image"
                className="w-full max-w-xs rounded-lg mb-3 object-contain"
              />
            )}
            <div
              className="prose-nero text-sm"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 justify-end animate-slide-in-right max-w-[85%] ml-auto">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 justify-end">
          <span className="text-[10px] text-[var(--text-muted)]">{formattedTime}</span>
          <span className="text-xs font-semibold text-[var(--text-secondary)]">You</span>
        </div>
        <div
          className="rounded-2xl rounded-tr-none px-4 py-3 text-white"
          style={{
            background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
            boxShadow: "0 4px 15px var(--glow-color)",
          }}
        >
          {message.imageUrl && (
            <img
              src={message.imageUrl}
              alt="Attached image"
              className="w-full max-w-xs rounded-lg mb-3 object-contain"
            />
          )}
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>

      {/* User Avatar */}
      <div className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center flex-shrink-0 text-sm mt-0.5">
        👤
      </div>
    </div>
  );
}

export default MessageBubble;
