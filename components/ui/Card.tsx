"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  glass?: boolean;
  onClick?: () => void;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
};

export function Card({
  children,
  className = "",
  hover = false,
  glow = false,
  glass = false,
  onClick,
  padding = "md",
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={[
        "rounded-2xl border",
        glass
          ? "bg-[var(--glass-bg)] backdrop-blur-md border-[var(--glass-border)]"
          : "bg-[var(--card-bg)] border-[var(--border)]",
        paddingStyles[padding],
        hover ? "card-lift cursor-pointer" : "",
        glow ? "animate-glow" : "",
        onClick ? "cursor-pointer" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className = "" }: CardTitleProps) {
  return (
    <h3 className={`font-heading text-lg font-semibold text-[var(--text-primary)] ${className}`}>
      {children}
    </h3>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return (
    <div className={`text-[var(--text-secondary)] ${className}`}>
      {children}
    </div>
  );
}

export default Card;
