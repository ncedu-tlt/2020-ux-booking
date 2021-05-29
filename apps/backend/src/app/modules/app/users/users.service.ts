import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../db/domain/user.dao';
import { Role } from '../../db/domain/role.dao';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne(
      { email: email },
      { relations: ['roles'] }
    );
  }

  async findRoles(email: string): Promise<Role[]> {
    return (await this.findOne(email)).roles;
  }
}
