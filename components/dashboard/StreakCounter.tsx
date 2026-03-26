"use client";

import React from "react";
import { Flame } from "lucide-react";

interface StreakCounterProps {
  streak: number;
  longestStreak?: number;
  size?: "sm" | "md" | "lg";
  showLongest?: boolean;
}

export function StreakCounter({
  streak,
  longestStreak,
  size = "md",
  showLongest = false,
}: StreakCounterProps) {
  const sizeConfig = {
    sm: { iconSize: 14, textSize: "text-sm", containerClass: "px-2.5 py-1.5" },
    md: { iconSize: 18, textSize: "text-base", containerClass: "px-3.5 py-2" },
    lg: { iconSize: 24, textSize: "text-xl", containerClass: "px-5 py-3" },
  };

  const config = sizeConfig[size];

  const getStreakColor = (days: number) => {
    if (days >= 30) return "#FF4500";
    if (days >= 14) return "#FF6B35";
    if (days >= 7) return "#FF8C42";
    if (days >= 3) return "#FFA552";
    return "#FFAD3A";
  };

  const streakColor = getStreakColor(streak);

  const getStreakMessage = (days: number) => {
    if (days === 0) return "Start your streak today!";
    if (days === 1) return "Day 1! Keep going!";
    if (days < 7) return "Great start!";
    if (days < 14) return "One week strong! 🎉";
    if (days < 30) return "On fire! 🔥";
    if (days < 60) return "Legendary! 🏆";
    return "Unstoppable! ⚡";
  };

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-xl border ${config.containerClass}`}
      style={{
        background: `${streakColor}15`,
        borderColor: `${streakColor}40`,
      }}
    >
      <Flame
        size={config.iconSize}
        className="streak-flame"
        style={{ color: streakColor }}
      />
      <div>
        <div className="flex items-baseline gap-1">
          <span
            className={`font-heading font-bold ${config.textSize}`}
            style={{ color: streakColor }}
          >
            {streak}
          </span>
          <span className={`text-[var(--text-secondary)] ${size === "sm" ? "text-xs" : "text-sm"}`}>
            {streak === 1 ? "day" : "days"}
          </span>
        </div>
        {size !== "sm" && (
          <p className="text-xs text-[var(--text-muted)]">{getStreakMessage(streak)}</p>
        )}
      </div>
      {showLongest && longestStreak !== undefined && longestStreak > 0 && (
        <div className="ml-2 pl-2 border-l border-[var(--border)]">
          <p className="text-xs text-[var(--text-muted)]">Best</p>
          <p className="text-sm font-semibold text-[var(--text-secondary)]">{longestStreak}</p>
        </div>
      )}
    </div>
  );
}

export default StreakCounter;
