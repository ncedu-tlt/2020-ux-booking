import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Role } from '../../db/domain/role.dao';
import { DefRole } from '../auth/role.enum';

@Injectable()
export class RolesService {
  async findOne(name: string): Promise<Role | undefined> {
    return getRepository(Role).findOne(
      { name: name },
      { relations: ['users'] }
    );
  }

  async findOneOrDefault(name: string, role: DefRole): Promise<Role> {
    return (await this.findOne(name)) || this.createDefRole(role);
  }

  createDefRole(role: DefRole): Role {
    const newRole = new Role();
    newRole.name = DefRole[role];
    return newRole;
  }
}
