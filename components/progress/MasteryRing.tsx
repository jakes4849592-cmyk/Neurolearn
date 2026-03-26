"use client";

import React, { useEffect, useState } from "react";

interface MasteryRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
  animated?: boolean;
}

export function MasteryRing({
  percentage,
  size = 120,
  strokeWidth = 10,
  color = "var(--accent)",
  label,
  sublabel,
  animated = true,
}: MasteryRingProps) {
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setDisplayPercent(percentage), 200);
      return () => clearTimeout(timer);
    } else {
      setDisplayPercent(percentage);
    }
  }, [percentage, animated]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayPercent / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="mastery-ring -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--bg-elevated)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
            filter: `drop-shadow(0 0 6px ${color}80)`,
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label ? (
          <>
            <span
              className="font-heading font-bold leading-none"
              style={{
                fontSize: size < 80 ? "1rem" : "1.5rem",
                color,
              }}
            >
              {label}
            </span>
            {sublabel && (
              <span className="text-[var(--text-muted)] mt-1" style={{ fontSize: size < 80 ? "0.6rem" : "0.7rem" }}>
                {sublabel}
              </span>
            )}
          </>
        ) : (
          <>
            <span
              className="font-heading font-bold leading-none"
              style={{
                fontSize: size < 80 ? "1rem" : "1.5rem",
                color,
              }}
            >
              {Math.round(displayPercent)}%
            </span>
            <span className="text-[var(--text-muted)] mt-0.5" style={{ fontSize: size < 80 ? "0.6rem" : "0.7rem" }}>
              mastery
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default MasteryRing;
