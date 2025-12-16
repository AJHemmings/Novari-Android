// Auth module
// Bundles all auth functionality: service, controller, strategy
// How to add a new authentication method:
// 1. Create a new strategy file (e.g. oauth.strategy.js)
// 2. Implement PassportStrategy
// 3. Add to imports below

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PassportModule, JwtModule, UsersModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
