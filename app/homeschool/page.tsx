"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Home, Users, BookOpen, BarChart2, Calendar, Brain,
  Plus, ChevronRight, CheckCircle, Lightbulb, Download,
  MessageCircle, Target, Clock, Star, X
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MasteryRing } from "@/components/progress/MasteryRing";
import { XPBar } from "@/components/dashboard/XPBar";
import { StreakCounter } from "@/components/dashboard/StreakCounter";
import type { HomeschoolChild, CurriculumGoal } from "@/types";

const DEMO_CHILDREN: HomeschoolChild[] = [
  {
    id: "c1",
    parentId: "p1",
    name: "Lily",
    gradeLevel: 4,
    tier: "neurokids",
    xp: 850,
    streak: 7,
    subjects: ["Reading", "Math", "Science", "Art"],
    createdAt: "2025-01-01",
  },
  {
    id: "c2",
    parentId: "p1",
    name: "Marcus",
    gradeLevel: 8,
    tier: "neurolearn",
    xp: 2200,
    streak: 14,
    subjects: ["Mathematics", "English", "History", "Biology"],
    createdAt: "2025-01-01",
  },
];

const CURRICULUM_GOALS: CurriculumGoal[] = [
  { id: "g1", childId: "c1", subject: "Math", targetMastery: 85, targetDate: "2025-06-01", currentMastery: 62, milestones: ["Addition/Subtraction", "Multiplication", "Division", "Fractions"] },
  { id: "g2", childId: "c1", subject: "Reading", targetMastery: 90, targetDate: "2025-06-01", currentMastery: 78, milestones: ["Phonics", "Comprehension", "Vocabulary", "Writing"] },
  { id: "g3", childId: "c2", subject: "Mathematics", targetMastery: 80, targetDate: "2025-06-01", currentMastery: 65, milestones: ["Algebra", "Geometry", "Statistics"] },
];

const PARENT_TEACHING_TIPS = [
  {
    subject: "Math (Grade 4)",
    tip: "When teaching fractions, use pizza or pie slices as a visual. Have Lily count how many slices are eaten vs. remaining.",
    activity: "Pizza Fraction Game",
  },
  {
    subject: "Reading (Grade 4)",
    tip: "After Lily reads with Nero, ask her to tell YOU the story in her own words. This reinforces comprehension and builds confidence.",
    activity: "Story Retelling",
  },
  {
    subject: "Mathematics (Grade 8)",
    tip: "Marcus is working on algebra. Real-world examples help: 'If a video game costs $x and you have $40, how many can you buy?'",
    activity: "Budget Math Challenge",
  },
];

const LESSON_PLANS = [
  {
    week: "Week of March 24",
    child: "Lily",
    items: [
      { subject: "Math", topic: "Multiplying by 2-digit numbers", done: true, mins: 30 },
      { subject: "Reading", topic: "Main idea vs. supporting details", done: true, mins: 25 },
      { subject: "Science", topic: "States of matter exploration", done: false, mins: 35 },
      { subject: "Art", topic: "Color mixing and primary colors", done: false, mins: 40 },
    ],
  },
  {
    week: "Week of March 24",
    child: "Marcus",
    items: [
      { subject: "Mathematics", topic: "Solving two-step equations", done: true, mins: 45 },
      { subject: "English", topic: "Persuasive essay structure", done: false, mins: 40 },
      { subject: "History", topic: "Civil Rights Movement timeline", done: false, mins: 35 },
      { subject: "Biology", topic: "Cell membrane and transport", done: true, mins: 30 },
    ],
  },
];

