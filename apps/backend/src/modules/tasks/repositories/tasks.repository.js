// In-memory tasks repository
// Tasks belong to an Ember (emberId)

import { BaseRepository } from '../../../common/repositories/base.repository';

export class TasksRepository extends BaseRepository {
  constructor() {
    super();
    this.tasks = new Map();
    this.nextId = 1;
  }

  /**
   * Find all tasks
   * @returns Array of all tasks
   */
  async findAll() {
    return Array.from(this.tasks.values());
  }

  /**
   * Find task by ID
   * @param id - Task ID
   * @returns Task object or null
   */
  async findById(id) {
    return this.tasks.get(id) || null;
  }

  /**
   * Find all tasks for an ember
   * @param emberId - Ember ID
   * @returns Array of tasks for that ember
   */
  async findByEmberId(emberId) {
    const tasks = [];
    for (const task of this.tasks.values()) {
      if (task.emberId === emberId) {
        tasks.push(task);
      }
    }
    return tasks;
  }

  /**
   * Create new task
   * @param data - { emberId, title, description, isCompleted }
   * @returns Created task
   */
  async create(data) {
    const task = {
      id: this.nextId++,
      ...data,
      isCompleted: false,
      completedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasks.set(task.id, task);
    return task;
  }

  /**
   * Update task
   * @param id - Task ID
   * @param data - Fields to update
   * @returns Updated task or null
   */
  async update(id, data) {
    const task = this.tasks.get(id);
    if (!task) return null;

    const updated = {
      ...task,
      ...data,
      updatedAt: new Date(),
    };
    this.tasks.set(id, updated);
    return updated;
  }

  /**
   * Delete task
   * @param id - Task ID
   * @returns true if deleted
   */
  async delete(id) {
    return this.tasks.delete(id);
  }

  /**
   * Clear all tasks (used by dev/reset)
   */
  async clear() {
    this.tasks.clear();
    this.nextId = 1;
  }
}
