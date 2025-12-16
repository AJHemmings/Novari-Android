// Streaks service
// Handles streak calculation and updates
//
// STREAK LOGIC:
// Login Streak:
//   - Increments when user logs in on a new day
//   - Resets if user misses a day
// Task Streak:
//   - A day counts if user completes at least 1 task that day
//   - Increments when user completes first task of new day
//   - Resets if user misses a day
//   - Lifetime count increments every task completion

import { Injectable, NotFoundException } from '@nestjs/common';
import { StreaksRepository } from './repositories/streaks.repository';

@Injectable()
export class StreaksService {
  constructor(streaksRepository) {
    this.streaksRepository = streaksRepository;
  }

  /**
   * Get streak summary for user
   * GET /api/v1/streaks/summary
   * @param userId - User ID
   * @returns { loginStreak, taskStreak, lifetimeCompletedTasks }
   */
  async getStreakSummary(userId) {
    let streak = await this.streaksRepository.findByUserId(userId);
    if (!streak) {
      // Create if doesn't exist
      streak = await this.streaksRepository.initializeForUser(userId);
    }

    return {
      loginStreak: {
        current: streak.loginStreakCurrent,
        best: streak.loginStreakBest,
        lastLoginAt: streak.lastLoginAt,
      },
      taskStreak: {
        current: streak.taskStreakCurrent,
        best: streak.taskStreakBest,
        lastTaskCompletedAt: streak.lastTaskCompletedAt,
      },
      lifetimeCompletedTasks: streak.lifetimeCompletedTasks,
    };
  }

  /**
   * Record user login
   * Called when user logs in via auth/login
   * POST /api/v1/streaks/login-ping
   * @param userId - User ID
   * @returns Updated streak
   */
  async recordLogin(userId) {
    let streak = await this.streaksRepository.findByUserId(userId);
    if (!streak) {
      streak = await this.streaksRepository.initializeForUser(userId);
    }

    const now = new Date();
    const isNewDay = this.isNewDay(streak.lastLoginAt, now);

    // Check if streak should reset (missed a day)
    const streakBroken = this.didStreakBreak(streak.lastLoginAt);

    let newLoginStreakCurrent = streak.loginStreakCurrent;
    if (isNewDay) {
      newLoginStreakCurrent = streakBroken ? 1 : streak.loginStreakCurrent + 1;
    }

    const newLoginStreakBest = Math.max(
      streak.loginStreakBest,
      newLoginStreakCurrent
    );

    return this.streaksRepository.update(userId, {
      loginStreakCurrent: newLoginStreakCurrent,
      loginStreakBest: newLoginStreakBest,
      lastLoginAt: now,
    });
  }

  /**
   * Record task completion
   * Called when user completes a task
   * @param userId - User ID
   * @returns Updated streak
   */
  async recordTaskCompletion(userId) {
    let streak = await this.streaksRepository.findByUserId(userId);
    if (!streak) {
      streak = await this.streaksRepository.initializeForUser(userId);
    }

    const now = new Date();
    const isNewDay = this.isNewDay(streak.lastTaskCompletedAt, now);

    // Check if streak should reset (missed a day)
    const streakBroken = this.didStreakBreak(streak.lastTaskCompletedAt);

    let newTaskStreakCurrent = streak.taskStreakCurrent;
    if (isNewDay) {
      newTaskStreakCurrent = streakBroken ? 1 : streak.taskStreakCurrent + 1;
    }

    const newTaskStreakBest = Math.max(
      streak.taskStreakBest,
      newTaskStreakCurrent
    );

    return this.streaksRepository.update(userId, {
      taskStreakCurrent: newTaskStreakCurrent,
      taskStreakBest: newTaskStreakBest,
      lastTaskCompletedAt: now,
      lifetimeCompletedTasks: streak.lifetimeCompletedTasks + 1,
    });
  }

  /**
   * Check if date is a new day (different calendar day from lastDate)
   * @param lastDate - Previous date
   * @param newDate - Current date
   * @returns true if different days
   */
  isNewDay(lastDate, newDate) {
    if (!lastDate) return true;

    const last = new Date(lastDate);
    const current = new Date(newDate);

    return (
      last.getFullYear() !== current.getFullYear() ||
      last.getMonth() !== current.getMonth() ||
      last.getDate() !== current.getDate()
    );
  }

  /**
   * Check if streak is broken (missed more than 1 day)
   * @param lastDate - Last completion date
   * @returns true if streak should reset
   */
  didStreakBreak(lastDate) {
    if (!lastDate) return false;

    const last = new Date(lastDate);
    const now = new Date();

    // Calculate days between
    const diffTime = Math.abs(now - last);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Streak broken if more than 1 day passed
    return diffDays > 1;
  }
}
