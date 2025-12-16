// Users module

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';

@Module({
  providers: [
    UsersService,
    {
      provide: 'UsersRepository',
      useClass: UsersRepository,
    },
  ],
  controllers: [UsersController],
  exports: ['UsersRepository'],
})
export class UsersModule {}
