import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthenticationService } from './authentication.service';
import { Public } from './decorator/public.decorator';
import { SignInDto } from './dto/sing-in.dto';
import { SignUpDto } from './dto/sing-up.dto';
import { User } from './entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly auth: AuthenticationService) {}
  @Public()
  @Post('sing-up')
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({
    type: SignUpDto,
    description: 'Data for new user',
  })
  @ApiCreatedResponse({
    description: 'User created',
    type: User,
  })
  @ApiResponse({
    status: 409,
    description: 'This user exist',
  })
  singUp(@Body() signUpDto: SignUpDto) {
    return this.auth.signUp(signUpDto);
  }
  @Public()
  @Post('sing-in')
  @ApiOperation({ summary: 'Sing In user' })
  @ApiBody({
    type: SignUpDto,
    description: 'Start sing in user',
  })
  @ApiCreatedResponse({
    description: 'Session start',
    type: String,
  })
  @ApiResponse({
    status: 409,
    description: 'This user exist',
  })
  @ApiResponse({
    status: 409,
    description: 'Communicate with administrator',
  })
  @ApiResponse({
    status: 409,
    description: 'Password and User incorrect',
  })
  singIn(@Body() singInDto: SignInDto) {
    return this.auth.signIn(singInDto);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
