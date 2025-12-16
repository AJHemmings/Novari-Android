// Auth controller - handles auth endpoints
// Routes:
// POST /api/v1/auth/register - Create new account
// POST /api/v1/auth/login - Login with email/password
// POST /api/v1/auth/refresh - Get new access token
// POST /api/v1/auth/logout - Logout (client-side: delete tokens)
// POST /api/v1/auth/google - Google OAuth (placeholder)

import { Controller, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  /**
   * Register new user
   * POST /api/v1/auth/register
   * Body: { email, password, confirmPassword }
   * Response: { accessToken, refreshToken, user }
   */
  @Post('register')
  async register(body) {
    // TODO: Add validation DTO
    // - email must be valid email format
    // - password minimum 8 chars, uppercase, number, symbol
    // - password === confirmPassword
    const { email, password } = body;
    return this.authService.register(email, password);
  }

  /**
   * Login user
   * POST /api/v1/auth/login
   * Body: { email, password }
   * Response: { accessToken, refreshToken, user }
   */
  @Post('login')
  @HttpCode(200)
  async login(body) {
    // TODO: Add validation DTO
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  /**
   * Refresh access token
   * POST /api/v1/auth/refresh
   * Body: { refreshToken }
   * Response: { accessToken, refreshToken }
   */
  @Post('refresh')
  @HttpCode(200)
  async refresh(body) {
    return this.authService.refresh(body.refreshToken);
  }

  /**
   * Logout (mostly client-side: delete tokens)
   * POST /api/v1/auth/logout
   * Response: { message }
   */
  @Post('logout')
  @HttpCode(200)
  async logout() {
    // In future: could invalidate refresh token in blacklist
    return { message: 'Logged out successfully' };
  }

  /**
   * Google OAuth (placeholder)
   * POST /api/v1/auth/google
   * Body: { googleToken }
   * Response: { accessToken, refreshToken, user }
   */
  @Post('google')
  @HttpCode(200)
  async googleAuth(body) {
    // TODO: Implement Google OAuth
    // 1. Verify google token with Google API
    // 2. Extract email from google profile
    // 3. Find or create user
    // 4. Return tokens
    throw new Error('Google OAuth not yet implemented');
  }
}
