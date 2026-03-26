"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, X, ArrowRight, Zap } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

const plans = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Get started with AI tutoring at no cost.",
    color: "#6B7280",
    features: [
      "5 AI tutor sessions/month",
      "Basic progress tracking",
      "2 subjects",
      "NeuroLearn tier only",
      "Community support",
    ],
    notIncluded: [
      "Homework scanner",
      "Teacher dashboard",
      "Parent controls",
      "Unlimited sessions",
      "Advanced analytics",
    ],
    cta: "Start Free",
    href: "/signup",
  },
  {
    id: "student",
    name: "Student Pro",
    monthlyPrice: 9.99,
    yearlyPrice: 7.99,
    description: "Everything a student needs to excel.",
    color: "#4F7EFF",
    popular: true,
    features: [
      "Unlimited AI tutor sessions",
      "All 3 learning tiers",
      "All subjects covered",
      "Homework scanner (OCR)",
      "Full progress analytics",
      "XP, levels & badges",
      "All learning modes",
      "Priority support",
    ],
    notIncluded: [
      "Teacher dashboard",
      "Multi-student management",
      "School-wide analytics",
    ],
    cta: "Start Student Pro",
    href: "/signup?plan=student",
  },
  {
    id: "family",
    name: "Family Plan",
    monthlyPrice: 19.99,
    yearlyPrice: 15.99,
    description: "Perfect for homeschool families. Up to 5 kids.",
    color: "#FF5C3A",
    features: [
      "Everything in Student Pro",
      "Up to 5 children",
      "Parent control center",
      "Curriculum planning tools",
      "Parent Teaching Mode",
      "Weekly progress reports",
      "Session conversation logs",
      "Milestone tracking",
      "Homeschool curriculum guides",
    ],
    notIncluded: [
      "Teacher dashboard",
      "School-wide analytics",
    ],
    cta: "Start Family Plan",
    href: "/signup?plan=family",
    badge: "Best for Homeschool",
  },
  {
    id: "school",
    name: "School License",
    monthlyPrice: null,
    yearlyPrice: null,
    description: "Full platform for schools and districts.",
    color: "#C9971E",
    features: [
      "Everything in Family Plan",
      "Unlimited students",
      "Full teacher dashboard",
      "Assignment creator",
      "Class-wide analytics",
      "Student alert system",
      "Export reports (PDF/CSV)",
      "FERPA compliant",
      "LMS integration (Canvas, etc.)",
      "Dedicated account manager",
      "Custom branding",
      "API access",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    href: "mailto:sales@neurolearn.ai",
    custom: true,
  },
];

