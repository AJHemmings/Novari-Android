// Embers service

import { Injectable, NotFoundException } from '@nestjs/common';
import { EmbersRepository } from './repositories/embers.repository';

@Injectable()
export class EmbersService {
  constructor(embersRepository) {
    this.embersRepository = embersRepository;
  }

  /**
   * Get all embers
   * @returns Array of embers
   */
  async getAllEmbers() {
    return this.embersRepository.findAll();
  }

  /**
   * Get ember by ID with task count
   * @param id - Ember ID
   * @returns Ember object
   */
  async getEmberById(id) {
    const ember = await this.embersRepository.findById(id);
    if (!ember) {
      throw new NotFoundException('Ember not found');
    }
    return ember;
  }

  /**
   * Create new ember (admin only)
   * @param data - { title, description, icon }
   * @returns Created ember
   */
  async createEmber(data) {
    return this.embersRepository.create(data);
  }
}
