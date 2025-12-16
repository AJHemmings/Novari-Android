// In-memory streaks repository
// Tracks login streaks and task completion streaks per user

export class StreaksRepository {
  constructor() {
    // streaks[userId] = {
    //   loginStreakCurrent: 1,
    //   loginStreakBest: 5,
    //   lastLoginAt: Date,
    //   taskStreakCurrent: 2,
    //   taskStreakBest: 10,
    //   lastTaskCompletedAt: Date,
    //   lifetimeCompletedTasks: 15,
    // }
    this.streaks = new Map();
  }

  /**
   * Find streak for user
   * @param userId - User ID
   * @returns Streak object or null
   */
  async findByUserId(userId) {
    return this.streaks.get(userId) || null;
  }

  /**
   * Initialize streak for new user
   * @param userId - User ID
   * @returns Created streak object
   */
  async initializeForUser(userId) {
    const streak = {
      userId,
      loginStreakCurrent: 0,
      loginStreakBest: 0,
      lastLoginAt: null,
      taskStreakCurrent: 0,
      taskStreakBest: 0,
      lastTaskCompletedAt: null,
      lifetimeCompletedTasks: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.streaks.set(userId, streak);
    return streak;
  }

  /**
   * Update streak record
   * @param userId - User ID
   * @param data - Fields to update
   * @returns Updated streak
   */
  async update(userId, data) {
    const streak = this.streaks.get(userId);
    if (!streak) {
      return this.initializeForUser(userId);
    }

    const updated = {
      ...streak,
      ...data,
      updatedAt: new Date(),
    };
    this.streaks.set(userId, updated);
    return updated;
  }

  /**
   * Clear all streaks (used by dev/reset)
   */
  async clear() {
    this.streaks.clear();
  }
}
