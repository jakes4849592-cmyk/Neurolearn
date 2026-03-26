"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  BookOpen,
  Trophy,
  BarChart2,
  ScanLine,
  Users,
  Home,
  Star,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Shield,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const tiers = [
  {
    id: "neurokids",
    emoji: "🌟",
    name: "NeuroKids",
    grades: "Grades K–6",
    description: "Colorful, fun learning adventures designed for young minds. Nero becomes a friendly cartoon tutor!",
    bg: "#FFFAF5",
    accent: "#FF5C3A",
    border: "#FF5C3A40",
    features: ["Cartoon Nero tutor", "Story-based lessons", "Trophy collection", "Parent dashboard"],
  },
  {
    id: "neurolearn",
    emoji: "⚡",
    name: "NeuroLearn",
    grades: "Grades 6–12",
    description: "Intelligent, adaptive tutoring for middle and high schoolers. Level up your brain.",
    bg: "#06080F",
    accent: "#4F7EFF",
    border: "#4F7EFF40",
    popular: true,
    features: ["Full subject coverage", "Homework scanner", "Test prep mode", "XP & levels"],
  },
  {
    id: "advanced",
    emoji: "🏆",
    name: "Advanced",
    grades: "College & Beyond",
    description: "Rigorous, deep learning for advanced students, college prep, and lifelong learners.",
    bg: "#080609",
    accent: "#C9971E",
    border: "#C9971E40",
    features: ["College-level content", "Research assistance", "Critical thinking", "Citation guidance"],
  },
];

const features = [
  {
    icon: Brain,
    title: "Adaptive AI Tutor",
    description: "Nero learns how you learn. Questions adapt in real-time to your level, pace, and knowledge gaps.",
    color: "#4F7EFF",
  },
  {
    icon: TrendingUp,
    title: "Mastery-Based Learning",
    description: "Don't just memorize — master. Progress only when you truly understand, building rock-solid foundations.",
    color: "#00FFB3",
  },
  {
    icon: ScanLine,
    title: "Homework Scanner",
    description: "Snap a photo of any homework problem. Nero reads it and guides you to the solution step by step.",
    color: "#00CFFF",
  },
  {
    icon: Trophy,
    title: "Gamification",
    description: "Earn XP, level up, maintain streaks, and collect badges. Learning feels like an adventure.",
    color: "#C9971E",
  },
  {
    icon: Users,
    title: "Teacher Dashboard",
    description: "Teachers get class-wide insights, assignment tools, and alerts for students who need extra help.",
    color: "#7C3AED",
  },
  {
    icon: BarChart2,
    title: "Progress Reports",
    description: "Detailed breakdowns of mastery, time spent, and growth trends — for students, parents, and teachers.",
    color: "#FF5C3A",
  },
];

const steps = [
  {
    step: "01",
    title: "Choose Your Subject",
    description: "Pick from Math, Science, English, History, and more. Your tier determines the depth and style.",
    icon: BookOpen,
  },
  {
    step: "02",
    title: "Work with Nero",
    description: "Nero never just gives you the answer. Through questions and hints, YOU discover the solution.",
    icon: Brain,
  },
  {
    step: "03",
    title: "Track Your Mastery",
    description: "Watch your skill tree grow. See exactly what you've mastered and what's next on the path.",
    icon: TrendingUp,
  },
];

const testimonials = [
  {
    name: "Maya R.",
    role: "10th Grade Student",
    avatar: "👩‍🎓",
    text: "Nero explained quadratic equations better than my teacher did in a month. It asks me questions instead of just telling me the answer — and it actually works!",
    rating: 5,
  },
  {
    name: "David & Lisa Chen",
    role: "Homeschool Parents",
    avatar: "👨‍👩‍👧",
    text: "We homeschool our 3 kids and NeuroLearn has been a game changer. The Parent Mode helps US understand what to teach, and the kids love Nero!",
    rating: 5,
  },
  {
    name: "Mr. Williams",
    role: "8th Grade Math Teacher",
    avatar: "👨‍🏫",
    text: "The teacher dashboard shows me exactly which students are struggling before I even ask. It's like having a teaching assistant in every student's home.",
    rating: 5,
  },
];

