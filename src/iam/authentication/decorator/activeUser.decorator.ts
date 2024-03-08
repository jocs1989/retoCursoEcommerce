import { REQUEST_USER_KEY } from 'src/iam/constant/im.constants';

import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

import { ActiveUserDataInterface } from '../interface/activeUserDate.interface';

export const ActiveUser = createParamDecorator(
  (
    field: keyof ActiveUserDataInterface | undefined,
    context: ExecutionContextHost,
  ) => {
    const request = context.switchToHttp().getRequest();
    const user: ActiveUserDataInterface | undefined = request[REQUEST_USER_KEY];
    console.log(field);
    console.log(user?.[field]);
    return field ? user?.[field] : user;
  },
);
