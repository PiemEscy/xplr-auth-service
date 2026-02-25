import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { VerifyTokenService } from './verify-token.service';
import { VerifyTokenController } from './verify-token.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: parseInt(configService.get<string>('JWT_EXPIRES') || '86400') },
      }),
    }),
  ],
  controllers: [VerifyTokenController],
  providers: [VerifyTokenService],
})
export class VerifyTokenModule {}