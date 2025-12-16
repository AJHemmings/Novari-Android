// Streaks controller
// Routes:
// POST /api/v1/streaks/login-ping - Record login
// GET /api/v1/streaks/summary - Get streak summary

import { Controller, Get, Post } from '@nestjs/common';
import { StreaksService } from './streaks.service';

@Controller('streaks')
export class StreaksController {
  constructor(streaksService) {
    this.streaksService = streaksService;
  }

  /**
   * Get streak summary for current user
   * GET /api/v1/streaks/summary
   * Requires: Authorization header with JWT
   * Response: {
   *   loginStreak: { current, best, lastLoginAt },
   *   taskStreak: { current, best, lastTaskCompletedAt },
   *   lifetimeCompletedTasks: number
   * }
   */
  @Get('summary')
  async getStreakSummary(req) {
    return this.streaksService.getStreakSummary(req.user.id);
  }

  /**
   * Record login (called on every login)
   * POST /api/v1/streaks/login-ping
   * Requires: Authorization header with JWT
   * Response: Updated streak object
   */
  @Post('login-ping')
  async recordLogin(req) {
    return this.streaksService.recordLogin(req.user.id);
  }
}
