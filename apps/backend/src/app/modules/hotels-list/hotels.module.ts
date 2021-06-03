import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';

@Module({
  imports: [DbModule],
  controllers: [HotelsController],
  providers: [HotelsService]
})
export class HotelsModule {}
