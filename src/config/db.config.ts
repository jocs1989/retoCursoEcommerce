import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export const configBD = registerAs('database', () => {
  const logger = new Logger('NODE_ENV');

  if (process.env.NODE_ENV === 'testing') {
    //testing
    logger.log('Mode testing...');
    return {
      host: process.env.POSTGRES_HOST_TEST,
      port: parseInt(process.env.POSTGRES_PORT_PC_TEST, 10),
      user: process.env.POSTGRES_USER_TEST,
      password: process.env.POSTGRES_PASSWORD_TEST,
      nameDb: process.env.POSTGRES_DB_TEST,
    };
  }
  if (process.env.NODE_ENV === 'production') {
    //production
    logger.log('Mode production...');
    return {
      host: process.env.POSTGRES_HOST_PROD,
      port: parseInt(process.env.POSTGRES_PORT_PC_PROD, 10),
      user: process.env.POSTGRES_USER_PROD,
      password: process.env.POSTGRES_PASSWORD_PROD,
      nameDb: process.env.POSTGRES_DB_PROD,
    };
  } else {
    logger.log('Mode development...');
    return {
      //development

      host: process.env.POSTGRES_HOST_DEV,
      port: parseInt(process.env.POSTGRES_PORT_PC_DEV, 10),
      user: process.env.POSTGRES_USER_DEV,
      password: process.env.POSTGRES_PASSWORD_DEV,
      nameDb: process.env.POSTGRES_DB_DEV,
    };
  }
});
