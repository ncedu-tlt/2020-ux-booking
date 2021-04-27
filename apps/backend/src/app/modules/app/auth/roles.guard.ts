import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './decorators/role.decorator';
import { UsersService } from '../users/users.service';
import { DefRole } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<DefRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const roles = await this.usersService.findRoles(user.username);
    const defRolArr = [DefRole.user];
    if (roles) {
      roles.forEach(value => {
        const v: DefRole = DefRole[value.name];
        defRolArr.push(v);
      });
    }
    return requiredRoles.some(role => defRolArr?.includes(role));
  }
}