const stats = [
  { value: "50,000+", label: "Students Learning" },
  { value: "4.9★", label: "Average Rating" },
  { value: "92%", label: "Grade Improvement" },
  { value: "180+", label: "Topics Covered" },
];

const homeschoolFeatures = [
  { icon: "📋", title: "Curriculum Planning", desc: "Set learning goals and get AI-generated lesson plans tailored to each child." },
  { icon: "👨‍👩‍👧‍👦", title: "Multiple Children", desc: "Manage all your kids under one account with individual progress tracking." },
  { icon: "🧑‍🏫", title: "Parent Teaching Mode", desc: "Nero explains concepts TO YOU so you can teach your child confidently." },
  { icon: "📊", title: "Detailed Reports", desc: "See exactly what your child learned, for how long, and where they need help." },
  { icon: "💬", title: "Session Logs", desc: "Review every conversation your child had with Nero for full transparency." },
  { icon: "🏆", title: "Milestone Tracking", desc: "Celebrate curriculum milestones and keep learning momentum strong." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] dot-grid">
      <Navbar />

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #4F7EFF40, transparent)" }}
        />
        <div
          className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #00CFFF30, transparent)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #00FFB330, transparent)" }}
        />
      </div>

      {/* ============ HERO ============ */}
      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-sm text-sm text-[var(--text-secondary)] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Now with Homework Scanner — snap a photo, get guided help
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="font-heading text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-none tracking-tight"
          >
            <span className="shimmer-text">Learn Anything.</span>
            <br />
            <span className="text-[var(--text-primary)]">Master Everything.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            NeuroLearn&apos;s AI tutor Nero uses the Socratic method to guide every student from curiosity to mastery. Adaptive, personalized, and actually fun.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/signup">
              <Button size="lg" variant="primary">
                Start Learning Free
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="secondary">
                Sign In
              </Button>
            </Link>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative mx-auto max-w-4xl animate-float"
          >
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)]/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/50">
              {/* Mock browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[var(--bg-elevated)] border-b border-[var(--border)]">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <div className="flex-1 mx-4 bg-[var(--bg)]/80 rounded-lg px-4 py-1 text-xs text-[var(--text-muted)]">
                  neurolearn.ai/tutor/math
                </div>
              </div>

              {/* Mock chat interface */}
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4F7EFF] to-[#00CFFF] flex items-center justify-center text-xl flex-shrink-0">
                    🧠
                  </div>
                  <div className="bg-[var(--bg-elevated)] rounded-2xl rounded-tl-none p-4 max-w-lg">
                    <p className="text-sm text-[var(--text-primary)]">
                      Great question! Instead of just telling you the answer, let me ask you this: if you have a quadratic equation <strong className="text-[#4F7EFF]">ax² + bx + c = 0</strong>, what do you think the discriminant tells you about the solutions?
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-gradient-to-r from-[#4F7EFF] to-[#00CFFF] rounded-2xl rounded-tr-none p-4 max-w-md">
                    <p className="text-sm text-white">
                      Maybe it tells us if there are real solutions? Like if it&apos;s negative there aren&apos;t any?
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center text-xl flex-shrink-0">
                    👤
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4F7EFF] to-[#00CFFF] flex items-center justify-center text-xl flex-shrink-0">
                    🧠
                  </div>
                  <div className="bg-[var(--bg-elevated)] rounded-2xl rounded-tl-none p-4 max-w-lg">
                    <p className="text-sm text-[var(--text-primary)]">
                      <strong className="text-[#00FFB3]">Exactly right! ✓</strong> You&apos;ve got the core idea. Now can you tell me the formula for the discriminant? Think about the quadratic formula and what&apos;s under the square root sign...
                    </p>
                  </div>
                </div>

                {/* XP earned indicator */}
                <div className="flex items-center justify-center">
                  <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    ⚡ +15 XP earned for correct reasoning!
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="relative z-10 py-12 border-y border-[var(--border)] bg-[var(--bg-surface)]/40 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="text-center"
              >
                <p className="font-heading text-3xl sm:text-4xl font-bold text-[var(--accent)] mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TIER SELECTOR ============ */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
              Built for Every Learner
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
              Three tiers, one AI. Nero adapts completely to the age, level, and needs of each learner.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className={[
                  "relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-2 cursor-pointer",
                  tier.popular ? "scale-105 md:scale-105" : "",
                ].join(" ")}
                style={{
                  background: `${tier.accent}08`,
                  borderColor: tier.border,
                }}
                whileHover={{ boxShadow: `0 12px 40px ${tier.accent}30` }}
              >
                {tier.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${tier.accent}, #00CFFF)` }}
                  >
                    Most Popular
                  </div>
                )}

                <div className="text-4xl mb-3">{tier.emoji}</div>
                <h3
                  className="font-heading text-2xl font-bold mb-1"
                  style={{ color: tier.accent }}
                >
                  {tier.name}
                </h3>
                <p className="text-sm font-medium text-[var(--text-muted)] mb-3">{tier.grades}</p>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">
                  {tier.description}
                </p>
                <ul className="space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <CheckCircle size={14} style={{ color: tier.accent }} className="flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/signup?tier=${tier.id}`} className="mt-5 block">
                  <Button
                    variant="secondary"
                    fullWidth
                    style={{ borderColor: tier.accent, color: tier.accent }}
                  >
                    Get Started with {tier.name}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how-it-works" className="relative z-10 py-24 px-4 bg-[var(--bg-surface)]/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
              How NeuroLearn Works
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              Three simple steps to genuine mastery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting lines */}
            <div className="hidden md:block absolute top-12 left-[33%] right-[33%] h-0.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] opacity-30" />

            {steps.map(({ step, title, description, icon: Icon }, i) => (
              <motion.div
                key={step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="text-center"
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-5">
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: "linear-gradient(135deg, var(--accent)20, var(--accent-secondary)10)" }}
                  />
                  <Icon size={28} className="relative z-10 text-[var(--accent)]" />
                  <span
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))" }}
                  >
                    {step}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-2">
                  {title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
              A complete learning platform powered by state-of-the-art AI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, description, color }, i) => (
              <motion.div
                key={title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.5}
                variants={fadeUp}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 transition-all duration-200 hover:-translate-y-1 group"
                whileHover={{ boxShadow: `0 8px 30px ${color}25`, borderColor: `${color}40` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-200 group-hover:scale-110"
                  style={{ background: `${color}15` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 className="font-heading font-semibold text-[var(--text-primary)] mb-2">
                  {title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOMESCHOOL ============ */}
      <section className="relative z-10 py-24 px-4 bg-[var(--bg-surface)]/30 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FF5C3A]/15 text-[#FF5C3A] border border-[#FF5C3A]/30 mb-5">
                🏠 Built for Homeschool Families
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-5">
                The Perfect Homeschool Co-Teacher
              </h2>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-7">
                NeuroLearn is built with homeschool families in mind. Whether you&apos;re a seasoned homeschool parent or just getting started, Nero works alongside you — helping you teach better and helping your kids learn more effectively.
              </p>
              <Link href="/homeschool">
                <Button variant="primary" size="lg">
                  Explore Homeschool Hub
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {homeschoolFeatures.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.5}
                  variants={fadeUp}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4 hover:border-[#FF5C3A]/40 transition-all"
                >
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <p className="font-semibold text-[var(--text-primary)] text-sm mb-1">{f.title}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
              Loved by Students, Parents & Teachers
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, avatar, text, rating }, i) => (
              <motion.div
                key={name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 italic">
                  &ldquo;{text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{avatar}</span>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)] text-sm">{name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent-secondary)]/10 p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
            <Shield size={40} className="mx-auto mb-4 text-[var(--accent)]" />
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
              Start Your Learning Journey
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-xl mx-auto">
              Join 50,000+ students already learning with Nero. No credit card required to start.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" variant="primary">
                  Get Started Free
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="secondary">
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
