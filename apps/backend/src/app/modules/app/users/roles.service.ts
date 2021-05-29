import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from '../../db/domain/role.dao';
import { SystemDefinedRole } from '../auth/role.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>
  ) {}

  async findOne(name: string): Promise<Role | undefined> {
    return this.rolesRepository.findOne(
      { name: name },
      { relations: ['users'] }
    );
  }

  async findOneOrDefault(name: string, role: SystemDefinedRole): Promise<Role> {
    return (await this.findOne(name)) || this.createDefRole(role);
  }

  createDefRole(role: SystemDefinedRole): Role {
    const newRole = new Role();
    newRole.name = SystemDefinedRole[role];
    return newRole;
  }
}
