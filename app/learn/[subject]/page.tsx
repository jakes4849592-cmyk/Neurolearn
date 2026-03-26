"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, CheckCircle, Circle, Zap, Play, BookOpen, Clock } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/Button";
import { MasteryRing } from "@/components/progress/MasteryRing";
import type { SkillNode, LearningMode, Tier } from "@/types";

const DEMO_USER = {
  displayName: "Alex",
  tier: "neurolearn" as Tier,
  xp: 1850,
  streak: 12,
};

const SUBJECT_DATA: Record<string, {
  name: string;
  emoji: string;
  color: string;
  description: string;
  mastery: number;
  nodes: SkillNode[];
}> = {
  mathematics: {
    name: "Mathematics",
    emoji: "🔢",
    color: "#4F7EFF",
    description: "Build from number sense to advanced algebra, geometry, and beyond.",
    mastery: 68,
    nodes: [
      { id: "n1", title: "Number Systems", status: "mastered", xpRequired: 0, connections: ["n2", "n3"], position: { x: 50, y: 10 } },
      { id: "n2", title: "Basic Algebra", status: "mastered", xpRequired: 100, connections: ["n4", "n5"], position: { x: 25, y: 30 } },
      { id: "n3", title: "Geometry Basics", status: "in-progress", xpRequired: 100, connections: ["n6"], position: { x: 75, y: 30 } },
      { id: "n4", title: "Linear Equations", status: "in-progress", xpRequired: 200, connections: ["n7"], position: { x: 15, y: 50 } },
      { id: "n5", title: "Quadratic Equations", status: "available", xpRequired: 200, connections: ["n7", "n8"], position: { x: 40, y: 50 } },
      { id: "n6", title: "Trigonometry", status: "available", xpRequired: 250, connections: ["n8"], position: { x: 70, y: 50 } },
      { id: "n7", title: "Functions & Graphs", status: "locked", xpRequired: 400, connections: ["n9"], position: { x: 30, y: 70 } },
      { id: "n8", title: "Polynomials", status: "locked", xpRequired: 400, connections: ["n9"], position: { x: 60, y: 70 } },
      { id: "n9", title: "Calculus Intro", status: "locked", xpRequired: 800, connections: [], position: { x: 50, y: 90 } },
    ],
  },
  physics: {
    name: "Physics",
    emoji: "⚛️",
    color: "#00CFFF",
    description: "From Newton's laws to quantum mechanics — understand how the universe works.",
    mastery: 45,
    nodes: [
      { id: "p1", title: "Kinematics", status: "mastered", xpRequired: 0, connections: ["p2"], position: { x: 50, y: 10 } },
      { id: "p2", title: "Newton's Laws", status: "in-progress", xpRequired: 100, connections: ["p3", "p4"], position: { x: 50, y: 30 } },
      { id: "p3", title: "Energy & Work", status: "available", xpRequired: 200, connections: ["p5"], position: { x: 25, y: 50 } },
      { id: "p4", title: "Momentum", status: "available", xpRequired: 200, connections: ["p5"], position: { x: 75, y: 50 } },
      { id: "p5", title: "Waves & Sound", status: "locked", xpRequired: 350, connections: ["p6"], position: { x: 50, y: 70 } },
      { id: "p6", title: "Electromagnetism", status: "locked", xpRequired: 500, connections: [], position: { x: 50, y: 90 } },
    ],
  },
};

const DEFAULT_SUBJECT = {
  name: "Subject",
  emoji: "📚",
  color: "#4F7EFF",
  description: "Master this subject step by step with AI-guided learning.",
  mastery: 0,
  nodes: [],
};

const statusStyles = {
  mastered: { bg: "#00FFB320", border: "#00FFB3", text: "#00FFB3", icon: CheckCircle },
  "in-progress": { bg: "#4F7EFF20", border: "#4F7EFF", text: "#4F7EFF", icon: Circle },
  available: { bg: "#C9971E20", border: "#C9971E", text: "#C9971E", icon: Circle },
  locked: { bg: "#2A2A3A", border: "#3A3A4A", text: "#555", icon: Lock },
};

