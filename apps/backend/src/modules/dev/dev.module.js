// Dev module
// Provides seed and reset endpoints for development

import { Module } from '@nestjs/common';
import { DevService } from './dev.service';
import { DevController } from './dev.controller';
import { UsersModule } from '../users/users.module';
import { EmbersModule } from '../embers/embers.module';
import { TasksModule } from '../tasks/tasks.module';
import { StreaksModule } from '../streaks/streaks.module';

@Module({
  imports: [UsersModule, EmbersModule, TasksModule, StreaksModule],
  providers: [DevService],
  controllers: [DevController],
})
export class DevModule {}
