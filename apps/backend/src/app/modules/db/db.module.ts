import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageDao } from './domain/message.dao';

@Module({
  imports: [TypeOrmModule.forFeature([MessageDao])],
  exports: [TypeOrmModule]
})
export class DbModule {}
