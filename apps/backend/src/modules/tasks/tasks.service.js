// Tasks service
// Handles task operations and completion logic

import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './repositories/tasks.repository';

@Injectable()
export class TasksService {
  constructor(tasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  /**
   * Get all tasks for an ember
   * @param emberId - Ember ID
   * @returns Array of tasks for that ember
   */
  async getTasksByEmberId(emberId) {
    return this.tasksRepository.findByEmberId(emberId);
  }

  /**
   * Get task by ID
   * @param id - Task ID
   * @returns Task object
   */
  async getTaskById(id) {
    const task = await this.tasksRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  /**
   * Create new task (admin only)
   * @param data - { emberId, title, description }
   * @returns Created task
   */
  async createTask(data) {
    return this.tasksRepository.create(data);
  }

  /**
   * Mark task as complete
   * Called from tasks/:id/complete endpoint
   * This also triggers streak update
   * @param taskId - Task ID to complete
   * @param userId - User completing the task
   * @returns Updated task
   */
  async completeTask(taskId, userId) {
    const task = await this.getTaskById(taskId);
    if (task.isCompleted) {
      return task; // Already completed
    }

    const updated = await this.tasksRepository.update(taskId, {
      isCompleted: true,
      completedAt: new Date(),
    });

    // TODO: Call streaksService.recordTaskCompletion(userId, taskId)

    return updated;
  }
}
