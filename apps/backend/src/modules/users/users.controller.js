// Users controller
// Routes:
// GET /api/v1/users/me - Get current user profile
// PATCH /api/v1/users/me - Update current user profile

import { Controller, Get, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  /**
   * Get current user profile
   * GET /api/v1/users/me
   * Requires: Authorization header with JWT
   * Response: { id, email, firstName, lastName, bio, ... }
   */
  @Get('me')
  async getProfile(req) {
    return this.usersService.getUserProfile(req.user.id);
  }

  /**
   * Update current user profile
   * PATCH /api/v1/users/me
   * Requires: Authorization header with JWT
   * Body: { firstName, lastName, bio, ... }
   * Response: Updated user
   */
  @Patch('me')
  async updateProfile(req, data) {
    // TODO: Add validation DTO
    return this.usersService.updateProfile(req.user.id, data);
  }
}
