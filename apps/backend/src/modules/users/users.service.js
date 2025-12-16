// Users service - handles user data operations
// Gets/updates user profile

import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  /**
   * Get user profile by ID
   * @param userId - User ID
   * @returns User data (without password)
   */
  async getUserProfile(userId) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Update user profile
   * @param userId - User ID
   * @param data - Fields to update { firstName, lastName, bio, etc }
   * @returns Updated user (without password)
   */
  async updateProfile(userId, data) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Prevent updating sensitive fields
    delete data.password;
    delete data.role;
    delete data.email;

    const updated = await this.usersRepository.update(userId, data);
    const { password, ...userWithoutPassword } = updated;
    return userWithoutPassword;
  }
}
