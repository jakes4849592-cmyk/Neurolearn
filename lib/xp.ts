// XP system constants and utilities

export const XP_AWARDS = {
  MESSAGE_SENT: 2,
  CORRECT_ANSWER: 15,
  TOPIC_COMPLETED: 50,
  SUBJECT_MASTERED: 200,
  STREAK_BONUS_DAILY: 10,
  STREAK_BONUS_WEEKLY: 50,
  CHALLENGE_COMPLETED: 30,
  TEST_PASSED: 40,
  PERFECT_TEST: 80,
  HOMEWORK_SCANNED: 5,
  TEACH_SESSION: 25,
  FIRST_SESSION: 20,
  BADGE_EARNED: 50,
} as const;

/**
 * Calculate level from total XP
 * Level = floor(sqrt(xp / 50)) + 1
 */
export function levelFromXP(xp: number): number {
  return Math.floor(Math.sqrt(xp / 50)) + 1;
}

/**
 * Calculate XP required to reach a given level
 * XP = (level - 1)^2 * 50
 */
export function xpForLevel(level: number): number {
  return Math.pow(level - 1, 2) * 50;
}

/**
 * Calculate XP required for the next level
 */
export function xpForNextLevel(level: number): number {
  return xpForLevel(level + 1);
}

/**
 * Calculate progress to next level (0 to 1)
 */
export function progressToNextLevel(xp: number): number {
  const currentLevel = levelFromXP(xp);
  const currentLevelXP = xpForLevel(currentLevel);
  const nextLevelXP = xpForLevel(currentLevel + 1);
  const progress = (xp - currentLevelXP) / (nextLevelXP - currentLevelXP);
  return Math.min(Math.max(progress, 0), 1);
}

/**
 * Get XP needed to reach next level
 */
export function xpNeededForNextLevel(xp: number): number {
  const currentLevel = levelFromXP(xp);
  const nextLevelXP = xpForLevel(currentLevel + 1);
  return Math.max(nextLevelXP - xp, 0);
}

/**
 * Get a title based on level
 */
export function getLevelTitle(level: number): string {
  if (level < 5) return "Curious Learner";
  if (level < 10) return "Knowledge Seeker";
  if (level < 15) return "Dedicated Student";
  if (level < 20) return "Sharp Mind";
  if (level < 30) return "Brain Athlete";
  if (level < 40) return "Scholar";
  if (level < 50) return "Academic";
  if (level < 75) return "Expert";
  if (level < 100) return "Master";
  return "Neuro Legend";
}

/**
 * Format XP number with commas
 */
export function formatXP(xp: number): string {
  return xp.toLocaleString();
}
