import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsService } from './sessions.service';
import { Sessions } from './sessions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sessions])],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class UsersModule {}
