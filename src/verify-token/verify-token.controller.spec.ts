import { Test, TestingModule } from '@nestjs/testing';
import { VerifyTokenController } from './verify-token.controller';

describe('VerifyTokenController', () => {
  let controller: VerifyTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerifyTokenController],
    }).compile();

    controller = module.get<VerifyTokenController>(VerifyTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
