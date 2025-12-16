// Health controller
// Provides simple health check endpoint

import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  /**
   * Health check
   * GET /api/v1/health
   * @returns { status: 'ok' }
   */
  @Get()
  healthCheck() {
    return { status: 'ok', timestamp: new Date() };
  }
}
