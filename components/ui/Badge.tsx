import React from "react";
import type { Tier } from "@/types";

type BadgeVariant = "tier" | "xp" | "streak" | "status" | "default";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  tier?: Tier;
  className?: string;
  size?: "sm" | "md";
}

const tierStyles: Record<Tier, string> = {
  neurokids: "bg-[#FF5C3A]/20 text-[#FF5C3A] border border-[#FF5C3A]/30",
  neurolearn: "bg-[#4F7EFF]/20 text-[#4F7EFF] border border-[#4F7EFF]/30",
  advanced: "bg-[#C9971E]/20 text-[#C9971E] border border-[#C9971E]/30",
};

const tierEmojis: Record<Tier, string> = {
  neurokids: "⭐",
  neurolearn: "⚡",
  advanced: "🏆",
};

const tierNames: Record<Tier, string> = {
  neurokids: "NeuroKids",
  neurolearn: "NeuroLearn",
  advanced: "Advanced",
};

const variantStyles: Record<BadgeVariant, string> = {
  tier: "",
  xp: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  streak: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  status: "bg-green-500/20 text-green-400 border border-green-500/30",
  default: "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border)]",
};

export function Badge({ children, variant = "default", tier, className = "", size = "sm" }: BadgeProps) {
  const style = tier ? tierStyles[tier] : variantStyles[variant];
  const sizeStyle = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full ${style} ${sizeStyle} ${className}`}
    >
      {children}
    </span>
  );
}

export function TierBadge({ tier, size = "sm" }: { tier: Tier; size?: "sm" | "md" }) {
  return (
    <Badge variant="tier" tier={tier} size={size}>
      <span>{tierEmojis[tier]}</span>
      <span>{tierNames[tier]}</span>
    </Badge>
  );
}

export function XPBadge({ xp, size = "sm" }: { xp: number; size?: "sm" | "md" }) {
  return (
    <Badge variant="xp" size={size}>
      ⚡ {xp.toLocaleString()} XP
    </Badge>
  );
}

export function StreakBadge({ streak, size = "sm" }: { streak: number; size?: "sm" | "md" }) {
  return (
    <Badge variant="streak" size={size}>
      🔥 {streak} day streak
    </Badge>
  );
}

export default Badge;
