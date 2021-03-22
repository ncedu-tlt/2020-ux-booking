import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDao } from '../db/domain/message.dao';
import { Repository } from 'typeorm';
import { Message } from '@booking/models/message.model';

@Controller('/messages')
export class MessagesController {
  constructor(
    @InjectRepository(MessageDao)
    private messagesRepository: Repository<MessageDao>
  ) {}

  @Get()
  async getMessages(): Promise<Message[]> {
    const messages = await this.messagesRepository.find();
    return messages.map(m => ({
      id: m.id,
      payload: m.text
    }));
  }

  @Post()
  async addMessage(@Body() body: { message: string }): Promise<Message> {
    const message = await this.messagesRepository.save({
      text: body.message
    });

    return {
      id: message.id,
      payload: message.text
    };
  }
}
