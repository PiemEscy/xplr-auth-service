import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Users } from './model/users/users.entity';
import { Sessions } from './model/sessions/sessions.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './model/users/users.module';
import { ApiKeyMiddleware } from './middleware/api-key/api-key.middleware';
import { VerifyTokenController } from './verify-token/verify-token.controller';
import { VerifyTokenModule } from './verify-token/verify-token.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USER,
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME,
      entities: [Users, Sessions],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    VerifyTokenModule,
  ],
  controllers: [],
})

// export class AppModule  {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('/auth/register');
  }
}
