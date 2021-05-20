import { Role } from '../../db/domain/role.dao';

export interface JwtTokenPayload {
  username: string;
  sub: string;
  roles: Role[];
  iat: number;
  exp: number;
}
