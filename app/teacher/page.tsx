"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, BookOpen, BarChart2, AlertCircle, Download,
  Plus, Search, TrendingUp, Clock, CheckCircle, X
} from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MasteryRing } from "@/components/progress/MasteryRing";
import type { Tier } from "@/types";

const DEMO_TEACHER = {
  displayName: "Mr. Williams",
  tier: "neurolearn" as Tier,
  xp: 3200,
  streak: 8,
  role: "teacher",
};

const STUDENTS = [
  { id: "1", name: "Maya R.", grade: "10th", xp: 2400, streak: 14, mastery: 78, lastActive: "Today", status: "active", subjects: { Math: 82, Physics: 71, Chemistry: 65 } },
  { id: "2", name: "Jordan L.", grade: "10th", xp: 1200, streak: 2, mastery: 45, lastActive: "3 days ago", status: "at-risk", subjects: { Math: 42, Physics: 38, Chemistry: 55 } },
  { id: "3", name: "Sam K.", grade: "9th", xp: 1850, streak: 7, mastery: 62, lastActive: "Yesterday", status: "active", subjects: { Math: 70, Physics: 55, Chemistry: 60 } },
  { id: "4", name: "Priya M.", grade: "10th", xp: 3100, streak: 21, mastery: 88, lastActive: "Today", status: "excellent", subjects: { Math: 92, Physics: 85, Chemistry: 86 } },
  { id: "5", name: "Tyler B.", grade: "9th", xp: 400, streak: 0, mastery: 28, lastActive: "8 days ago", status: "inactive", subjects: { Math: 25, Physics: 30, Chemistry: 28 } },
  { id: "6", name: "Aisha N.", grade: "10th", xp: 2200, streak: 9, mastery: 71, lastActive: "Today", status: "active", subjects: { Math: 75, Physics: 68, Chemistry: 70 } },
];

const ASSIGNMENTS = [
  { id: "1", title: "Chapter 5 Review — Quadratic Functions", subject: "Mathematics", dueDate: "2025-04-02", completed: 4, total: 6 },
  { id: "2", title: "Newton's Laws Problem Set", subject: "Physics", dueDate: "2025-04-05", completed: 2, total: 6 },
  { id: "3", title: "Atomic Bonding Quiz Prep", subject: "Chemistry", dueDate: "2025-04-08", completed: 5, total: 6 },
];

const statusConfig = {
  active: { label: "Active", color: "#4F7EFF", bg: "#4F7EFF15" },
  excellent: { label: "Excellent", color: "#00FFB3", bg: "#00FFB315" },
  "at-risk": { label: "At Risk", color: "#FFAD3A", bg: "#FFAD3A15" },
  inactive: { label: "Inactive", color: "#FF5C3A", bg: "#FF5C3A15" },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4 } }),
};

