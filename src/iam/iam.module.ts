import { jwtConfig } from 'src/config/jwt.config';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { User } from './authentication/entities/user.entity';
import { AuthGuard } from './authentication/guards/auth/auth.guard';
import { UserRolesGuard } from './authentication/guards/user-roles/user-roles.guard';
import { BcryptService } from './authentication/hashing/bcrypt.service';
import { HashingService } from './authentication/hashing/hashing.service';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    { provide: HashingService, useClass: BcryptService },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UserRolesGuard,
    },
  ],
})
export class IamModule {}
