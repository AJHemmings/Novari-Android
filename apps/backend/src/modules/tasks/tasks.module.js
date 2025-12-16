// Tasks module

import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './repositories/tasks.repository';
import { TaskCompletionEventsRepository } from './repositories/task-completion-events.repository';

@Module({
  providers: [
    TasksService,
    {
      provide: 'TasksRepository',
      useClass: TasksRepository,
    },
    {
      provide: 'TaskCompletionEventsRepository',
      useClass: TaskCompletionEventsRepository,
    },
  ],
  controllers: [TasksController],
  exports: ['TasksRepository', 'TaskCompletionEventsRepository'],
})
export class TasksModule {}
