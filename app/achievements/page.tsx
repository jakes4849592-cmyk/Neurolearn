"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Trophy, Filter } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { XPBar } from "@/components/dashboard/XPBar";
import { BadgeCard } from "@/components/achievements/BadgeCard";
import type { Achievement, Tier } from "@/types";

const DEMO_USER = {
  displayName: "Alex",
  tier: "neurolearn" as Tier,
  xp: 1850,
  streak: 12,
};

const ACHIEVEMENTS: Achievement[] = [
  { id: "a1", name: "First Steps", description: "Complete your first learning session", emoji: "👣", category: "special", xpReward: 20, unlockCondition: "Complete 1 session", isEarned: true, earnedAt: new Date("2025-01-01") },
  { id: "a2", name: "Streak Starter", description: "Maintain a 3-day streak", emoji: "🔥", category: "streak", xpReward: 30, unlockCondition: "3-day streak", isEarned: true, earnedAt: new Date("2025-01-03") },
  { id: "a3", name: "Week Warrior", description: "Maintain a 7-day streak", emoji: "⚡", category: "streak", xpReward: 75, unlockCondition: "7-day streak", isEarned: true, earnedAt: new Date("2025-01-07") },
  { id: "a4", name: "Fortnight Fighter", description: "Maintain a 14-day streak", emoji: "🌟", category: "streak", xpReward: 150, unlockCondition: "Reach 14 days", isEarned: false },
  { id: "a5", name: "Month Master", description: "Maintain a 30-day streak", emoji: "🏆", category: "streak", xpReward: 500, unlockCondition: "30-day streak", isEarned: false },
  { id: "a6", name: "Math Wizard", description: "Reach 80% mastery in Mathematics", emoji: "🧮", category: "mastery", xpReward: 100, unlockCondition: "80% Math mastery", isEarned: false },
  { id: "a7", name: "Science Explorer", description: "Study 3 different science subjects", emoji: "🔬", category: "mastery", xpReward: 80, unlockCondition: "Study 3 sciences", isEarned: true, earnedAt: new Date("2025-01-15") },
  { id: "a8", name: "Bookworm", description: "Complete 10 English sessions", emoji: "📚", category: "mastery", xpReward: 60, unlockCondition: "10 English sessions", isEarned: true, earnedAt: new Date("2025-01-20") },
  { id: "a9", name: "Brain Power", description: "Earn 500 total XP", emoji: "🧠", category: "xp", xpReward: 50, unlockCondition: "Earn 500 XP", isEarned: true, earnedAt: new Date("2025-01-10") },
  { id: "a10", name: "XP Hunter", description: "Earn 1,000 total XP", emoji: "💎", category: "xp", xpReward: 100, unlockCondition: "Earn 1,000 XP", isEarned: true, earnedAt: new Date("2025-01-25") },
  { id: "a11", name: "Scholar", description: "Earn 5,000 total XP", emoji: "🎓", category: "xp", xpReward: 250, unlockCondition: "Earn 5,000 XP", isEarned: false },
  { id: "a12", name: "Legend", description: "Earn 10,000 total XP", emoji: "👑", category: "xp", xpReward: 500, unlockCondition: "Earn 10,000 XP", isEarned: false },
  { id: "a13", name: "Night Owl", description: "Study after 10 PM three times", emoji: "🦉", category: "special", xpReward: 40, unlockCondition: "Study after 10 PM x3", isEarned: true, earnedAt: new Date("2025-01-18") },
  { id: "a14", name: "Early Bird", description: "Study before 7 AM three times", emoji: "🌅", category: "special", xpReward: 40, unlockCondition: "Study before 7 AM x3", isEarned: false },
  { id: "a15", name: "Socratic Mastery", description: "Complete 50 chat sessions", emoji: "🗣️", category: "mastery", xpReward: 150, unlockCondition: "50 chat sessions", isEarned: false },
  { id: "a16", name: "Scanner Pro", description: "Use homework scanner 10 times", emoji: "📷", category: "special", xpReward: 60, unlockCondition: "Scan 10 homeworks", isEarned: false },
  { id: "a17", name: "Teaching Genius", description: "Complete 10 Teach mode sessions", emoji: "🎒", category: "mastery", xpReward: 120, unlockCondition: "10 Teach sessions", isEarned: false },
  { id: "a18", name: "Challenge Conqueror", description: "Complete 20 challenge problems", emoji: "⚔️", category: "mastery", xpReward: 100, unlockCondition: "20 challenges", isEarned: true, earnedAt: new Date("2025-02-01") },
  { id: "a19", name: "Perfect Score", description: "Score 100% on a test", emoji: "💯", category: "mastery", xpReward: 75, unlockCondition: "100% test score", isEarned: false },
  { id: "a20", name: "Sharing is Caring", description: "Share your progress with someone", emoji: "🤝", category: "social", xpReward: 25, unlockCondition: "Share progress", isEarned: false },
  { id: "a21", name: "Comeback Kid", description: "Return after 7+ days away", emoji: "🦋", category: "special", xpReward: 30, unlockCondition: "Return after 7 days", isEarned: false },
  { id: "a22", name: "Speed Learner", description: "Complete 3 sessions in one day", emoji: "🚀", category: "special", xpReward: 55, unlockCondition: "3 sessions in 1 day", isEarned: true, earnedAt: new Date("2025-01-30") },
];