export default function LearnSubjectPage() {
  const params = useParams();
  const subject = decodeURIComponent(params.subject as string).toLowerCase();
  const subjectData = SUBJECT_DATA[subject] || { ...DEFAULT_SUBJECT, name: subject.charAt(0).toUpperCase() + subject.slice(1) };

  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(
    subjectData.nodes.find((n) => n.status === "in-progress" || n.status === "available") || null
  );
  const [selectedMode, setSelectedMode] = useState<LearningMode>("practice");

  const completedNodes = subjectData.nodes.filter((n) => n.status === "mastered").length;
  const totalNodes = subjectData.nodes.length;

  return (
    <div className="flex h-screen bg-[var(--bg)] overflow-hidden">
      <Sidebar user={DEMO_USER} />

      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <div
          className="flex items-center gap-4 px-6 py-4 border-b border-[var(--border)] flex-shrink-0"
          style={{ borderBottomColor: `${subjectData.color}20` }}
        >
          <Link href="/dashboard">
            <button className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all">
              <ArrowLeft size={14} />
            </button>
          </Link>
          <span className="text-2xl">{subjectData.emoji}</span>
          <div>
            <h1 className="font-heading font-bold text-xl text-[var(--text-primary)]">
              {subjectData.name}
            </h1>
            <p className="text-xs text-[var(--text-muted)]">
              {completedNodes}/{totalNodes} topics mastered
            </p>
          </div>
          <div className="ml-auto">
            <MasteryRing percentage={subjectData.mastery} size={56} strokeWidth={5} color={subjectData.color} />
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex">
          {/* Left: Skill Tree */}
          <div className="w-72 lg:w-96 border-r border-[var(--border)] overflow-y-auto p-4 flex-shrink-0">
            <h2 className="font-heading font-semibold text-[var(--text-primary)] mb-4 text-sm uppercase tracking-wider">
              Skill Tree
            </h2>

            {subjectData.nodes.length === 0 ? (
              <div className="text-center py-8 text-[var(--text-muted)] text-sm">
                <p>Start chatting with Nero to build your skill tree!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {subjectData.nodes.map((node, i) => {
                  const style = statusStyles[node.status];
                  const IconComp = style.icon;
                  const isSelected = selectedNode?.id === node.id;

                  return (
                    <motion.button
                      key={node.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => node.status !== "locked" && setSelectedNode(node)}
                      className={[
                        "w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all",
                        node.status === "locked" ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-opacity-70",
                        isSelected ? "ring-1" : "",
                      ].join(" ")}
                      style={{
                        background: style.bg,
                        borderColor: isSelected ? style.border : `${style.border}40`,
                        boxShadow: isSelected ? `0 0 12px ${style.border}30` : "none",
                      }}
                    >
                      <IconComp size={16} style={{ color: style.text, flexShrink: 0 }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                          {node.title}
                        </p>
                        <p className="text-[10px] capitalize" style={{ color: style.text }}>
                          {node.status.replace("-", " ")}
                        </p>
                      </div>
                      {node.xpRequired > 0 && node.status === "locked" && (
                        <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-0.5">
                          <Lock size={9} /> {node.xpRequired}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: Topic Content */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8">
            {selectedNode ? (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl"
              >
                {/* Topic Header */}
                <div
                  className="rounded-2xl p-6 mb-6 border"
                  style={{ background: `${statusStyles[selectedNode.status].bg}`, borderColor: `${statusStyles[selectedNode.status].border}40` }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                        {subjectData.name} — Topic
                      </p>
                      <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-2">
                        {selectedNode.title}
                      </h2>
                      <span
                        className="inline-block text-xs px-3 py-1 rounded-full font-semibold capitalize"
                        style={{
                          background: `${statusStyles[selectedNode.status].border}20`,
                          color: statusStyles[selectedNode.status].text,
                        }}
                      >
                        {selectedNode.status.replace("-", " ")}
                      </span>
                    </div>
                    <MasteryRing
                      percentage={selectedNode.status === "mastered" ? 100 : selectedNode.status === "in-progress" ? 45 : 0}
                      size={64}
                      strokeWidth={6}
                      color={subjectData.color}
                    />
                  </div>
                </div>

                {/* Mastery Requirements */}
                <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5 mb-5">
                  <h3 className="font-heading font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                    <Zap size={16} style={{ color: subjectData.color }} />
                    Mastery Requirements
                  </h3>
                  <ul className="space-y-2">
                    {[
                      `Answer 5 questions correctly about ${selectedNode.title}`,
                      "Explain the concept back to Nero in Teach mode",
                      "Complete at least one Challenge level problem",
                      "Score 80%+ on a mini-test",
                    ].map((req, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <Circle size={12} style={{ color: subjectData.color, flexShrink: 0 }} />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learning Modes */}
                <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5 mb-5">
                  <h3 className="font-heading font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                    <BookOpen size={16} style={{ color: subjectData.color }} />
                    Choose How to Learn
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {(["practice", "test", "challenge", "teach"] as LearningMode[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedMode(m)}
                        className={[
                          "p-3 rounded-xl border text-sm font-medium capitalize transition-all text-left",
                          selectedMode === m
                            ? "border-transparent text-white"
                            : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]",
                        ].join(" ")}
                        style={selectedMode === m ? { background: `${subjectData.color}`, boxShadow: `0 0 12px ${subjectData.color}40` } : {}}
                      >
                        {m === "practice" && "📚 "}
                        {m === "test" && "📝 "}
                        {m === "challenge" && "⚡ "}
                        {m === "teach" && "🎓 "}
                        {m.charAt(0).toUpperCase() + m.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Start Button */}
                <Link href={`/tutor/${subject}?topic=${encodeURIComponent(selectedNode.title)}&mode=${selectedMode}`}>
                  <Button variant="primary" size="lg" fullWidth>
                    <Play size={18} />
                    Start with Nero — {selectedNode.title}
                  </Button>
                </Link>

                {/* Previous Session */}
                {selectedNode.status === "in-progress" && (
                  <div className="mt-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)]">
                    <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Clock size={11} /> Previous Session
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Last session: Yesterday, 25 min — covered the basics. Nero suggested reviewing the discriminant formula.
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center px-8">
                <div className="text-6xl mb-4">{subjectData.emoji}</div>
                <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-2">
                  {subjectData.name}
                </h2>
                <p className="text-[var(--text-secondary)] max-w-sm mb-6">
                  {subjectData.description}
                </p>
                <Link href={`/tutor/${subject}`}>
                  <Button variant="primary" size="lg">
                    <Play size={18} />
                    Start Learning with Nero
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
