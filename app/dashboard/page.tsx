"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Zap, Clock, ChevronRight, Play, Star } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { XPBar } from "@/components/dashboard/XPBar";
import { StreakCounter } from "@/components/dashboard/StreakCounter";
import { SubjectCard } from "@/components/dashboard/SubjectCard";
import { ModeSelector } from "@/components/dashboard/ModeSelector";
import { Button } from "@/components/ui/Button";
import type { LearningMode, Tier } from "@/types";

// Demo data — in production, fetch from Supabase
const DEMO_USER = {
  displayName: "Alex",
  tier: "neurolearn" as Tier,
  xp: 1850,
  streak: 12,
  role: "student",
};

const SUBJECTS = {
  neurokids: [
    { subject: "Reading", emoji: "📚", color: "#FF5C3A", mastery: 72, topicsCount: 18 },
    { subject: "Math", emoji: "🔢", color: "#FFAD3A", mastery: 58, topicsCount: 24 },
    { subject: "Science", emoji: "🔬", color: "#3AD68F", mastery: 45, topicsCount: 15 },
    { subject: "Art", emoji: "🎨", color: "#FF69B4", mastery: 85, topicsCount: 10 },
  ],
  neurolearn: [
    { subject: "Mathematics", emoji: "🔢", color: "#4F7EFF", mastery: 68, topicsCount: 42 },
    { subject: "Physics", emoji: "⚛️", color: "#00CFFF", mastery: 45, topicsCount: 35 },
    { subject: "Chemistry", emoji: "⚗️", color: "#00FFB3", mastery: 52, topicsCount: 30 },
    { subject: "Biology", emoji: "🧬", color: "#7C3AED", mastery: 71, topicsCount: 28 },
    { subject: "English", emoji: "✍️", color: "#C9971E", mastery: 80, topicsCount: 25 },
    { subject: "History", emoji: "📜", color: "#FF5C3A", mastery: 35, topicsCount: 32 },
  ],
  advanced: [
    { subject: "Calculus", emoji: "∫", color: "#C9971E", mastery: 62, topicsCount: 50 },
    { subject: "Linear Algebra", emoji: "𝕄", color: "#7C3AED", mastery: 40, topicsCount: 38 },
    { subject: "Physics II", emoji: "⚛️", color: "#4F7EFF", mastery: 55, topicsCount: 45 },
    { subject: "Literature", emoji: "📖", color: "#F5F0E5", mastery: 77, topicsCount: 30 },
  ],
};

const RECOMMENDED_LESSONS = [
  {
    subject: "Mathematics",
    topic: "Quadratic Equations",
    icon: "🔢",
    xp: 45,
    duration: "20 min",
    color: "#4F7EFF",
    mode: "practice" as LearningMode,
  },
  {
    subject: "Physics",
    topic: "Newton's Laws of Motion",
    icon: "⚛️",
    xp: 55,
    duration: "25 min",
    color: "#00CFFF",
    mode: "challenge" as LearningMode,
  },
  {
    subject: "English",
    topic: "Persuasive Essay Structure",
    icon: "✍️",
    xp: 35,
    duration: "15 min",
    color: "#C9971E",
    mode: "test" as LearningMode,
  },
];

const TROPHIES = ["🥇", "🏆", "⭐", "🎯", "🌟", "🔥"];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.4 },
  }),
};

