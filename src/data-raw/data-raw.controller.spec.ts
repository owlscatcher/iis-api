import { Test, TestingModule } from '@nestjs/testing';
import { DataRawController } from './data-raw.controller';
import { DataRawService } from './data-raw.service';

describe('DataRawController', () => {
  let controller: DataRawController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataRawController],
      providers: [DataRawService],
    }).compile();

    controller = module.get<DataRawController>(DataRawController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
