import { SetMetadata } from '@nestjs/common';
import { DefRole } from '../role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: DefRole[]) => SetMetadata(ROLES_KEY, roles);
