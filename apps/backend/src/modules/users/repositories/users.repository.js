// In-memory users repository
// Stores all users in memory (loses data on restart)
// For production: swap with database implementation
// How to switch to database:
// 1. Create postgres-users.repository.js implementing same interface
// 2. Update users.module.js to provide new implementation
// 3. All code using UsersRepository continues to work unchanged

import { BaseRepository } from '../../../common/repositories/base.repository';

export class UsersRepository extends BaseRepository {
  // In-memory storage
  constructor() {
    super();
    this.users = new Map(); // id -> user
    this.nextId = 1;
  }

  /**
   * Find all users
   * @returns Array of all users
   */
  async findAll() {
    return Array.from(this.users.values());
  }

  /**
   * Find user by ID
   * @param id - User ID
   * @returns User object or null
   */
  async findById(id) {
    return this.users.get(id) || null;
  }

  /**
   * Find user by email
   * @param email - User email
   * @returns User object or null
   */
  async findByEmail(email) {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  /**
   * Create new user
   * @param data - { email, password, role }
   * @returns Created user with id
   */
  async create(data) {
    const user = {
      id: this.nextId++,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  /**
   * Update user
   * @param id - User ID
   * @param data - Fields to update
   * @returns Updated user or null if not found
   */
  async update(id, data) {
    const user = this.users.get(id);
    if (!user) return null;

    const updated = {
      ...user,
      ...data,
      updatedAt: new Date(),
    };
    this.users.set(id, updated);
    return updated;
  }

  /**
   * Delete user
   * @param id - User ID
   * @returns true if deleted, false if not found
   */
  async delete(id) {
    return this.users.delete(id);
  }

  /**
   * Clear all users (used by dev/reset)
   */
  async clear() {
    this.users.clear();
    this.nextId = 1;
  }
}
