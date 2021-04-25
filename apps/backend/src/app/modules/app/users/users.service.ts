import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { User } from '../../db/domain/user.dao';

@Injectable()
export class UsersService {
  async findOne(email: string): Promise<User | undefined> {
    return getRepository(User).findOne({ email: email });
  }
}
