// DMs module (placeholder for future)
// This module will handle direct messaging later

import { Module } from '@nestjs/common';
import { DmsController } from './dms.controller';

@Module({
  controllers: [DmsController],
})
export class DmsModule {}