export default function TeacherDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<typeof STUDENTS[0] | null>(null);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"students" | "assignments" | "analytics">("students");

  const filteredStudents = STUDENTS.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const atRiskStudents = STUDENTS.filter(s => s.status === "at-risk" || s.status === "inactive");
  const avgMastery = Math.round(STUDENTS.reduce((acc, s) => acc + s.mastery, 0) / STUDENTS.length);

  return (
    <div className="flex h-screen bg-[var(--bg)] overflow-hidden">
      <Sidebar user={DEMO_TEACHER} />

      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} className="mb-6">
          <h1 className="font-heading text-3xl font-bold text-[var(--text-primary)]">
            Teacher Dashboard
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Welcome back, {DEMO_TEACHER.displayName}. You have {atRiskStudents.length} students who need attention.
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Students", value: STUDENTS.length, icon: Users, color: "#4F7EFF" },
            { label: "Class Avg Mastery", value: `${avgMastery}%`, icon: TrendingUp, color: "#00FFB3" },
            { label: "Active Today", value: STUDENTS.filter(s => s.lastActive === "Today").length, icon: CheckCircle, color: "#00CFFF" },
            { label: "Need Attention", value: atRiskStudents.length, icon: AlertCircle, color: "#FF5C3A" },
          ].map(({ label, value, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial="hidden" animate="visible" custom={i + 1} variants={fadeUp}
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

        {/* Alert Banner */}
        {atRiskStudents.length > 0 && (
          <motion.div
            initial="hidden" animate="visible" custom={5} variants={fadeUp}
            className="rounded-xl border border-orange-500/30 bg-orange-500/8 p-4 mb-6 flex items-start gap-3"
          >
            <AlertCircle size={18} className="text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-orange-400 mb-1">Students Needing Attention</p>
              <p className="text-sm text-[var(--text-secondary)]">
                {atRiskStudents.map(s => s.name).join(", ")} —
                {" "}consider sending an encouragement message or assigning a review session.
              </p>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-5 border-b border-[var(--border)] pb-3">
          {[
            { id: "students", label: "Students", icon: Users },
            { id: "assignments", label: "Assignments", icon: BookOpen },
            { id: "analytics", label: "Analytics", icon: BarChart2 },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={[
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                activeTab === id
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]",
              ].join(" ")}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <Button variant="secondary" size="sm">
              <Download size={14} />
              Export Report
            </Button>
            <Button variant="primary" size="sm" onClick={() => setShowAssignmentModal(true)}>
              <Plus size={14} />
              New Assignment
            </Button>
          </div>
        </div>

        {/* Students Tab */}
        {activeTab === "students" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="mb-4">
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search size={15} />}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map((student, i) => {
                const status = statusConfig[student.status as keyof typeof statusConfig];
                return (
                  <motion.div
                    key={student.id}
                    initial="hidden" animate="visible" custom={i} variants={fadeUp}
                    className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5 hover:border-[var(--border-hover)] cursor-pointer transition-all"
                    onClick={() => setSelectedStudent(selectedStudent?.id === student.id ? null : student)}
                    style={selectedStudent?.id === student.id ? { borderColor: "var(--accent)" } : {}}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center text-white font-bold text-sm">
                          {student.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--text-primary)] text-sm">{student.name}</p>
                          <p className="text-xs text-[var(--text-muted)]">{student.grade} Grade</p>
                        </div>
                      </div>
                      <span
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{ background: status.bg, color: status.color }}
                      >
                        {status.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <MasteryRing percentage={student.mastery} size={50} strokeWidth={5} color={status.color} />
                      <div className="text-right">
                        <p className="text-xs text-[var(--text-muted)]">Last active</p>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{student.lastActive}</p>
                        <p className="text-xs text-orange-400">🔥 {student.streak} days</p>
                      </div>
                    </div>

                    {selectedStudent?.id === student.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 pt-3 border-t border-[var(--border)] space-y-2"
                      >
                        {Object.entries(student.subjects).map(([subj, mastery]) => (
                          <div key={subj}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-[var(--text-secondary)]">{subj}</span>
                              <span className="text-xs font-semibold text-[var(--accent)]">{mastery}%</span>
                            </div>
                            <div className="w-full bg-[var(--bg-elevated)] rounded-full h-1.5">
                              <div className="h-1.5 rounded-full bg-[var(--accent)]" style={{ width: `${mastery}%` }} />
                            </div>
                          </div>
                        ))}
                        <Button variant="primary" size="sm" fullWidth className="mt-2">
                          Send Encouragement
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Assignments Tab */}
        {activeTab === "assignments" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="space-y-4">
              {ASSIGNMENTS.map((assignment, i) => (
                <motion.div
                  key={assignment.id}
                  initial="hidden" animate="visible" custom={i} variants={fadeUp}
                  className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] font-medium">
                          {assignment.subject}
                        </span>
                        <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                          <Clock size={10} /> Due {assignment.dueDate}
                        </span>
                      </div>
                      <h3 className="font-semibold text-[var(--text-primary)] mb-3">{assignment.title}</h3>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-[var(--bg-elevated)] rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]"
                            style={{ width: `${(assignment.completed / assignment.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-[var(--text-secondary)]">
                          {assignment.completed}/{assignment.total} completed
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-3">Edit</Button>
                  </div>
                </motion.div>
              ))}

              <button
                onClick={() => setShowAssignmentModal(true)}
                className="w-full border-2 border-dashed border-[var(--border)] rounded-2xl p-6 text-center text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
              >
                <Plus size={20} className="mx-auto mb-1" />
                <p className="text-sm font-medium">Create New Assignment</p>
              </button>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6">
                <h3 className="font-heading font-semibold text-[var(--text-primary)] mb-5">Class Mastery Distribution</h3>
                {STUDENTS.map((s) => (
                  <div key={s.id} className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[var(--text-secondary)]">{s.name}</span>
                      <span className="text-xs font-semibold text-[var(--accent)]">{s.mastery}%</span>
                    </div>
                    <div className="w-full bg-[var(--bg-elevated)] rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${s.mastery}%`,
                          background: s.mastery >= 80 ? "#00FFB3" : s.mastery >= 60 ? "#4F7EFF" : s.mastery >= 40 ? "#FFAD3A" : "#FF5C3A",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6">
                <h3 className="font-heading font-semibold text-[var(--text-primary)] mb-5">Weekly Engagement</h3>
                <div className="space-y-3">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                    const sessions = [5, 4, 6, 3, 5, 2, 1][i];
                    return (
                      <div key={day} className="flex items-center gap-3">
                        <span className="text-xs text-[var(--text-muted)] w-8">{day}</span>
                        <div className="flex-1 bg-[var(--bg-elevated)] rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-[var(--accent)]"
                            style={{ width: `${(sessions / 6) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-[var(--text-secondary)] w-16 text-right">{sessions} sessions</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Assignment Modal */}
      {showAssignmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading font-bold text-xl text-[var(--text-primary)]">Create Assignment</h2>
              <button onClick={() => setShowAssignmentModal(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <Input label="Assignment Title" placeholder="e.g., Chapter 5 Practice Problems" />
              <Input label="Subject" placeholder="e.g., Mathematics" />
              <Input label="Due Date" type="date" />
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Description</label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] resize-none"
                  rows={3}
                  placeholder="Describe what students should study or practice..."
                />
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => setShowAssignmentModal(false)} fullWidth>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setShowAssignmentModal(false)} fullWidth>
                  Create Assignment
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
