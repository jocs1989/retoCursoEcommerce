import { REQUEST_USER_KEY } from 'src/iam/constant/im.constants';

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ActiveUser } from '../../decorator/activeUser.decorator';
import { ROLES_TYPE_KEY } from '../../decorator/roles.decorator';
import { RoleType } from '../../enums/roles-type.enums';
import { ActiveUserDataInterface } from '../../interface/activeUserDate.interface';

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<RoleType[]>(ROLES_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(roles?.length);
    if (!roles?.length) {
      console.log('Sin roles');
      return true;
    }
    console.log('tiene roles');
    // Siempre que exist el token
    const user: ActiveUserDataInterface = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];
    console.log('sss');
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log(user.roles?.length);
    console.log(user.roles?.includes('role'));
    return roles.some((role) => user.roles?.includes(role));
  }
}
