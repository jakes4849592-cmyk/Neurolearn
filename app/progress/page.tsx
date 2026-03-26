"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, BookOpen, Zap, Brain, Calendar } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MasteryRing } from "@/components/progress/MasteryRing";
import type { Tier, DayActivity, ProgressData } from "@/types";

const DEMO_USER = {
  displayName: "Alex",
  tier: "neurolearn" as Tier,
  xp: 1850,
  streak: 12,
};

const SUBJECT_PROGRESS: ProgressData[] = [
  { subject: "Mathematics", mastery: 68, sessionsCount: 24, timeSpentMinutes: 420 },
  { subject: "Physics", mastery: 45, sessionsCount: 15, timeSpentMinutes: 280 },
  { subject: "Chemistry", mastery: 52, sessionsCount: 18, timeSpentMinutes: 310 },
  { subject: "Biology", mastery: 71, sessionsCount: 20, timeSpentMinutes: 360 },
  { subject: "English", mastery: 80, sessionsCount: 28, timeSpentMinutes: 480 },
  { subject: "History", mastery: 35, sessionsCount: 10, timeSpentMinutes: 180 },
];

const SUBJECT_COLORS: Record<string, string> = {
  Mathematics: "#4F7EFF",
  Physics: "#00CFFF",
  Chemistry: "#00FFB3",
  Biology: "#7C3AED",
  English: "#C9971E",
  History: "#FF5C3A",
};

const RECENT_SESSIONS = [
  { subject: "Mathematics", topic: "Quadratic Equations", duration: "22 min", xp: 45, date: "Today", mode: "practice" },
  { subject: "English", topic: "Persuasive Essays", duration: "18 min", xp: 35, date: "Today", mode: "test" },
  { subject: "Physics", topic: "Newton's Laws", duration: "30 min", xp: 60, date: "Yesterday", mode: "challenge" },
  { subject: "Chemistry", topic: "Atomic Structure", duration: "25 min", xp: 50, date: "2 days ago", mode: "practice" },
  { subject: "Biology", topic: "Cell Division", duration: "20 min", xp: 40, date: "3 days ago", mode: "teach" },
];

const STRENGTHS = [
  { subject: "English", note: "Excellent understanding of essay structure and argumentation. Top 15% of users.", positive: true },
  { subject: "Biology", note: "Strong grasp of cellular processes. Nearly ready for advanced topics.", positive: true },
  { subject: "Mathematics", note: "Algebra is solid. Ready to move into functions and graphing.", positive: true },
];

const IMPROVEMENTS = [
  { subject: "History", note: "Consider reviewing timeline organization. Only 35% mastery so far.", positive: false },
  { subject: "Physics", note: "Momentum and energy concepts need more practice before moving on.", positive: false },
];

function generateHeatmapData(): DayActivity[] {
  const data: DayActivity[] = [];
  const today = new Date();
  for (let i = 90; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const rand = Math.random();
    const level = rand < 0.3 ? 0 : rand < 0.5 ? 1 : rand < 0.7 ? 2 : rand < 0.85 ? 3 : 4;
    data.push({
      date: date.toISOString().split("T")[0],
      xpEarned: level * Math.floor(Math.random() * 30 + 10),
      sessionsCount: level,
      level: level as 0 | 1 | 2 | 3 | 4,
    });
  }
  return data;
}

const HEATMAP_DATA = generateHeatmapData();

const levelColors = [
  "bg-[var(--bg-elevated)]",
  "bg-[#4F7EFF]/30",
  "bg-[#4F7EFF]/55",
  "bg-[#4F7EFF]/75",
  "bg-[#4F7EFF]",
];

const totalMastery = Math.round(SUBJECT_PROGRESS.reduce((acc, s) => acc + s.mastery, 0) / SUBJECT_PROGRESS.length);
const totalTime = SUBJECT_PROGRESS.reduce((acc, s) => acc + s.timeSpentMinutes, 0);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

