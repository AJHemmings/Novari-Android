// Communities module (placeholder for future)
// This module will handle community features later

import { Module } from '@nestjs/common';
import { CommunitiesController } from './communities.controller';

@Module({
  controllers: [CommunitiesController],
})
export class CommunitiesModule {}
