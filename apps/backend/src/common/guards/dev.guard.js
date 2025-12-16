// Dev-only guard - restricts access to development endpoints
// Used to protect seed/reset endpoints
// How to use:
// @UseGuards(DevGuard)
// @Post('dev/seed')
// async seed() { ... }

import { Injectable, ForbiddenException } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class DevGuard implements CanActivate {
  canActivate(context) {
    // Only allow in development mode
    if (process.env.NODE_ENV !== 'development') {
      throw new ForbiddenException(
        'Dev endpoints only available in development mode'
      );
    }

    // Check x-dev-key header
    const request = context.switchToHttp().getRequest();
    const devKey = request.headers['x-dev-key'];
    const expectedKey = process.env.DEV_SEED_KEY || 'dev-seed-key-123';

    if (devKey !== expectedKey) {
      throw new ForbiddenException('Invalid dev key');
    }

    return true;
  }
}
