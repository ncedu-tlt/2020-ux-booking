import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { User } from '../../db/domain/user.dao';
import { Role } from '../../db/domain/role.dao';

@Injectable()
export class UsersService {
  async findOne(email: string): Promise<User | undefined> {
    return getRepository(User).findOne(
      { email: email },
      { relations: ['roles'] }
    );
  }

  async findRoles(email: string): Promise<Role[]> {
    return (await this.findOne(email)).roles;
  }
}
