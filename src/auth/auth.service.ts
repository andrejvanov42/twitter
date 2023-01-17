import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { MailService } from 'src/mail/mail.service';
import { randomBytes } from 'crypto';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly redisService: RedisService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return {
      accessToken: await this.generateToken(user),
      refreshTolen: await this.generateRefreshToken(user),
    };
  }
  //достаем инфу о юзере и запихиваем ее в редис, после проверки кода с почты, мы регаем юзера с этой инфой и генерим токен
  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException('Пользователь c таким email существует', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const emailCode = randomBytes(60).toString('hex');
    await this.mailService.sendVerificationCode('nikita.kolachyov@innowise-group.com', emailCode);
    await this.redisService.get('code', emailCode);
    return {
      accessToken: await this.generateToken(user),
      refreshTolen: await this.generateRefreshToken(user),
    };
  }

  async verificationCode(code: string) {}

  private async generateToken(user: UserEntity) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async generateRefreshToken(user: UserEntity) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return {
      token: this.jwtService.sign(payload, { expiresIn: '15d' }),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEqual = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEqual) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректная почта или пароль',
    });
  }
}
