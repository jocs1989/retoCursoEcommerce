import { Body, Controller, Post } from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sing-in.dto';
import { SignUpDto } from './dto/sing-up.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly auth: AuthenticationService) {}
  @Post('sing-up')
  singUp(@Body() signUpDto: SignUpDto) {
    return this.auth.signUp(signUpDto);
  }
  @Post('sing-in')
  singIn(@Body() singInDto: SignInDto) {
    return this.auth.signIn(singInDto);
  }
}