export default function DashboardPage() {
  const [selectedMode, setSelectedMode] = useState<LearningMode>("practice");
  const user = DEMO_USER;
  const subjects = SUBJECTS[user.tier];
  const isKids = user.tier === "neurokids";

  const accentColors = { neurokids: "#FF5C3A", neurolearn: "#4F7EFF", advanced: "#C9971E" };
  const accent = accentColors[user.tier];

  const greetingTime = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const motivations = [
    "Ready to level up today? 🚀",
    "Your streak is on fire! Keep it going! 🔥",
    "Every question gets you smarter. Let's go! ⚡",
    "Nero is waiting. Let's learn something amazing! 🧠",
  ];
  const motivation = motivations[Math.floor(Math.random() * motivations.length)];

  return (
    <div className="flex h-screen bg-[var(--bg)] overflow-hidden">
      <Sidebar user={user} />

      <main className="flex-1 overflow-y-auto">
        {/* Ambient glows */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
            style={{ background: `radial-gradient(circle, ${accent}50, transparent)` }} />
          <div className="absolute bottom-0 left-64 w-72 h-72 rounded-full opacity-8"
            style={{ background: `radial-gradient(circle, ${accent}30, transparent)` }} />
        </div>

        <div className="relative z-10 p-6 lg:p-8 space-y-7">
          {/* Welcome Banner */}
          <motion.div
            initial="hidden" animate="visible" custom={0} variants={fadeUp}
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${accent}18, ${accent}08)`, border: `1px solid ${accent}30` }}
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-15"
              style={{ background: `radial-gradient(circle, ${accent}, transparent)` }} />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
                  {greetingTime()}, {user.displayName}! 👋
                </h1>
                <p className="text-[var(--text-secondary)] mt-1">{motivation}</p>
              </div>
              <StreakCounter streak={user.streak} size="md" />
            </div>
          </motion.div>

          {/* XP Bar */}
          <motion.div
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5"
          >
            <XPBar xp={user.xp} accentColor={accent} />
          </motion.div>

          {/* NeuroKids Trophy Shelf */}
          {isKids && (
            <motion.div
              initial="hidden" animate="visible" custom={2} variants={fadeUp}
              className="bg-[var(--card-bg)] border border-[#FF5C3A]/30 rounded-2xl p-5"
            >
              <h2 className="font-heading font-bold text-lg text-[var(--text-primary)] mb-3 flex items-center gap-2">
                🏆 Trophy Shelf
              </h2>
              <div className="flex items-center gap-3 flex-wrap">
                {TROPHIES.map((trophy, i) => (
                  <div key={i} className="w-12 h-12 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center text-2xl hover:scale-110 transition-transform cursor-pointer">
                    {trophy}
                  </div>
                ))}
                <div className="w-12 h-12 rounded-xl bg-[var(--bg-elevated)] border border-dashed border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] text-lg">
                  +
                </div>
              </div>
            </motion.div>
          )}

          {/* Today's Recommendations */}
          <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp}>
            <h2 className="font-heading font-bold text-xl text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Star size={20} style={{ color: accent }} />
              Recommended Today
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {RECOMMENDED_LESSONS.map((lesson, i) => (
                <motion.div key={lesson.topic} initial="hidden" animate="visible" custom={i + 3} variants={fadeUp}>
                  <Link href={`/tutor/${lesson.subject.toLowerCase()}?topic=${encodeURIComponent(lesson.topic)}&mode=${lesson.mode}`}>
                    <div
                      className="rounded-xl border p-4 hover:-translate-y-1 transition-all cursor-pointer group"
                      style={{ borderColor: `${lesson.color}30`, background: `${lesson.color}06` }}
                      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 8px 20px ${lesson.color}25`)}
                      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl">{lesson.icon}</span>
                        <span className="text-xs px-2 py-1 rounded-full font-medium capitalize"
                          style={{ background: `${lesson.color}20`, color: lesson.color }}>
                          {lesson.mode}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] mb-1">{lesson.subject}</p>
                      <h3 className="font-semibold text-[var(--text-primary)] mb-3 leading-tight">
                        {lesson.topic}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                          <span className="flex items-center gap-1">
                            <Clock size={11} /> {lesson.duration}
                          </span>
                          <span className="flex items-center gap-1" style={{ color: lesson.color }}>
                            <Zap size={11} /> +{lesson.xp} XP
                          </span>
                        </div>
                        <Play size={14} style={{ color: lesson.color }} className="group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mode Selector */}
          <motion.div
            initial="hidden" animate="visible" custom={5} variants={fadeUp}
            className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5"
          >
            <ModeSelector selected={selectedMode} onChange={setSelectedMode} />
          </motion.div>

          {/* Subject Grid */}
          <motion.div initial="hidden" animate="visible" custom={6} variants={fadeUp}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-bold text-xl text-[var(--text-primary)] flex items-center gap-2">
                <BookOpen size={20} style={{ color: accent }} />
                Your Subjects
              </h2>
              <Button variant="ghost" size="sm">
                View All <ChevronRight size={14} />
              </Button>
            </div>
            <div className={`grid gap-4 ${isKids ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"}`}>
              {subjects.map((s, i) => (
                <motion.div key={s.subject} initial="hidden" animate="visible" custom={i + 7} variants={fadeUp}>
                  <SubjectCard {...s} tier={user.tier} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial="hidden" animate="visible" custom={13} variants={fadeUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              { label: "Sessions Today", value: "3", icon: "📚" },
              { label: "Time Studied", value: "1h 20m", icon: "⏱️" },
              { label: "Topics Mastered", value: "24", icon: "🎯" },
              { label: "Current Level", value: `Lv ${Math.floor(Math.sqrt(user.xp / 50)) + 1}`, icon: "⚡" },
            ].map(({ label, value, icon }, i) => (
              <div key={label} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 text-center">
                <span className="text-2xl">{icon}</span>
                <p className="font-heading font-bold text-xl mt-1 text-[var(--text-primary)]">{value}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* Parent Widget for NeuroKids */}
          {isKids && (
            <motion.div
              initial="hidden" animate="visible" custom={14} variants={fadeUp}
              className="rounded-2xl border border-[#FF5C3A]/30 bg-[#FF5C3A]/05 p-5"
            >
              <h3 className="font-heading font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                👨‍👩‍👧 Parent Corner
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-3">
                Your parent can see your progress and get suggestions for helping you at home.
              </p>
              <Link href="/homeschool">
                <Button variant="secondary" size="sm" style={{ borderColor: "#FF5C3A", color: "#FF5C3A" }}>
                  Parent Dashboard →
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
