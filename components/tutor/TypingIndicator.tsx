"use client";

import React from "react";

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-slide-in-left">
      {/* Nero Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[var(--glow-color)]">
        <span className="text-sm">🧠</span>
      </div>

      {/* Typing bubble */}
      <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl rounded-tl-none px-4 py-3">
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full typing-dot"
            style={{ background: "var(--accent)" }}
          />
          <div
            className="w-2 h-2 rounded-full typing-dot"
            style={{ background: "var(--accent)", animationDelay: "0.16s" }}
          />
          <div
            className="w-2 h-2 rounded-full typing-dot"
            style={{ background: "var(--accent)", animationDelay: "0.32s" }}
          />
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;
