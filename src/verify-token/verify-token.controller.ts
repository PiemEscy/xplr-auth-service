import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { VerifyTokenService } from './verify-token.service';
import type { Request } from 'express';

@Controller('verify-token')
export class VerifyTokenController {
  constructor(private readonly verifyTokenService: VerifyTokenService) {}

  @Get()
  async verify(@Req() req: Request) {
    const token = req.cookies['jwt'];
    return this.verifyTokenService.verifyAccessToken(token);
  }
}