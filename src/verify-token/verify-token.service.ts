import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VerifyTokenService {
  constructor(private readonly jwtService: JwtService) {}

  verifyAccessToken(token: string) {
    if (!token) throw new UnauthorizedException('No token');

    try {
        const payload = this.jwtService.verify(token);
        return { valid: true, payload, token: token };
    } catch (error) {
        throw new UnauthorizedException(error.message);
    }
  }
}