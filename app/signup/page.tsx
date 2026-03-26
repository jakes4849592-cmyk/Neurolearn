"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Brain, Mail, Lock, Eye, EyeOff, User, ChevronRight, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import type { Tier } from "@/types";

const tiers: { id: Tier; emoji: string; name: string; grades: string; color: string }[] = [
  { id: "neurokids", emoji: "🌟", name: "NeuroKids", grades: "Grades K–6", color: "#FF5C3A" },
  { id: "neurolearn", emoji: "⚡", name: "NeuroLearn", grades: "Grades 6–12", color: "#4F7EFF" },
  { id: "advanced", emoji: "🏆", name: "Advanced", grades: "College+", color: "#C9971E" },
];

const roles = [
  { id: "student", label: "Student", emoji: "🎒" },
  { id: "teacher", label: "Teacher", emoji: "👨‍🏫" },
  { id: "parent", label: "Parent / Homeschool", emoji: "🏠" },
];

const gradeOptions = [
  "Kindergarten", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
  "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12",
  "College", "Graduate+",
];

type Step = 1 | 2 | 3;

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultTier = (searchParams.get("tier") as Tier) || "neurolearn";

  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTier, setSelectedTier] = useState<Tier>(defaultTier);
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<string>("student");
  const [gradeLevel, setGradeLevel] = useState("Grade 9");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setStep(2);
  };

  const handleStep2 = () => {
    setStep(3);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            tier: selectedTier,
            role,
            grade_level: gradeLevel,
          },
        },
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const stepLabels = ["Account", "Your Tier", "Profile"];

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4 py-12 dot-grid">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #4F7EFF30, transparent)" }}
        />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 justify-center mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center">
              <Brain size={20} className="text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-[var(--text-primary)]">
              Neuro<span className="text-[var(--accent)]">Learn</span>
            </span>
          </Link>
          <h1 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-1">
            Create your account
          </h1>
          <p className="text-[var(--text-secondary)] text-sm">Free forever. No credit card required.</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {stepLabels.map((label, i) => {
            const stepNum = (i + 1) as Step;
            const isCompleted = step > stepNum;
            const isCurrent = step === stepNum;
            return (
              <React.Fragment key={label}>
                <div className="flex items-center gap-2">
                  <div
                    className={[
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isCurrent
                        ? "text-white"
                        : "bg-[var(--bg-elevated)] text-[var(--text-muted)]",
                    ].join(" ")}
                    style={isCurrent ? { background: "var(--accent)" } : {}}
                  >
                    {isCompleted ? <CheckCircle size={16} /> : stepNum}
                  </div>
                  <span
                    className={`text-sm font-medium hidden sm:block ${
                      isCurrent ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div
                    className={`h-0.5 w-8 rounded-full transition-all ${
                      step > stepNum + 1 || step > stepNum
                        ? "bg-[var(--accent)]"
                        : "bg-[var(--border)]"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-7 shadow-xl overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Step 1: Email + Password */}
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleStep1}
                className="space-y-5"
              >
                <h2 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-1">
                  Create your account
                </h2>

                {error && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <Input
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  icon={<Mail size={16} />}
                  required
                />

                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="8+ characters"
                    icon={<Lock size={16} />}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[calc(50%+4px)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <Input
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  icon={<Lock size={16} />}
                  required
                />

                <Button type="submit" variant="primary" size="lg" fullWidth>
                  Continue
                  <ChevronRight size={16} />
                </Button>
              </motion.form>
            )}

            {/* Step 2: Tier Selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <h2 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-1">
                  Choose your learning tier
                </h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  You can always change this in settings.
                </p>

                <div className="space-y-3">
                  {tiers.map(({ id, emoji, name, grades, color }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedTier(id)}
                      className={[
                        "w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                        selectedTier === id
                          ? ""
                          : "border-[var(--border)] hover:border-[var(--border-hover)] bg-[var(--bg-elevated)]",
                      ].join(" ")}
                      style={
                        selectedTier === id
                          ? {
                              background: `${color}12`,
                              borderColor: `${color}50`,
                              boxShadow: `0 0 15px ${color}20`,
                            }
                          : {}
                      }
                    >
                      <span className="text-2xl">{emoji}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-[var(--text-primary)]" style={selectedTier === id ? { color } : {}}>
                          {name}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">{grades}</p>
                      </div>
                      {selectedTier === id && (
                        <CheckCircle size={18} style={{ color }} />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="ghost" size="lg" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button variant="primary" size="lg" fullWidth onClick={handleStep2}>
                    Continue
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Profile */}
            {step === 3 && (
              <motion.form
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSignup}
                className="space-y-5"
              >
                <h2 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-1">
                  Set up your profile
                </h2>

                {error && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <Input
                  label="Display Name"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="How should Nero call you?"
                  icon={<User size={16} />}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    I am a...
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {roles.map(({ id, label, emoji }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setRole(id)}
                        className={[
                          "flex flex-col items-center gap-1.5 p-3 rounded-xl border text-sm transition-all",
                          role === id
                            ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                            : "border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]",
                        ].join(" ")}
                      >
                        <span className="text-xl">{emoji}</span>
                        <span className="font-medium text-xs">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {(role === "student" || selectedTier === "neurokids") && (
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Grade Level
                    </label>
                    <select
                      value={gradeLevel}
                      onChange={(e) => setGradeLevel(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                    >
                      {gradeOptions.map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button variant="ghost" size="lg" onClick={() => setStep(2)} type="button">
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={loading}
                  >
                    Create Account
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <div className="text-center mt-5 text-sm text-[var(--text-secondary)]">
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--accent)] font-semibold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="text-[var(--text-muted)]">Loading...</div>
      </div>
    }>
      <SignupContent />
    </Suspense>
  );
}
