"use client";

import React from "react";
import type { Achievement } from "@/types";

interface BadgeCardProps {
  achievement: Achievement;
  size?: "sm" | "md" | "lg";
}

export function BadgeCard({ achievement, size = "md" }: BadgeCardProps) {
  const sizeConfig = {
    sm: { emojiSize: "text-2xl", padding: "p-3", titleSize: "text-xs" },
    md: { emojiSize: "text-3xl", padding: "p-4", titleSize: "text-sm" },
    lg: { emojiSize: "text-4xl", padding: "p-5", titleSize: "text-base" },
  };

  const config = sizeConfig[size];

  const categoryColors = {
    streak: "#FF6B35",
    mastery: "#4F7EFF",
    xp: "#C9971E",
    social: "#00FFB3",
    special: "#7C3AED",
  };

  const color = categoryColors[achievement.category];

  return (
    <div
      className={[
        "relative flex flex-col items-center text-center rounded-2xl border transition-all duration-200",
        config.padding,
        achievement.isEarned
          ? "bg-[var(--card-bg)] hover:-translate-y-1"
          : "bg-[var(--bg-surface)] opacity-50",
      ].join(" ")}
      style={{
        borderColor: achievement.isEarned ? `${color}40` : "var(--border)",
        boxShadow: achievement.isEarned ? `0 4px 20px ${color}20` : "none",
      }}
    >
      {/* Glow effect for earned badges */}
      {achievement.isEarned && (
        <div
          className="absolute inset-0 rounded-2xl opacity-10 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${color}, transparent)` }}
        />
      )}

      <div
        className={[
          "relative z-10 mb-2",
          achievement.isEarned ? "badge-earned" : "badge-locked",
        ].join(" ")}
      >
        <span className={config.emojiSize}>{achievement.emoji}</span>
      </div>

      <p
        className={`relative z-10 font-semibold ${config.titleSize} text-[var(--text-primary)] leading-tight mb-1`}
      >
        {achievement.name}
      </p>

      {size !== "sm" && (
        <p className="relative z-10 text-[10px] text-[var(--text-muted)] leading-relaxed mb-2">
          {achievement.description}
        </p>
      )}

      {achievement.isEarned && achievement.earnedAt ? (
        <span
          className="relative z-10 text-[10px] px-2 py-0.5 rounded-full font-medium"
          style={{ background: `${color}20`, color }}
        >
          ✓ Earned {new Date(achievement.earnedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
      ) : (
        <span className="relative z-10 text-[10px] px-2 py-0.5 rounded-full font-medium bg-[var(--bg-elevated)] text-[var(--text-muted)]">
          🔒 {achievement.unlockCondition}
        </span>
      )}

      {achievement.isEarned && achievement.xpReward > 0 && (
        <span className="relative z-10 mt-1 text-[10px] font-semibold" style={{ color: "#C9971E" }}>
          +{achievement.xpReward} XP
        </span>
      )}
    </div>
  );
}

export default BadgeCard;
