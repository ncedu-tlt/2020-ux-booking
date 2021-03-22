import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { MessagesController } from './messages.controller';

@Module({
  imports: [DbModule],
  controllers: [MessagesController]
})
export class MessagesModule {}
