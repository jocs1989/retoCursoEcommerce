import { SetMetadata } from '@nestjs/common';

import { RoleType } from '../enums/roles-type.enums';

export const ROLES_TYPE_KEY = 'rolesType';

export const Roles = (...rolesType: RoleType[]) =>
  SetMetadata(ROLES_TYPE_KEY, rolesType);