export default function ProgressPage() {
  const [hoveredDay, setHoveredDay] = useState<DayActivity | null>(null);

  return (
    <div className="flex h-screen bg-[var(--bg)] overflow-hidden">
      <Sidebar user={DEMO_USER} />

      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-[var(--text-primary)]">Your Progress</h1>
          <p className="text-[var(--text-secondary)] mt-1">Track your mastery journey across all subjects.</p>
        </motion.div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
          {[
            { label: "Overall Mastery", value: `${totalMastery}%`, icon: Brain, color: "#4F7EFF" },
            { label: "Total Study Time", value: `${Math.round(totalTime / 60)}h`, icon: Clock, color: "#00CFFF" },
            { label: "Subjects Active", value: SUBJECT_PROGRESS.length.toString(), icon: BookOpen, color: "#00FFB3" },
            { label: "Total XP", value: "1,850", icon: Zap, color: "#C9971E" },
          ].map(({ label, value, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial="hidden" animate="visible" custom={i} variants={fadeUp}
              className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
                  <Icon size={18} style={{ color }} />
                </div>
              </div>
              <p className="font-heading text-2xl font-bold text-[var(--text-primary)]">{value}</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-7">
          {/* Overall Mastery Ring */}
          <motion.div
            initial="hidden" animate="visible" custom={4} variants={fadeUp}
            className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 flex flex-col items-center"
          >
            <h2 className="font-heading font-semibold text-[var(--text-primary)] mb-5 self-start">
              Overall Mastery
            </h2>
            <MasteryRing percentage={totalMastery} size={160} strokeWidth={14} color="var(--accent)" />
            <p className="text-sm text-[var(--text-secondary)] mt-4 text-center">
              Averaged across {SUBJECT_PROGRESS.length} active subjects
            </p>
          </motion.div>

          {/* Subject Bar Charts */}
          <motion.div
            initial="hidden" animate="visible" custom={5} variants={fadeUp}
            className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 col-span-2"
          >
            <h2 className="font-heading font-semibold text-[var(--text-primary)] mb-5 flex items-center gap-2">
              <TrendingUp size={18} className="text-[var(--accent)]" />
              Subject Breakdown
            </h2>
            <div className="space-y-4">
              {SUBJECT_PROGRESS.sort((a, b) => b.mastery - a.mastery).map((s, i) => {
                const color = SUBJECT_COLORS[s.subject] || "#4F7EFF";
                return (
                  <div key={s.subject}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-[var(--text-primary)]">{s.subject}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[var(--text-muted)]">{s.sessionsCount} sessions</span>
                        <span className="text-sm font-semibold" style={{ color }}>{s.mastery}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-[var(--bg-elevated)] rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${s.mastery}%` }}
                        transition={{ delay: i * 0.1 + 0.5, duration: 0.8 }}
                        className="h-2.5 rounded-full"
                        style={{ background: `linear-gradient(90deg, ${color}, ${color}80)`, boxShadow: `0 0 6px ${color}50` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Activity Heatmap */}
        <motion.div
          initial="hidden" animate="visible" custom={6} variants={fadeUp}
          className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 mb-7"
        >
          <h2 className="font-heading font-semibold text-[var(--text-primary)] mb-5 flex items-center gap-2">
            <Calendar size={18} className="text-[var(--accent)]" />
            Activity Heatmap — Last 90 Days
          </h2>
          <div className="flex flex-wrap gap-1">
            {HEATMAP_DATA.map((day) => (
              <div
                key={day.date}
                className={`w-3 h-3 rounded-sm cursor-pointer transition-transform hover:scale-125 ${levelColors[day.level]}`}
                title={`${day.date}: ${day.xpEarned} XP, ${day.sessionsCount} sessions`}
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
              />
            ))}
          </div>
          {hoveredDay && (
            <div className="mt-3 text-xs text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--text-primary)]">{hoveredDay.date}</span>
              {" — "}
              {hoveredDay.sessionsCount > 0
                ? `${hoveredDay.sessionsCount} session${hoveredDay.sessionsCount > 1 ? "s" : ""}, ${hoveredDay.xpEarned} XP earned`
                : "No activity"}
            </div>
          )}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-[var(--text-muted)]">Less</span>
            {levelColors.map((cls, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${cls}`} />
            ))}
            <span className="text-xs text-[var(--text-muted)]">More</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-7">
          {/* Recent Sessions */}
          <motion.div
            initial="hidden" animate="visible" custom={7} variants={fadeUp}
            className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6"
          >
            <h2 className="font-heading font-semibold text-[var(--text-primary)] mb-4">Recent Sessions</h2>
            <div className="space-y-3">
              {RECENT_SESSIONS.map((session, i) => {
                const color = SUBJECT_COLORS[session.subject] || "#4F7EFF";
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${color}20` }}>
                      📚
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate">{session.topic}</p>
                      <p className="text-xs text-[var(--text-muted)]">{session.subject} · {session.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold" style={{ color }}>+{session.xp} XP</p>
                      <p className="text-[10px] text-[var(--text-muted)]">{session.duration}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial="hidden" animate="visible" custom={8} variants={fadeUp}
            className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6"
          >
            <h2 className="font-heading font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Brain size={18} className="text-[var(--accent)]" />
              AI Insights
            </h2>
            <div className="space-y-3">
              <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">Strengths</p>
              {STRENGTHS.map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-green-500/8 border border-green-500/20">
                  <p className="text-xs font-semibold text-green-400 mb-0.5">{s.subject}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{s.note}</p>
                </div>
              ))}
              <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2 mt-4">
                Areas to Improve
              </p>
              {IMPROVEMENTS.map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-orange-500/8 border border-orange-500/20">
                  <p className="text-xs font-semibold text-orange-400 mb-0.5">{s.subject}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{s.note}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
