"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  TrendingUp,
  Trophy,
  Settings,
  LogOut,
  Flame,
  Zap,
  Users,
  Brain,
  GraduationCap,
  Home as HomeIcon,
} from "lucide-react";
import { TierBadge } from "@/components/ui/Badge";
import { levelFromXP, progressToNextLevel } from "@/lib/xp";
import type { Tier } from "@/types";

interface SidebarProps {
  user?: {
    displayName: string;
    tier: Tier;
    xp: number;
    streak: number;
    avatarUrl?: string;
    role?: string;
  };
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/learn/math", label: "Learn", icon: BookOpen },
  { href: "/progress", label: "Progress", icon: TrendingUp },
  { href: "/achievements", label: "Achievements", icon: Trophy },
];

const teacherItems = [
  { href: "/teacher", label: "My Classes", icon: Users },
];

const parentItems = [
  { href: "/homeschool", label: "Homeschool Hub", icon: HomeIcon },
];

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const displayName = user?.displayName || "Learner";
  const tier = user?.tier || "neurolearn";
  const xp = user?.xp || 0;
  const streak = user?.streak || 0;
  const level = levelFromXP(xp);
  const progress = progressToNextLevel(xp);

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const accentColors: Record<Tier, string> = {
    neurokids: "#FF5C3A",
    neurolearn: "#4F7EFF",
    advanced: "#C9971E",
  };
  const accentColor = accentColors[tier];

  return (
    <aside className="w-64 h-full flex flex-col bg-[var(--bg-surface)] border-r border-[var(--border)]">
      {/* Logo */}
      <div className="p-5 border-b border-[var(--border)]">
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${accentColor}, var(--accent-secondary))` }}
          >
            <Brain size={16} className="text-white" />
          </div>
          <span className="font-heading font-bold text-[var(--text-primary)]">
            Neuro<span style={{ color: accentColor }}>Learn</span>
          </span>
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-5 border-b border-[var(--border)]">
        <div className="flex items-center gap-3 mb-3">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={displayName}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[var(--accent)]"
            />
          ) : (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${accentColor}, var(--accent-secondary))` }}
            >
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <p className="font-semibold text-[var(--text-primary)] text-sm truncate">
              {displayName}
            </p>
            <TierBadge tier={tier} />
          </div>
        </div>

        {/* XP + Level */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[var(--text-muted)] flex items-center gap-1">
              <Zap size={11} style={{ color: accentColor }} />
              Level {level}
            </span>
            <span className="text-[var(--text-muted)]">{xp.toLocaleString()} XP</span>
          </div>
          <div className="w-full bg-[var(--bg-elevated)] rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full transition-all duration-700"
              style={{
                width: `${progress * 100}%`,
                background: `linear-gradient(90deg, ${accentColor}, var(--accent-secondary))`,
                boxShadow: `0 0 8px ${accentColor}50`,
              }}
            />
          </div>
        </div>

        {/* Streak */}
        <div className="mt-3 flex items-center gap-1.5">
          <Flame size={14} className="text-orange-400" />
          <span className="text-xs text-[var(--text-secondary)]">
            <span className="font-semibold text-orange-400">{streak}</span> day streak
          </span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={[
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                isActive
                  ? "text-white"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]",
              ].join(" ")}
              style={
                isActive
                  ? {
                      background: `linear-gradient(135deg, ${accentColor}25, var(--accent-secondary)15)`,
                      borderLeft: `3px solid ${accentColor}`,
                      color: accentColor,
                    }
                  : {}
              }
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}

        {user?.role === "teacher" && (
          <>
            <div className="px-3 py-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              Teaching
            </div>
            {teacherItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                    isActive
                      ? "text-white"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]",
                  ].join(" ")}
                  style={isActive ? { background: `${accentColor}25`, color: accentColor } : {}}
                >
                  <Icon size={17} />
                  {label}
                </Link>
              );
            })}
          </>
        )}

        {user?.role === "parent" && (
          <>
            <div className="px-3 py-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              Parent
            </div>
            {parentItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                    isActive
                      ? "text-white"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]",
                  ].join(" ")}
                  style={isActive ? { background: `${accentColor}25`, color: accentColor } : {}}
                >
                  <Icon size={17} />
                  {label}
                </Link>
              );
            })}
          </>
        )}
      </nav>

      {/* Bottom Links */}
      <div className="p-3 border-t border-[var(--border)] space-y-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-all"
        >
          <Settings size={17} />
          Settings
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
