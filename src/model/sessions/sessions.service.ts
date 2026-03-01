import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sessions } from './sessions.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Sessions)
    private repo: Repository<Sessions>,
  ) {}

  create(data: Partial<Sessions>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }
}