type FilterType = "all" | "earned" | "locked" | "streak" | "mastery" | "xp" | "special" | "social";

const XP_LOG = [
  { date: "Today", entries: [
    { action: "Completed Practice session — Mathematics", xp: 45 },
    { action: "Correct answer streak (5x)", xp: 15 },
    { action: "Daily login bonus", xp: 10 },
  ]},
  { date: "Yesterday", entries: [
    { action: "Challenge completed — Physics", xp: 60 },
    { action: "Teach mode — Biology", xp: 25 },
  ]},
  { date: "2 days ago", entries: [
    { action: "Test passed — Chemistry", xp: 40 },
    { action: "Badge earned: Science Explorer", xp: 80 },
  ]},
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
};

export default function AchievementsPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [showXPLog, setShowXPLog] = useState(false);

  const earned = ACHIEVEMENTS.filter((a) => a.isEarned);
  const filtered = ACHIEVEMENTS.filter((a) => {
    if (filter === "earned") return a.isEarned;
    if (filter === "locked") return !a.isEarned;
    if (filter === "all") return true;
    return a.category === filter;
  });

  const filters: { id: FilterType; label: string }[] = [
    { id: "all", label: "All" },
    { id: "earned", label: "Earned" },
    { id: "locked", label: "Locked" },
    { id: "streak", label: "Streak 🔥" },
    { id: "mastery", label: "Mastery 🎯" },
    { id: "xp", label: "XP ⚡" },
    { id: "special", label: "Special ✨" },
    { id: "social", label: "Social 🤝" },
  ];

  return (
    <div className="flex h-screen bg-[var(--bg)] overflow-hidden">
      <Sidebar user={DEMO_USER} />

      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} className="mb-6">
          <h1 className="font-heading text-3xl font-bold text-[var(--text-primary)] flex items-center gap-3">
            <Trophy size={28} className="text-[#C9971E]" />
            Achievements
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            {earned.length}/{ACHIEVEMENTS.length} badges earned
          </p>
        </motion.div>

        {/* XP Bar */}
        <motion.div
          initial="hidden" animate="visible" custom={1} variants={fadeUp}
          className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5 mb-6"
        >
          <XPBar xp={DEMO_USER.xp} height="lg" accentColor="#C9971E" />
        </motion.div>

        {/* Progress Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Badges Earned", value: earned.length, icon: "🏅" },
            { label: "XP from Badges", value: earned.reduce((acc, a) => acc + a.xpReward, 0), icon: "⚡" },
            { label: "Completion", value: `${Math.round((earned.length / ACHIEVEMENTS.length) * 100)}%`, icon: "🎯" },
            { label: "Remaining", value: ACHIEVEMENTS.length - earned.length, icon: "🔒" },
          ].map(({ label, value, icon }, i) => (
            <motion.div
              key={label}
              initial="hidden" animate="visible" custom={i + 2} variants={fadeUp}
              className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 text-center"
            >
              <span className="text-2xl">{icon}</span>
              <p className="font-heading text-2xl font-bold text-[var(--text-primary)] mt-1">{value}</p>
              <p className="text-xs text-[var(--text-muted)]">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div
          initial="hidden" animate="visible" custom={6} variants={fadeUp}
          className="flex items-center gap-2 flex-wrap mb-5"
        >
          <Filter size={14} className="text-[var(--text-muted)]" />
          {filters.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={[
                "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                filter === id
                  ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                  : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] bg-[var(--bg-elevated)]",
              ].join(" ")}
            >
              {label}
            </button>
          ))}

          <button
            onClick={() => setShowXPLog(!showXPLog)}
            className="ml-auto px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] flex items-center gap-1"
          >
            <Zap size={11} />
            XP Log
          </button>
        </motion.div>

        {/* XP Log */}
        {showXPLog && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5 mb-6 overflow-hidden"
          >
            <h2 className="font-heading font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Zap size={16} className="text-[#C9971E]" /> XP Log
            </h2>
            {XP_LOG.map((group) => (
              <div key={group.date} className="mb-4">
                <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  {group.date}
                </p>
                <div className="space-y-2">
                  {group.entries.map((entry, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-[var(--border)] last:border-0">
                      <span className="text-sm text-[var(--text-secondary)]">{entry.action}</span>
                      <span className="text-sm font-semibold text-[#C9971E]">+{entry.xp} XP</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Badge Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filtered.map((achievement, i) => (
            <motion.div
              key={achievement.id}
              initial="hidden"
              animate="visible"
              custom={i * 0.3}
              variants={fadeUp}
            >
              <BadgeCard achievement={achievement} />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
