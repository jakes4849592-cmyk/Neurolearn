"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Send, ScanLine, Zap, X } from "lucide-react";
import { ChatWindow } from "@/components/tutor/ChatWindow";
import { HomeworkScanner } from "@/components/tutor/HomeworkScanner";
import { ModeSelector } from "@/components/dashboard/ModeSelector";
import { Button } from "@/components/ui/Button";
import type { Message, LearningMode, Tier } from "@/types";

export default function TutorPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const subject = decodeURIComponent(params.subject as string);
  const initialMode = (searchParams.get("mode") as LearningMode) || "practice";
  const initialTopic = searchParams.get("topic") || "";

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState(initialTopic ? `Help me understand: ${initialTopic}` : "");
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState<LearningMode>(initialMode);
  const [showScanner, setShowScanner] = useState(false);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const tier: Tier = "neurolearn";

  const subjectColors: Record<string, string> = {
    mathematics: "#4F7EFF",
    physics: "#00CFFF",
    chemistry: "#00FFB3",
    biology: "#7C3AED",
    english: "#C9971E",
    history: "#FF5C3A",
    calculus: "#C9971E",
    default: "#4F7EFF",
  };
  const color = subjectColors[subject.toLowerCase()] || subjectColors.default;

  const modeLabels: Record<LearningMode, string> = {
    practice: "Practice Mode",
    test: "Test Mode",
    challenge: "Challenge Mode",
    teach: "Teach Mode",
  };

  const sendMessage = useCallback(
    async (content: string, imageUrl?: string) => {
      if (!content.trim() && !imageUrl) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
        imageUrl,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsTyping(true);

      // Resize textarea
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      try {
        const allMessages = [
          ...messages,
          { role: "user" as const, content: content.trim() },
        ];

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: allMessages,
            tier,
            subject,
            mode,
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        if (!res.body) throw new Error("No response body");

        const assistantId = (Date.now() + 1).toString();
        const assistantMessage: Message = {
          id: assistantId,
          role: "assistant",
          content: "",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          );
        }

        // Award XP
        setXpEarned((prev) => prev + 15);
      } catch (error) {
        console.error("Chat error:", error);
        setIsTyping(false);
        const errMessage: Message = {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content: "I had trouble connecting. Please try again — I'm here to help! 🧠",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errMessage]);
      }
    },
    [messages, mode, subject, tier]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-resize
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  const handleOCRResult = (text: string, imageUrl: string) => {
    setShowScanner(false);
    sendMessage(text, imageUrl);
  };

  // Auto-start with initial topic
  useEffect(() => {
    if (initialTopic && messages.length === 0) {
      // Small delay to let UI render
      const timer = setTimeout(() => {
        sendMessage(`Help me understand this topic: ${initialTopic}`);
      }, 500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[var(--bg)]">
      {/* Header */}
      <header
        className="flex items-center gap-4 px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-surface)]/80 backdrop-blur-md flex-shrink-0"
        style={{ borderBottomColor: `${color}20` }}
      >
        <Link href="/dashboard">
          <button className="w-9 h-9 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all">
            <ArrowLeft size={16} />
          </button>
        </Link>

        {/* Nero Avatar */}
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg animate-pulse-glow"
            style={{ background: `linear-gradient(135deg, ${color}, var(--accent-secondary))` }}
          >
            🧠
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[var(--bg-surface)]" />
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="font-heading font-bold text-[var(--text-primary)] leading-none truncate">
            {subject.charAt(0).toUpperCase() + subject.slice(1)} with Nero
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{modeLabels[mode]}</p>
        </div>

        {/* XP earned this session */}
        {xpEarned > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: "#C9971E20", color: "#C9971E" }}
          >
            <Zap size={12} />
            +{xpEarned} XP
          </motion.div>
        )}

        <button
          onClick={() => setShowModeSelector(!showModeSelector)}
          className="text-xs px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] transition-all capitalize"
        >
          {mode}
        </button>
      </header>

      {/* Mode Selector Dropdown */}
      {showModeSelector && (
        <div className="border-b border-[var(--border)] bg-[var(--bg-surface)] px-4 py-3">
          <ModeSelector
            selected={mode}
            onChange={(m) => { setMode(m); setShowModeSelector(false); }}
            subject={subject}
          />
        </div>
      )}

      {/* Chat Area */}
      <ChatWindow messages={messages} isTyping={isTyping} tier={tier} />

      {/* Homework Scanner */}
      {showScanner && (
        <div className="px-4 pb-2 flex-shrink-0">
          <HomeworkScanner
            onTextExtracted={handleOCRResult}
            onClose={() => setShowScanner(false)}
          />
        </div>
      )}

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-[var(--border)] bg-[var(--bg-surface)]/80 backdrop-blur-md px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <div
            className="flex items-end gap-3 rounded-2xl border p-3 bg-[var(--bg-elevated)] transition-all focus-within:border-[var(--accent)]"
            style={{ borderColor: "var(--border)" }}
          >
            {/* Scanner button */}
            <button
              onClick={() => setShowScanner(!showScanner)}
              className={[
                "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all",
                showScanner
                  ? "text-white"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg)]",
              ].join(" ")}
              style={showScanner ? { background: color } : {}}
              title="Scan homework"
            >
              {showScanner ? <X size={16} /> : <ScanLine size={16} />}
            </button>

            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask Nero anything... or press Enter to send"
              rows={1}
              className="flex-1 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm resize-none focus:outline-none leading-relaxed"
              style={{ maxHeight: "160px", minHeight: "24px" }}
            />

            <button
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className={[
                "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all",
                inputValue.trim() && !isTyping
                  ? "text-white shadow-lg"
                  : "opacity-40 cursor-not-allowed bg-[var(--bg)]",
              ].join(" ")}
              style={inputValue.trim() && !isTyping
                ? { background: `linear-gradient(135deg, ${color}, var(--accent-secondary))` }
                : {}}
            >
              <Send size={15} />
            </button>
          </div>
          <p className="text-center text-[10px] text-[var(--text-muted)] mt-2">
            Nero guides you to the answer — never just gives it to you. That&apos;s how real learning works. 🧠
          </p>
        </div>
      </div>
    </div>
  );
}