const featureComparison = [
  { feature: "AI Tutor Sessions", free: "5/month", student: "Unlimited", family: "Unlimited", school: "Unlimited" },
  { feature: "Learning Tiers", free: "NeuroLearn", student: "All 3", family: "All 3", school: "All 3" },
  { feature: "Subjects", free: "2", student: "All", family: "All", school: "All" },
  { feature: "Homework Scanner", free: false, student: true, family: true, school: true },
  { feature: "Progress Analytics", free: "Basic", student: "Full", family: "Full", school: "Full" },
  { feature: "Parent Dashboard", free: false, student: false, family: true, school: true },
  { feature: "Multiple Children", free: false, student: false, family: "Up to 5", school: "Unlimited" },
  { feature: "Curriculum Planning", free: false, student: false, family: true, school: true },
  { feature: "Teacher Dashboard", free: false, student: false, family: false, school: true },
  { feature: "Class Analytics", free: false, student: false, family: false, school: true },
  { feature: "Export Reports", free: false, student: false, family: false, school: true },
  { feature: "FERPA Compliant", free: true, student: true, family: true, school: true },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

function FeatureValue({ value }: { value: boolean | string }) {
  if (value === false) return <X size={16} className="text-[var(--text-muted)] mx-auto" />;
  if (value === true) return <CheckCircle size={16} className="text-green-400 mx-auto" />;
  return <span className="text-xs text-[var(--text-secondary)]">{value}</span>;
}

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)] dot-grid">
      <Navbar />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #4F7EFF30, transparent)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} className="text-center mb-12">
          <h1 className="font-heading text-5xl sm:text-6xl font-bold text-[var(--text-primary)] mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
            Start free. Upgrade when you&apos;re ready. Every plan includes our core AI tutoring technology.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial="hidden" animate="visible" custom={1} variants={fadeUp}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <span className={`text-sm font-medium ${!isYearly ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={[
              "relative w-12 h-6 rounded-full transition-all duration-300",
              isYearly ? "bg-[var(--accent)]" : "bg-[var(--bg-elevated)]",
            ].join(" ")}
          >
            <div className={[
              "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300",
              isYearly ? "left-7" : "left-1",
            ].join(" ")} />
          </button>
          <span className={`text-sm font-medium ${isYearly ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`}>
            Annual
          </span>
          {isYearly && (
            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 font-semibold">
              Save 20%
            </span>
          )}
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial="hidden" animate="visible" custom={i + 2} variants={fadeUp}
              className={[
                "relative rounded-2xl border p-6 flex flex-col transition-all duration-200",
                plan.popular ? "scale-105" : "",
              ].join(" ")}
              style={{
                background: `${plan.color}08`,
                borderColor: plan.popular ? plan.color : `${plan.color}30`,
                boxShadow: plan.popular ? `0 0 30px ${plan.color}25` : "none",
              }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${plan.color}, #00CFFF)` }}>
                  Most Popular
                </div>
              )}
              {plan.badge && (
                <div className="absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-[#FF5C3A]">
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="font-heading text-xl font-bold mb-1" style={{ color: plan.color }}>
                  {plan.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">{plan.description}</p>

                {plan.custom ? (
                  <div className="mb-5">
                    <p className="font-heading text-2xl font-bold text-[var(--text-primary)]">Custom</p>
                    <p className="text-xs text-[var(--text-muted)]">Per student pricing</p>
                  </div>
                ) : (
                  <div className="mb-5">
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-4xl font-bold text-[var(--text-primary)]">
                        ${plan.monthlyPrice === 0 ? "0" : isYearly ? plan.yearlyPrice?.toFixed(2) : plan.monthlyPrice?.toFixed(2)}
                      </span>
                      {plan.monthlyPrice !== 0 && (
                        <span className="text-[var(--text-muted)] text-sm">/month</span>
                      )}
                    </div>
                    {isYearly && plan.monthlyPrice !== 0 && (
                      <p className="text-xs text-green-400">Billed annually — save ${((plan.monthlyPrice! - plan.yearlyPrice!) * 12).toFixed(0)}/year</p>
                    )}
                  </div>
                )}
              </div>

              <Link href={plan.href} className="mb-5">
                <Button
                  variant="primary"
                  fullWidth
                  style={!plan.popular ? { background: `${plan.color}20`, color: plan.color, border: `1px solid ${plan.color}40` } : {}}
                >
                  {plan.cta}
                  {!plan.custom && <ArrowRight size={14} />}
                </Button>
              </Link>

              <ul className="space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                    <CheckCircle size={13} style={{ color: plan.color, flexShrink: 0, marginTop: 1 }} />
                    {f}
                  </li>
                ))}
                {plan.notIncluded.slice(0, 3).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-[var(--text-muted)] opacity-50">
                    <X size={13} className="flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Homeschool Callout */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="rounded-2xl border border-[#FF5C3A]/30 bg-[#FF5C3A]/05 p-8 mb-16 text-center"
        >
          <div className="text-4xl mb-3">🏠</div>
          <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-2">
            Special: Homeschool Families
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-5">
            The Family Plan was built specifically with homeschool families in mind. Get the Parent Teaching Mode, curriculum planning tools, and multi-child management — everything you need to run an effective homeschool with AI support.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              "Parent Teaching Mode",
              "Curriculum Planning",
              "Up to 5 Children",
              "Session Logs",
              "Weekly Reports",
            ].map((f) => (
              <span key={f} className="text-xs px-3 py-1.5 rounded-full border border-[#FF5C3A]/30 bg-[#FF5C3A]/10 text-[#FF5C3A] font-medium">
                ✓ {f}
              </span>
            ))}
          </div>
          <div className="mt-5">
            <Link href="/homeschool">
              <Button variant="secondary" size="lg" style={{ borderColor: "#FF5C3A", color: "#FF5C3A" }}>
                Learn About Homeschool Hub <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Feature Comparison Table */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden mb-10"
        >
          <div className="p-6 border-b border-[var(--border)]">
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
              Feature Comparison
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left px-6 py-3 text-sm font-semibold text-[var(--text-muted)]">Feature</th>
                  {plans.map((p) => (
                    <th key={p.id} className="px-4 py-3 text-center text-sm font-semibold" style={{ color: p.color }}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-[var(--border)] ${i % 2 === 0 ? "bg-[var(--bg-surface)]/30" : ""}`}>
                    <td className="px-6 py-3 text-sm text-[var(--text-secondary)]">{row.feature}</td>
                    <td className="px-4 py-3 text-center"><FeatureValue value={row.free} /></td>
                    <td className="px-4 py-3 text-center"><FeatureValue value={row.student} /></td>
                    <td className="px-4 py-3 text-center"><FeatureValue value={row.family} /></td>
                    <td className="px-4 py-3 text-center"><FeatureValue value={row.school} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-center"
        >
          <p className="text-[var(--text-secondary)] mb-4">Have questions? We&apos;re here to help.</p>
          <a href="mailto:hello@neurolearn.ai">
            <Button variant="secondary">Contact Support</Button>
          </a>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
