// Tasks controller
// Routes:
// GET /api/v1/embers/:emberId/tasks - Get tasks for an ember
// POST /api/v1/tasks/:taskId/complete - Mark task complete

import { Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(tasksService) {
    this.tasksService = tasksService;
  }

  /**
   * Get all tasks for an ember
   * GET /api/v1/embers/:emberId/tasks
   * Response: [ { id, emberId, title, description, isCompleted }, ... ]
   */
  @Get('ember/:emberId')
  async getTasksByEmberId(emberId) {
    return this.tasksService.getTasksByEmberId(parseInt(emberId, 10));
  }

  /**
   * Complete a task
   * POST /api/v1/tasks/:taskId/complete
   * Requires: Authorization header with JWT
   * Response: Updated task
   * Side effects: Records completion event, updates task streak
   */
  @Post(':taskId/complete')
  async completeTask(taskId, req) {
    return this.tasksService.completeTask(parseInt(taskId, 10), req.user.id);
  }
}
