"use client";

import React, { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import type { Message } from "@/types";

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
  tier?: string;
}

export function ChatWindow({ messages, isTyping, tier }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (messages.length === 0 && !isTyping) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center text-4xl mb-4 shadow-lg shadow-[var(--glow-color)] animate-float">
          🧠
        </div>
        <h3 className="font-heading font-bold text-xl text-[var(--text-primary)] mb-2">
          Hi! I&apos;m Nero
        </h3>
        <p className="text-[var(--text-secondary)] max-w-xs text-sm leading-relaxed">
          Your personal AI tutor. Ask me anything, share a problem, or upload your homework — I&apos;ll guide you to the answer using questions and hints.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {[
            "Help me understand this concept 💡",
            "I have a homework problem 📝",
            "Quiz me on this topic 🧪",
          ].map((suggestion) => (
            <div
              key={suggestion}
              className="px-3 py-2 text-xs rounded-xl border border-[var(--border)] text-[var(--text-secondary)] bg-[var(--bg-elevated)] cursor-default"
            >
              {suggestion}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} tier={tier} />
      ))}

      {isTyping && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  );
}

export default ChatWindow;
