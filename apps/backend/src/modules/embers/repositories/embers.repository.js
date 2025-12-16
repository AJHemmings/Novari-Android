// In-memory embers repository
// Embers = areas of growth (e.g. "Purpose & Goal Setting")

import { BaseRepository } from '../../../common/repositories/base.repository';

export class EmbersRepository extends BaseRepository {
  constructor() {
    super();
    this.embers = new Map();
    this.nextId = 1;
  }

  /**
   * Find all embers
   * @returns Array of all embers
   */
  async findAll() {
    return Array.from(this.embers.values());
  }

  /**
   * Find ember by ID
   * @param id - Ember ID
   * @returns Ember object or null
   */
  async findById(id) {
    return this.embers.get(id) || null;
  }

  /**
   * Create new ember
   * @param data - { title, description, icon }
   * @returns Created ember
   */
  async create(data) {
    const ember = {
      id: this.nextId++,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.embers.set(ember.id, ember);
    return ember;
  }

  /**
   * Update ember
   * @param id - Ember ID
   * @param data - Fields to update
   * @returns Updated ember or null
   */
  async update(id, data) {
    const ember = this.embers.get(id);
    if (!ember) return null;

    const updated = {
      ...ember,
      ...data,
      updatedAt: new Date(),
    };
    this.embers.set(id, updated);
    return updated;
  }

  /**
   * Delete ember
   * @param id - Ember ID
   * @returns true if deleted
   */
  async delete(id) {
    return this.embers.delete(id);
  }

  /**
   * Clear all embers (used by dev/reset)
   */
  async clear() {
    this.embers.clear();
    this.nextId = 1;
  }
}
