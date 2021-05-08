import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { HotelsController } from './hotels.controller';

@Module({
  imports: [DbModule],
  controllers: [HotelsController]
})
export class HotelsModule {}
