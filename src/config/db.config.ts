import { registerAs } from '@nestjs/config';

export const configBD = registerAs('database', () => {
  if (process.env.NODE_ENV === 'testing') {
    return {
      host: process.env.POSTGRES_HOST_TESTING,
      port: parseInt(process.env.POSTGRES_PORT_PC_TESTING, 10),
      user: process.env.POSTGRES_USER_TESTING,
      password: process.env.POSTGRES_PASSWORD_TESTING,
      nameDb: process.env.POSTGRES_DB_TESTING,
    };
  } else {
    return {
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT_PC, 10),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      nameDb: process.env.POSTGRES_DB,
    };
  }
});
