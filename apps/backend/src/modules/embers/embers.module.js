// Embers module

import { Module } from '@nestjs/common';
import { EmbersService } from './embers.service';
import { EmbersController } from './embers.controller';
import { EmbersRepository } from './repositories/embers.repository';

@Module({
  providers: [
    EmbersService,
    {
      provide: 'EmbersRepository',
      useClass: EmbersRepository,
    },
  ],
  controllers: [EmbersController],
  exports: ['EmbersRepository'],
})
export class EmbersModule {}
