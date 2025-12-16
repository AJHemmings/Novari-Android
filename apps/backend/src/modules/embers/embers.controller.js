// Embers controller
// Routes:
// GET /api/v1/embers - Get all embers
// GET /api/v1/embers/:id - Get single ember

import { Controller, Get } from '@nestjs/common';
import { EmbersService } from './embers.service';

@Controller('embers')
export class EmbersController {
  constructor(embersService) {
    this.embersService = embersService;
  }

  /**
   * Get all embers
   * GET /api/v1/embers
   * Response: [ { id, title, description, icon }, ... ]
   */
  @Get()
  async getAllEmbers() {
    return this.embersService.getAllEmbers();
  }

  /**
   * Get single ember by ID
   * GET /api/v1/embers/:id
   * Response: { id, title, description, icon }
   */
  @Get(':id')
  async getEmberById(id) {
    return this.embersService.getEmberById(parseInt(id, 10));
  }
}
