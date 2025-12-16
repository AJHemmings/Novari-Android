// Communities controller (placeholder for future)

import { Controller, Get } from '@nestjs/common';

@Controller('communities')
export class CommunitiesController {
  /**
   * Get all communities (placeholder)
   * GET /api/v1/communities
   * @returns Empty array (for now)
   */
  @Get()
  async getAllCommunities() {
    return { message: 'Communities feature coming soon' };
  }
}
