// Base repository interface
// All data repositories must implement this interface
// This allows swapping in-memory repos with database-backed ones later
//
// How to add a repository for a new entity:
// 1. Create a new interface extending BaseRepository<YourEntity>
// 2. Implement it in-memory (extend this class)
// 3. Later: Create database implementation using same interface
// 4. Swap via NestJS dependency injection in your module

export class BaseRepository {
  /**
   * Find all entities
   * @returns Promise<Entity[]>
   */
  async findAll() {
    throw new Error('findAll() must be implemented');
  }

  /**
   * Find entity by ID
   * @param id - Entity ID
   * @returns Promise<Entity | null>
   */
  async findById(id) {
    throw new Error('findById() must be implemented');
  }

  /**
   * Create new entity
   * @param data - Entity data
   * @returns Promise<Entity>
   */
  async create(data) {
    throw new Error('create() must be implemented');
  }

  /**
   * Update existing entity
   * @param id - Entity ID
   * @param data - Update data
   * @returns Promise<Entity | null>
   */
  async update(id, data) {
    throw new Error('update() must be implemented');
  }

  /**
   * Delete entity
   * @param id - Entity ID
   * @returns Promise<boolean>
   */
  async delete(id) {
    throw new Error('delete() must be implemented');
  }
}
