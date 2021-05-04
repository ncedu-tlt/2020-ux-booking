import { SetMetadata } from '@nestjs/common';
import { SystemDefinedRole } from '../role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: SystemDefinedRole[]) =>
  SetMetadata(ROLES_KEY, roles);
