import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NeuroLearn — AI-Powered Education Platform",
    template: "%s | NeuroLearn",
  },
  description:
    "NeuroLearn is an AI-powered educational platform that adapts to every learner. From NeuroKids (K-6) to Advanced college-level content, our AI tutor Nero guides students using the Socratic method to build true mastery.",
  keywords: [
    "AI tutor",
    "personalized learning",
    "education",
    "Socratic method",
    "homeschool",
    "K-12",
    "adaptive learning",
    "mastery learning",
  ],
  authors: [{ name: "NeuroLearn" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://neurolearn.ai",
    siteName: "NeuroLearn",
    title: "NeuroLearn — AI-Powered Education Platform",
    description: "Learn Anything. Master Everything. With AI tutor Nero.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuroLearn",
    description: "Learn Anything. Master Everything.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="neurolearn"
    >
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