const SESSION_LOGS = [
  { child: "Lily", subject: "Math", topic: "Fractions", date: "Today 2:30 PM", duration: "28 min", summary: "Lily struggled initially with equivalent fractions but Nero guided her through 5 examples. She got the last 3 independently! Recommended: practice with visual fraction bars." },
  { child: "Marcus", subject: "Mathematics", topic: "Linear equations", date: "Today 11:00 AM", duration: "35 min", summary: "Strong session — Marcus solved all 8 practice problems. Nero challenged him with word problems. Ready to move to systems of equations." },
  { child: "Lily", subject: "Reading", topic: "Summarizing stories", date: "Yesterday", duration: "22 min", summary: "Lily showed good understanding of plot but needs more work on identifying character motivations. Suggested activity: discuss character feelings during family reading time." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

export default function HomeschoolPage() {
  const [selectedChild, setSelectedChild] = useState<HomeschoolChild>(DEMO_CHILDREN[0]);
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "lessons" | "logs" | "parent-mode">("overview");
  const [showAddChild, setShowAddChild] = useState(false);
  const [parentModeSubject, setParentModeSubject] = useState("");
  const [parentModeMessages, setParentModeMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [parentModeInput, setParentModeInput] = useState("");
  const [parentModeLoading, setParentModeLoading] = useState(false);

  const handleParentModeChat = async () => {
    if (!parentModeInput.trim()) return;
    const userMsg = parentModeInput.trim();
    setParentModeInput("");
    setParentModeMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setParentModeLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...parentModeMessages, { role: "user", content: userMsg }],
          tier: "neurolearn",
          subject: parentModeSubject || "General",
          mode: "teach",
          systemOverride: `You are Nero in Parent Teaching Mode. The user is a PARENT, not a student.
          Your job is to explain concepts clearly so the parent can teach their child at home.
          Provide practical teaching tips, simple explanations, suggested activities, and common misconceptions to watch out for.
          Be warm, supportive, and acknowledge that parenting is hard work.
          Give actionable advice the parent can use today.`,
        }),
      });

      if (res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let fullText = "";
        setParentModeMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;
          setParentModeMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "assistant", content: fullText };
            return updated;
          });
        }
      }
    } catch (err) {
      setParentModeMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I couldn't connect. Please try again." }]);
    } finally {
      setParentModeLoading(false);
    }
  };

  const childGoals = CURRICULUM_GOALS.filter((g) => g.childId === selectedChild.id);
  const childLessonPlan = LESSON_PLANS.find((lp) => lp.child === selectedChild.name);
  const childLogs = SESSION_LOGS.filter((l) => l.child === selectedChild.name);

  return (
    <div className="min-h-screen bg-[var(--bg)] dot-grid">
      <Navbar />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #FF5C3A30, transparent)" }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #4F7EFF30, transparent)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FF5C3A]/15 text-[#FF5C3A] border border-[#FF5C3A]/30 mb-4">
            🏠 Homeschool Hub
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-3">
            Your Homeschool Command Center
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl">
            Plan curriculum, track progress, get AI teaching guidance, and manage all your children in one place. Nero helps you teach better.
          </p>
        </motion.div>

        {/* Child Selector */}
        <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <p className="text-sm font-medium text-[var(--text-muted)]">View child:</p>
            {DEMO_CHILDREN.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className={[
                  "flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all",
                  selectedChild.id === child.id
                    ? "bg-[#FF5C3A] border-[#FF5C3A] text-white"
                    : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[#FF5C3A]/40 bg-[var(--card-bg)]",
                ].join(" ")}
              >
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF5C3A] to-[#FFAD3A] flex items-center justify-center text-white text-xs font-bold">
                  {child.name[0]}
                </span>
                {child.name}
                <span className="text-xs opacity-70">Gr. {child.gradeLevel}</span>
              </button>
            ))}
            <button
              onClick={() => setShowAddChild(true)}
              className="flex items-center gap-1 px-4 py-2 rounded-xl border border-dashed border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[#FF5C3A] hover:text-[#FF5C3A] transition-all"
            >
              <Plus size={14} /> Add Child
            </button>
          </div>
        </motion.div>

        {/* Child Overview Card */}
        <motion.div
          initial="hidden" animate="visible" custom={2} variants={fadeUp}
          className="bg-[var(--card-bg)] border border-[#FF5C3A]/20 rounded-2xl p-5 mb-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF5C3A] to-[#FFAD3A] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {selectedChild.name[0]}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
                  {selectedChild.name}
                </h2>
                <span className="text-xs px-2 py-1 rounded-full bg-[#FF5C3A]/15 text-[#FF5C3A] font-medium">
                  Grade {selectedChild.gradeLevel}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-[var(--bg-elevated)] text-[var(--text-muted)]">
                  {selectedChild.tier === "neurokids" ? "⭐ NeuroKids" : "⚡ NeuroLearn"}
                </span>
              </div>
              <XPBar xp={selectedChild.xp} showLabel={false} height="sm" accentColor="#FF5C3A" />
            </div>
            <div className="flex items-center gap-4">
              <StreakCounter streak={selectedChild.streak} size="sm" />
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp} className="mb-6">
          <div className="flex items-center gap-2 flex-wrap border-b border-[var(--border)] pb-3">
            {[
              { id: "overview", label: "Overview", icon: Home },
              { id: "curriculum", label: "Curriculum Goals", icon: Target },
              { id: "lessons", label: "Lesson Plans", icon: Calendar },
              { id: "logs", label: "Session Logs", icon: MessageCircle },
              { id: "parent-mode", label: "Parent Mode 🧑‍🏫", icon: Brain },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={[
                  "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                  activeTab === id
                    ? "bg-[#FF5C3A] text-white"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]",
                ].join(" ")}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedChild.subjects.map((subject, i) => {
                const masteryData: Record<string, number> = {
                  Math: 62, Reading: 78, Science: 45, Art: 85,
                  Mathematics: 65, English: 72, History: 40, Biology: 58,
                };
                const mastery = masteryData[subject] || 50;
                const colors: Record<string, string> = {
                  Math: "#4F7EFF", Reading: "#00CFFF", Science: "#00FFB3", Art: "#FF69B4",
                  Mathematics: "#4F7EFF", English: "#C9971E", History: "#FF5C3A", Biology: "#7C3AED",
                };
                const color = colors[subject] || "#4F7EFF";

                return (
                  <motion.div
                    key={subject}
                    initial="hidden" animate="visible"
                    custom={i}
                    variants={fadeUp}
                    className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 flex items-center gap-4"
                  >
                    <MasteryRing percentage={mastery} size={64} strokeWidth={6} color={color} />
                    <div>
                      <p className="font-semibold text-[var(--text-primary)]">{subject}</p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {mastery >= 80 ? "Mastered 🎉" : mastery >= 60 ? "Progressing ✅" : "Needs Work ⚠️"}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Parent Teaching Tips */}
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6">
              <h2 className="font-heading font-bold text-lg text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Lightbulb size={18} className="text-[#FFAD3A]" />
                AI Teaching Tips for {selectedChild.name}
              </h2>
              <div className="space-y-4">
                {PARENT_TEACHING_TIPS.filter((_, i) =>
                  selectedChild.id === "c1" ? i < 2 : i === 2
                ).map((tip, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#FFAD3A]/08 border border-[#FFAD3A]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-[#FFAD3A] uppercase tracking-wider">{tip.subject}</span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mb-2">{tip.tip}</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#FFAD3A]/20 text-[#FFAD3A] font-medium">
                      💡 Try: {tip.activity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Curriculum Goals Tab */}
        {activeTab === "curriculum" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-xl text-[var(--text-primary)]">
                Curriculum Goals for {selectedChild.name}
              </h2>
              <Button variant="primary" size="sm" style={{ background: "#FF5C3A" }}>
                <Plus size={14} /> Add Goal
              </Button>
            </div>

            {childGoals.length === 0 ? (
              <div className="text-center py-12 text-[var(--text-muted)]">
                <Target size={40} className="mx-auto mb-3 opacity-50" />
                <p>No curriculum goals yet. Add one to start tracking progress!</p>
              </div>
            ) : (
              childGoals.map((goal, i) => (
                <motion.div
                  key={goal.id}
                  initial="hidden" animate="visible" custom={i} variants={fadeUp}
                  className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)]">{goal.subject}</h3>
                      <p className="text-xs text-[var(--text-muted)]">Target date: {goal.targetDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[var(--text-muted)]">Target: {goal.targetMastery}%</p>
                      <p className="text-sm font-bold text-[#FF5C3A]">Current: {goal.currentMastery}%</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[var(--text-muted)]">Progress to goal</span>
                      <span className="text-xs font-semibold text-[#FF5C3A]">
                        {Math.round((goal.currentMastery / goal.targetMastery) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-[var(--bg-elevated)] rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#FF5C3A] to-[#FFAD3A]"
                        style={{ width: `${Math.min((goal.currentMastery / goal.targetMastery) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {goal.milestones.map((m, j) => (
                      <span
                        key={m}
                        className={[
                          "text-xs px-2 py-1 rounded-full border font-medium",
                          j < Math.floor(goal.currentMastery / (100 / goal.milestones.length))
                            ? "bg-green-500/15 border-green-500/30 text-green-400"
                            : "bg-[var(--bg-elevated)] border-[var(--border)] text-[var(--text-muted)]",
                        ].join(" ")}
                      >
                        {j < Math.floor(goal.currentMastery / (100 / goal.milestones.length)) ? "✓ " : ""}{m}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {/* Lesson Plans Tab */}
        {activeTab === "lessons" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-xl text-[var(--text-primary)]">
                Lesson Plan — {childLessonPlan?.week}
              </h2>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  <Download size={14} /> Export PDF
                </Button>
                <Button variant="primary" size="sm" style={{ background: "#FF5C3A" }}>
                  <Plus size={14} /> Add Lesson
                </Button>
              </div>
            </div>

            {childLessonPlan ? (
              <div className="space-y-3">
                {childLessonPlan.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial="hidden" animate="visible" custom={i} variants={fadeUp}
                    className={[
                      "bg-[var(--card-bg)] border rounded-xl p-4 flex items-center gap-4 transition-all",
                      item.done ? "border-green-500/20 bg-green-500/03" : "border-[var(--border)]",
                    ].join(" ")}
                  >
                    <div className={[
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 cursor-pointer",
                      item.done ? "border-green-500 bg-green-500" : "border-[var(--border)]",
                    ].join(" ")}>
                      {item.done && <CheckCircle size={14} className="text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${item.done ? "line-through text-[var(--text-muted)]" : "text-[var(--text-primary)]"}`}>
                        {item.topic}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">{item.subject}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <Clock size={11} /> {item.mins} min
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Start with Nero <ChevronRight size={12} />
                    </Button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-[var(--text-muted)]">
                <Calendar size={40} className="mx-auto mb-3 opacity-50" />
                <p>No lesson plan this week yet.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Session Logs Tab */}
        {activeTab === "logs" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="font-heading font-bold text-xl text-[var(--text-primary)]">
              Session Logs — {selectedChild.name}
            </h2>

            {childLogs.length === 0 ? (
              <div className="text-center py-12 text-[var(--text-muted)]">
                <MessageCircle size={40} className="mx-auto mb-3 opacity-50" />
                <p>No sessions yet for {selectedChild.name}.</p>
              </div>
            ) : (
              childLogs.map((log, i) => (
                <motion.div
                  key={i}
                  initial="hidden" animate="visible" custom={i} variants={fadeUp}
                  className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] font-medium">
                        {log.subject}
                      </span>
                      <span className="text-sm font-semibold text-[var(--text-primary)]">{log.topic}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                      <span>{log.date}</span>
                      <span className="flex items-center gap-1"><Clock size={10} /> {log.duration}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{log.summary}</p>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {/* Parent Mode Tab */}
        {activeTab === "parent-mode" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            <div className="bg-gradient-to-r from-[#4F7EFF]/10 to-[#00CFFF]/10 border border-[#4F7EFF]/20 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <Brain size={24} className="text-[#4F7EFF] flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-heading font-bold text-xl text-[var(--text-primary)] mb-1">
                    Parent Teaching Mode
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Ask Nero to explain concepts to YOU — so you can teach them to your child. Get teaching scripts, activity ideas, and tips on explaining things simply.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                What subject are you learning to teach?
              </label>
              <Input
                placeholder="e.g., Grade 4 Fractions, or Algebra for 8th grade"
                value={parentModeSubject}
                onChange={(e) => setParentModeSubject(e.target.value)}
              />
            </div>

            {/* Chat Interface */}
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-[var(--border)] bg-[var(--bg-elevated)]">
                <p className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                  <Brain size={16} className="text-[#4F7EFF]" />
                  Nero — Parent Teaching Mode
                </p>
              </div>

              <div className="p-4 min-h-64 max-h-80 overflow-y-auto space-y-4">
                {parentModeMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">🧑‍🏫</div>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Hi! I&apos;m in Parent Teaching Mode. Ask me anything about a concept you want to teach your child — I&apos;ll explain it to YOU in a way you can easily pass on.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                      {[
                        "How do I explain fractions to a 4th grader?",
                        "Help me teach long division",
                        "What activities help with reading comprehension?",
                      ].map((s) => (
                        <button
                          key={s}
                          onClick={() => setParentModeInput(s)}
                          className="text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:border-[#4F7EFF]/40 bg-[var(--bg-elevated)] transition-all"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  parentModeMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F7EFF] to-[#00CFFF] flex items-center justify-center text-white text-sm flex-shrink-0">
                          🧠
                        </div>
                      )}
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm max-w-lg ${
                          msg.role === "user"
                            ? "rounded-tr-none text-white"
                            : "rounded-tl-none bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)]"
                        }`}
                        style={msg.role === "user" ? { background: "linear-gradient(135deg, #4F7EFF, #00CFFF)" } : {}}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
                {parentModeLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F7EFF] to-[#00CFFF] flex items-center justify-center text-white text-sm">🧠</div>
                    <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl rounded-tl-none px-4 py-3">
                      <div className="flex gap-1">
                        <div className="typing-dot" />
                        <div className="typing-dot" />
                        <div className="typing-dot" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-[var(--border)]">
                <div className="flex gap-3">
                  <input
                    value={parentModeInput}
                    onChange={(e) => setParentModeInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleParentModeChat()}
                    placeholder="Ask Nero how to teach something..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:border-[#4F7EFF]"
                  />
                  <Button
                    variant="primary"
                    onClick={handleParentModeChat}
                    disabled={!parentModeInput.trim() || parentModeLoading}
                    style={{ background: "linear-gradient(135deg, #4F7EFF, #00CFFF)" }}
                  >
                    Ask Nero
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Add Child Modal */}
      {showAddChild && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading font-bold text-xl text-[var(--text-primary)]">Add Child</h2>
              <button onClick={() => setShowAddChild(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <Input label="Child's Name" placeholder="e.g., Emma" />
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Grade Level</label>
                <select className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]">
                  {["Kindergarten", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8"].map(g => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => setShowAddChild(false)} fullWidth>Cancel</Button>
                <Button
                  variant="primary"
                  onClick={() => setShowAddChild(false)}
                  fullWidth
                  style={{ background: "#FF5C3A" }}
                >
                  Add Child
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
