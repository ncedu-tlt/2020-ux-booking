import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { HotelsConversionService } from './hotels-conversion.service.';

@Module({
  imports: [DbModule],
  controllers: [HotelsController],
  providers: [HotelsService, HotelsConversionService]
})
export class HotelsModule {}
