// In-memory task completion events repository
// Records when tasks are completed (used for streak calculation)

export class TaskCompletionEventsRepository {
  constructor() {
    this.events = new Map();
    this.nextId = 1;
  }

  /**
   * Record task completion
   * @param data - { userId, taskId, emberId, completedAt }
   * @returns Created event
   */
  async create(data) {
    const event = {
      id: this.nextId++,
      ...data,
      createdAt: new Date(),
    };
    this.events.set(event.id, event);
    return event;
  }

  /**
   * Find all completions for a user
   * @param userId - User ID
   * @returns Array of completion events
   */
  async findByUserId(userId) {
    const userEvents = [];
    for (const event of this.events.values()) {
      if (event.userId === userId) {
        userEvents.push(event);
      }
    }
    return userEvents;
  }

  /**
   * Find completions for user on a specific date
   * @param userId - User ID
   * @param date - Date to check
   * @returns Array of completions that day
   */
  async findByUserIdAndDate(userId, date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const dayEvents = [];
    for (const event of this.events.values()) {
      if (
        event.userId === userId &&
        event.completedAt >= startOfDay &&
        event.completedAt <= endOfDay
      ) {
        dayEvents.push(event);
      }
    }
    return dayEvents;
  }

  /**
   * Clear all events (used by dev/reset)
   */
  async clear() {
    this.events.clear();
    this.nextId = 1;
  }
}
