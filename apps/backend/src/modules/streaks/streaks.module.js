// Streaks module

import { Module } from '@nestjs/common';
import { StreaksService } from './streaks.service';
import { StreaksController } from './streaks.controller';
import { StreaksRepository } from './repositories/streaks.repository';

@Module({
  providers: [
    StreaksService,
    {
      provide: 'StreaksRepository',
      useClass: StreaksRepository,
    },
  ],
  controllers: [StreaksController],
  exports: ['StreaksRepository', StreaksService],
})
export class StreaksModule {}
