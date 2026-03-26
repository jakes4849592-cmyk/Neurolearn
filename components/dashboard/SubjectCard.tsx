"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Lock } from "lucide-react";

interface SubjectCardProps {
  subject: string;
  emoji: string;
  color: string;
  mastery: number;
  topicsCount?: number;
  lastSession?: string;
  locked?: boolean;
  tier?: string;
}

export function SubjectCard({
  subject,
  emoji,
  color,
  mastery,
  topicsCount = 0,
  lastSession,
  locked = false,
  tier = "neurolearn",
}: SubjectCardProps) {
  const subjectSlug = subject.toLowerCase().replace(/\s+/g, "-");

  const content = (
    <div
      className={[
        "relative group rounded-2xl p-5 border transition-all duration-200 overflow-hidden",
        locked
          ? "opacity-50 cursor-not-allowed border-[var(--border)]"
          : "cursor-pointer hover:-translate-y-1",
      ].join(" ")}
      style={{
        background: locked ? "var(--card-bg)" : `${color}08`,
        borderColor: locked ? "var(--border)" : `${color}30`,
        boxShadow: locked ? "none" : undefined,
      }}
      onMouseEnter={(e) => {
        if (!locked) {
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 30px ${color}30`;
        }
      }}
      onMouseLeave={(e) => {
        if (!locked) {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }
      }}
    >
      {/* Ambient glow */}
      {!locked && (
        <div
          className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle, ${color}30, transparent)` }}
        />
      )}

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: `${color}20` }}
          >
            {locked ? <Lock size={20} style={{ color }} /> : emoji}
          </div>
          <ChevronRight
            size={18}
            className="text-[var(--text-muted)] group-hover:translate-x-1 transition-transform"
            style={!locked ? { color } : {}}
          />
        </div>

        <h3 className="font-heading font-semibold text-[var(--text-primary)] mb-1">
          {subject}
        </h3>

        {topicsCount > 0 && (
          <p className="text-xs text-[var(--text-muted)] mb-3">{topicsCount} topics</p>
        )}

        {/* Mastery bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--text-secondary)]">Mastery</span>
            <span className="text-xs font-semibold" style={{ color }}>
              {mastery}%
            </span>
          </div>
          <div className="w-full bg-[var(--bg-elevated)] rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full transition-all duration-700"
              style={{
                width: `${mastery}%`,
                background: `linear-gradient(90deg, ${color}, ${color}aa)`,
                boxShadow: `0 0 6px ${color}60`,
              }}
            />
          </div>
        </div>

        {lastSession && (
          <p className="text-xs text-[var(--text-muted)] mt-2">Last: {lastSession}</p>
        )}
      </div>
    </div>
  );

  if (locked) return content;

  return <Link href={`/learn/${subjectSlug}`}>{content}</Link>;
}

export default SubjectCard;
