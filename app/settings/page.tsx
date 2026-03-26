"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, Trash2, Save, Eye, EyeOff } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TierBadge } from "@/components/ui/Badge";
import type { Tier } from "@/types";

const DEMO_USER = {
  displayName: "Alex",
  tier: "neurolearn" as Tier,
  xp: 1850,
  streak: 12,
};

const tiers: { id: Tier; emoji: string; name: string; grades: string; color: string }[] = [
  { id: "neurokids", emoji: "🌟", name: "NeuroKids", grades: "Grades K–6", color: "#FF5C3A" },
  { id: "neurolearn", emoji: "⚡", name: "NeuroLearn", grades: "Grades 6–12", color: "#4F7EFF" },
  { id: "advanced", emoji: "🏆", name: "Advanced", grades: "College+", color: "#C9971E" },
];

const gradeOptions = [
  "Kindergarten", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
  "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12",
  "College", "Graduate+",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [displayName, setDisplayName] = useState("Alex");
  const [email] = useState("alex@example.com");
  const [selectedTier, setSelectedTier] = useState<Tier>("neurolearn");
  const [gradeLevel, setGradeLevel] = useState("Grade 10");
  const [parentEmail, setParentEmail] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    streakAlerts: true,
    progressReports: true,
    newBadges: true,
    teacherMessages: false,
    weeklyDigest: true,
  });

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "account", label: "Account & Security", icon: Shield },
  ];

  return (
    <div className="flex h-screen bg-[var(--bg)] overflow-hidden">
      <Sidebar user={DEMO_USER} />

      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} className="mb-6">
          <h1 className="font-heading text-3xl font-bold text-[var(--text-primary)]">Settings</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage your account and preferences.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Navigation */}
          <motion.div
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="lg:w-52 flex-shrink-0"
          >
            <nav className="space-y-1 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-2">
              {sections.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={[
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left",
                    activeSection === id
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]",
                  ].join(" ")}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Content */}
          <motion.div
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
            className="flex-1"
          >
            {/* Profile Section */}
            {activeSection === "profile" && (
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 space-y-6">
                <h2 className="font-heading text-xl font-bold text-[var(--text-primary)]">
                  Profile Settings
                </h2>

                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center text-white text-2xl font-bold">
                    {displayName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">{displayName}</p>
                    <TierBadge tier={selectedTier} />
                    <Button variant="ghost" size="sm" className="mt-2 text-xs">
                      Change Avatar
                    </Button>
                  </div>
                </div>

                <Input
                  label="Display Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your display name"
                />

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Learning Tier
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {tiers.map(({ id, emoji, name, grades, color }) => (
                      <button
                        key={id}
                        onClick={() => setSelectedTier(id)}
                        className={[
                          "flex flex-col items-center gap-1.5 p-3 rounded-xl border text-sm transition-all",
                          selectedTier === id
                            ? ""
                            : "border-[var(--border)] hover:border-[var(--border-hover)] bg-[var(--bg-elevated)]",
                        ].join(" ")}
                        style={selectedTier === id ? { background: `${color}12`, borderColor: `${color}50` } : {}}
                      >
                        <span className="text-xl">{emoji}</span>
                        <span className="font-semibold text-xs" style={selectedTier === id ? { color } : {}}>
                          {name}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)]">{grades}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Grade Level
                  </label>
                  <select
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  >
                    {gradeOptions.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                {selectedTier === "neurokids" && (
                  <Input
                    label="Parent Email (for NeuroKids)"
                    type="email"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    placeholder="parent@example.com"
                  />
                )}

                <Button variant="primary" onClick={handleSave}>
                  <Save size={16} />
                  {saved ? "Saved!" : "Save Changes"}
                </Button>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === "notifications" && (
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 space-y-5">
                <h2 className="font-heading text-xl font-bold text-[var(--text-primary)]">
                  Notification Preferences
                </h2>

                {Object.entries(notifications).map(([key, value]) => {
                  const labels: Record<string, { label: string; desc: string }> = {
                    dailyReminder: { label: "Daily Study Reminder", desc: "Get reminded to study at your preferred time" },
                    streakAlerts: { label: "Streak Alerts", desc: "Get notified when your streak is at risk" },
                    progressReports: { label: "Progress Reports", desc: "Weekly summary of your learning progress" },
                    newBadges: { label: "New Badge Notifications", desc: "Get notified when you earn a badge" },
                    teacherMessages: { label: "Teacher Messages", desc: "Notifications from your teachers" },
                    weeklyDigest: { label: "Weekly Digest", desc: "A summary of your week's learning" },
                  };

                  return (
                    <div key={key} className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)]">
                      <div>
                        <p className="font-medium text-[var(--text-primary)] text-sm">{labels[key]?.label}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">{labels[key]?.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                        className={[
                          "relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0",
                          value ? "bg-[var(--accent)]" : "bg-[var(--bg)]",
                        ].join(" ")}
                      >
                        <div className={[
                          "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300",
                          value ? "left-6" : "left-1",
                        ].join(" ")} />
                      </button>
                    </div>
                  );
                })}

                <Button variant="primary" onClick={handleSave}>
                  <Save size={16} />
                  {saved ? "Saved!" : "Save Preferences"}
                </Button>
              </div>
            )}

            {/* Account Section */}
            {activeSection === "account" && (
              <div className="space-y-5">
                <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
                  <h2 className="font-heading text-xl font-bold text-[var(--text-primary)]">
                    Account & Security
                  </h2>

                  <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                    <p className="text-sm text-[var(--text-muted)] mb-0.5">Email Address</p>
                    <p className="font-medium text-[var(--text-primary)]">{email}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="relative">
                      <Input
                        label="New Password"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-[calc(50%+6px)] text-[var(--text-muted)]"
                      >
                        {showNewPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    <Input
                      label="Confirm New Password"
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                    <Button variant="primary" disabled={!newPassword || newPassword !== confirmNewPassword}>
                      <Shield size={15} />
                      Update Password
                    </Button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-950/20 border border-red-900/30 rounded-2xl p-6">
                  <h3 className="font-heading font-semibold text-red-400 mb-2 flex items-center gap-2">
                    <Trash2 size={16} /> Danger Zone
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">
                    Deleting your account is permanent and cannot be undone. All your progress, XP, badges, and data will be lost.
                  </p>

                  {!showDeleteConfirm ? (
                    <Button variant="danger" onClick={() => setShowDeleteConfirm(true)}>
                      <Trash2 size={14} />
                      Delete Account
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-red-400">
                        Are you absolutely sure? Type &quot;DELETE&quot; to confirm.
                      </p>
                      <Input placeholder="Type DELETE to confirm" />
                      <div className="flex gap-3">
                        <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)}>
                          Cancel
                        </Button>
                        <Button variant="danger">
                          <Trash2 size={14} />
                          Permanently Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
