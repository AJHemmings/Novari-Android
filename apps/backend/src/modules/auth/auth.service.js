// Auth service - handles login, registration, token refresh
// Uses bcrypt for password hashing
// Uses JWT for tokens (access + refresh pattern)
//
// How this works:
// 1. User registers with email/password
// 2. Password is hashed with bcrypt
// 3. User receives access token (short-lived) + refresh token
// 4. Access token sent in Authorization header
// 5. If access token expires, use refresh token to get new one

import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(usersRepository, jwtService) {
    this.usersRepository = usersRepository;
    this.jwtService = jwtService;
  }

  /**
   * Register new user
   * @param email - User email
   * @param password - Plain text password (will be hashed)
   * @returns { accessToken, refreshToken, user }
   */
  async register(email, password) {
    // Check if user already exists
    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in repository
    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
      role: 'user', // Default role
    });

    // Generate tokens
    const tokens = this.generateTokens(user.id, user.email);

    return {
      ...tokens,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }

  /**
   * Login user with email and password
   * @param email - User email
   * @param password - Plain text password
   * @returns { accessToken, refreshToken, user }
   */
  async login(email, password) {
    // Find user by email
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Record login streak
    // TODO: Call streaksService.recordLogin(user.id)

    // Generate tokens
    const tokens = this.generateTokens(user.id, user.email);

    return {
      ...tokens,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }

  /**
   * Refresh access token using refresh token
   * @param refreshToken - Valid refresh token
   * @returns { accessToken, refreshToken }
   */
  async refresh(refreshToken) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret',
      });

      const user = await this.usersRepository.findById(decoded.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.generateTokens(user.id, user.email);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /**
   * Generate access and refresh tokens
   * @param userId - User ID
   * @param email - User email
   * @returns { accessToken, refreshToken }
   */
  generateTokens(userId, email) {
    const accessToken = this.jwtService.sign(
      { email, sub: userId },
      { expiresIn: '24h' }
    );

    const refreshToken = this.jwtService.sign(
      { email, sub: userId },
      {
        secret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret',
        expiresIn: '7d',
      }
    );

    return { accessToken, refreshToken };
  }

  /**
   * Validate JWT token and return payload
   * Used by JWT strategy
   * @param payload - JWT payload { sub, email }
   * @returns User object for request context
   */
  async validateToken(payload) {
    const user = await this.usersRepository.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
