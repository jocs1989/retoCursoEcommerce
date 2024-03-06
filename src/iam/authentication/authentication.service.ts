import { Repository } from 'typeorm';

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { SignInDto } from './dto/sing-in.dto';
import { SignUpDto } from './dto/sing-up.dto';
import { User } from './entities/user.entity';
import { HashingService } from './hashing/hashing.service';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}
  async signUp(signUpDto: SignUpDto) {
    try {
      const hash = await this.hashingService.hash(signUpDto.password);
      const newUser = this.userRepository.create({
        ...signUpDto,
        password: hash,
      });
      return await this.userRepository.save(newUser);
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException('This user exist');
      }
    }
  }

  signIn(signInDto: SignInDto) {
    return signInDto;
  }
}
