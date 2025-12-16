// JWT authentication guard
// Protects routes that require valid JWT token
// How to use:
// @UseGuards(JwtAuthGuard)
// async protectedRoute() { ... }

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
