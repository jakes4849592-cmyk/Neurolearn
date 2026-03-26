"use client";

import React from "react";
import { BookOpen, ClipboardCheck, Zap, GraduationCap } from "lucide-react";
import type { LearningMode } from "@/types";

interface ModeSelectorProps {
  selected: LearningMode;
  onChange: (mode: LearningMode) => void;
  subject?: string;
}

const modes: {
  id: LearningMode;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
}[] = [
  {
    id: "practice",
    label: "Practice",
    description: "Guided exercises with hints",
    icon: BookOpen,
    color: "#4F7EFF",
  },
  {
    id: "test",
    label: "Test",
    description: "Assessment mode — no hints",
    icon: ClipboardCheck,
    color: "#00CFFF",
  },
  {
    id: "challenge",
    label: "Challenge",
    description: "Harder problems, more XP",
    icon: Zap,
    color: "#C9971E",
  },
  {
    id: "teach",
    label: "Teach",
    description: "Explain it back to Nero",
    icon: GraduationCap,
    color: "#00FFB3",
  },
];

export function ModeSelector({ selected, onChange, subject }: ModeSelectorProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
        Learning Mode {subject && `— ${subject}`}
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {modes.map(({ id, label, description, icon: Icon, color }) => {
          const isSelected = selected === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={[
                "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 text-left",
                isSelected
                  ? "border-transparent"
                  : "border-[var(--border)] hover:border-[var(--border-hover)] bg-[var(--card-bg)]",
              ].join(" ")}
              style={
                isSelected
                  ? {
                      background: `${color}18`,
                      borderColor: `${color}60`,
                      boxShadow: `0 0 15px ${color}25`,
                    }
                  : {}
              }
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  background: isSelected ? `${color}30` : "var(--bg-elevated)",
                }}
              >
                <Icon size={18} style={{ color: isSelected ? color : "var(--text-muted)" }} />
              </div>
              <div>
                <p
                  className="text-xs font-semibold"
                  style={{ color: isSelected ? color : "var(--text-primary)" }}
                >
                  {label}
                </p>
                <p className="text-[10px] text-[var(--text-muted)] hidden sm:block">{description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ModeSelector;
