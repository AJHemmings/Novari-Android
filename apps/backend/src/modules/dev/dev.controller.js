// Dev controller
// Handles seed and reset endpoints
// PROTECTED: Only accessible in development mode with valid x-dev-key header

import { Controller, Post, HttpCode } from '@nestjs/common';
import { DevService } from './dev.service';

@Controller('dev')
export class DevController {
  constructor(devService) {
    this.devService = devService;
  }

  /**
   * Seed database with demo data
   * POST /api/v1/dev/seed
   * Required Header: x-dev-key: dev-seed-key-123 (or value of DEV_SEED_KEY)
   * Only available when NODE_ENV === 'development'
   * Response: { message, counts, demoUser }
   *
   * To call from command line:
   * curl -X POST http://localhost:3000/api/v1/dev/seed \
   *   -H "x-dev-key: dev-seed-key-123"
   */
  @Post('seed')
  @HttpCode(200)
  async seed() {
    return this.devService.seed();
  }

  /**
   * Reset database - clear all data
   * POST /api/v1/dev/reset
   * Required Header: x-dev-key: dev-seed-key-123
   * Only available when NODE_ENV === 'development'
   * Response: { message, counts }
   *
   * To call from command line:
   * curl -X POST http://localhost:3000/api/v1/dev/reset \
   *   -H "x-dev-key: dev-seed-key-123"
   */
  @Post('reset')
  @HttpCode(200)
  async reset() {
    return this.devService.reset();
  }
}
