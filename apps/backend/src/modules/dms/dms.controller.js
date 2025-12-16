// DMs controller (placeholder for future)

import { Controller, Get } from '@nestjs/common';

@Controller('dms')
export class DmsController {
  /**
   * Get all DMs (placeholder)
   * GET /api/v1/dms
   * @returns Empty array (for now)
   */
  @Get()
  async getAllDms() {
    return { message: 'DMs feature coming soon' };
  }
}
