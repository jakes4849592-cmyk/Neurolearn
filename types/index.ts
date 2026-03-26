export type Tier = "neurokids" | "neurolearn" | "advanced";
export type Role = "student" | "teacher" | "parent";
export type LearningMode = "practice" | "test" | "challenge" | "teach";
export type MasteryStatus = "locked" | "available" | "in-progress" | "mastered";

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: Role;
  tier: Tier;
  gradeLevel?: number;
  xp: number;
  streak: number;
  avatarUrl?: string;
  parentEmail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  imageUrl?: string;
}

export interface Session {
  id: string;
  userId: string;
  subject: string;
  mode: LearningMode;
  messages: Message[];
  xpEarned: number;
  duration: number;
  startedAt: Date;
  endedAt?: Date;
}

export interface Mastery {
  id: string;
  userId: string;
  subject: string;
  topic: string;
  status: MasteryStatus;
  percentage: number;
  lastPracticed?: Date;
  attempts: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: "streak" | "mastery" | "xp" | "social" | "special";
  xpReward: number;
  unlockCondition: string;
  earnedAt?: Date;
  isEarned: boolean;
}

export interface Streak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  freezesAvailable: number;
}

export interface Assignment {
  id: string;
  teacherId: string;
  classId: string;
  title: string;
  description: string;
  subject: string;
  dueDate: string;
  createdAt: string;
  completedBy: string[];
}

export interface Class {
  id: string;
  name: string;
  teacherId: string;
  subject: string;
  gradeLevel: number;
  tier: Tier;
  joinCode: string;
  createdAt: string;
}

export interface ClassMember {
  classId: string;
  userId: string;
  joinedAt: string;
  user?: User;
  masteries?: Mastery[];
}

export interface SubjectConfig {
  name: string;
  emoji: string;
  color: string;
  topics: string[];
}

export interface SkillNode {
  id: string;
  title: string;
  status: MasteryStatus;
  xpRequired: number;
  connections: string[];
  position: { x: number; y: number };
}

export interface ProgressData {
  subject: string;
  mastery: number;
  sessionsCount: number;
  timeSpentMinutes: number;
  lastSession?: Date;
}

export interface DayActivity {
  date: string;
  xpEarned: number;
  sessionsCount: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface HomeschoolChild {
  id: string;
  parentId: string;
  name: string;
  gradeLevel: number;
  tier: Tier;
  xp: number;
  streak: number;
  subjects: string[];
  createdAt: string;
}

export interface CurriculumGoal {
  id: string;
  childId: string;
  subject: string;
  targetMastery: number;
  targetDate: string;
  currentMastery: number;
  milestones: string[];
}

export interface LessonPlan {
  id: string;
  childId: string;
  week: string;
  subjects: {
    subject: string;
    topics: string[];
    estimatedMinutes: number;
    completed: boolean;
  }[];
  parentNotes: string;
}
