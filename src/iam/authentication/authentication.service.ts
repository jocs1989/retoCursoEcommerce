import { Repository } from 'typeorm';

import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    private readonly jwtService: JwtService,
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

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        password: true,
        roles: true,
        isActive: true,
      },
    });
    if (!user) throw new ConflictException('This user not exist');
    if (!user.isActive) {
      throw new ConflictException('Communicate with administrator');
    }
    const isValid = await this.hashingService.compare(password, user.password);
    if (!isValid) {
      throw new ConflictException('Password and User incorrect');
    }

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    delete user.password;

    const payload = { sub: user.id, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
