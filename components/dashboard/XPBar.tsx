"use client";

import React, { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { levelFromXP, progressToNextLevel, xpForLevel, getLevelTitle } from "@/lib/xp";

interface XPBarProps {
  xp: number;
  animated?: boolean;
  showLabel?: boolean;
  height?: "sm" | "md" | "lg";
  accentColor?: string;
}

export function XPBar({
  xp,
  animated = true,
  showLabel = true,
  height = "md",
  accentColor = "var(--accent)",
}: XPBarProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const level = levelFromXP(xp);
  const progress = progressToNextLevel(xp);
  const currentLevelXP = xpForLevel(level);
  const nextLevelXP = xpForLevel(level + 1);
  const xpInLevel = xp - currentLevelXP;
  const xpNeeded = nextLevelXP - currentLevelXP;
  const title = getLevelTitle(level);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayProgress(progress * 100);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayProgress(progress * 100);
    }
  }, [progress, animated]);

  const heightStyles = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ background: `linear-gradient(135deg, ${accentColor}, var(--accent-secondary))` }}
            >
              {level}
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                Level {level} — {title}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                {xpInLevel.toLocaleString()} / {xpNeeded.toLocaleString()} XP
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: accentColor }}>
            <Zap size={14} />
            {xp.toLocaleString()} total XP
          </div>
        </div>
      )}

      <div className={`w-full bg-[var(--bg-elevated)] rounded-full overflow-hidden ${heightStyles[height]}`}>
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${displayProgress}%`,
            background: `linear-gradient(90deg, ${accentColor}, var(--accent-secondary))`,
            boxShadow: `0 0 8px ${accentColor}60`,
          }}
        />
      </div>

      {height === "lg" && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-[var(--text-muted)]">Level {level}</span>
          <span className="text-xs text-[var(--text-muted)]">Level {level + 1}</span>
        </div>
      )}
    </div>
  );
}

export default XPBar;
