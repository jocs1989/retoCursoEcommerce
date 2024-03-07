import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  global: true,
  signOptions: { expiresIn: '60s' },
}));
