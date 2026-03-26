import React from "react";
import Link from "next/link";
import { Brain, Mail, Globe, ExternalLink } from "lucide-react";

const footerLinks = {
  Product: [
    { href: "/#features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/homeschool", label: "Homeschool" },
    { href: "/#how-it-works", label: "How It Works" },
  ],
  Learning: [
    { href: "/signup", label: "Get Started" },
    { href: "/login", label: "Sign In" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/achievements", label: "Achievements" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/coppa", label: "COPPA Compliance" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center">
                <Brain size={20} className="text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-[var(--text-primary)]">
                Neuro<span className="text-[var(--accent)]">Learn</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
              AI-powered education that adapts to every learner. Master anything with Nero, your personal AI tutor.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com/neurolearn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
                title="Twitter / X"
              >
                <span className="text-sm font-bold">𝕏</span>
              </a>
              <a
                href="https://github.com/neurolearn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
                title="GitHub"
              >
                <Globe size={15} />
              </a>
              <a
                href="mailto:hello@neurolearn.ai"
                className="w-9 h-9 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([groupName, links]) => (
            <div key={groupName}>
              <h4 className="font-heading font-semibold text-[var(--text-primary)] mb-4 text-sm uppercase tracking-wider">
                {groupName}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            © {new Date().getFullYear()} NeuroLearn, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <span>🔒 COPPA Compliant</span>
            <span className="mx-2">•</span>
            <span>🌱 Built for learners</span>
            <span className="mx-2">•</span>
            <span>🤝 FERPA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
