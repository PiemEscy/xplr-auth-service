import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/model/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({
      email: dto.email,
      password: hashed,
    });

    return this.generateToken(user);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException();

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException();

    return this.generateToken(user);
  }

  setTokenCookie(res: Response, token: string) {
    res.cookie('jwt', token, {
      httpOnly: true, // JS cannot read the cookie
      secure: process.env.NODE_ENV === 'production', // HTTPS only
      sameSite: 'strict', // CSRF protection
      maxAge: 3600000, // 1 hour in ms
    });
  }

  generateToken(user: any): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
