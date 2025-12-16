// JWT Strategy for Passport
// Extracts and validates JWT from Authorization header
// How it works:
// 1. Client sends: Authorization: Bearer <token>
// 2. Passport extracts token
// 3. Strategy validates with JWT secret
// 4. If valid, calls validate() and attaches user to request.user

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'dev-secret-key-change-in-production',
    });
  }

  /**
   * Validate JWT payload
   * This is called when token is valid
   * @param payload - Decoded JWT { sub: userId, email }
   * @returns User object (attached to request.user)
   */
  async validate(payload) {
    return this.authService.validateToken(payload);
  }
}
