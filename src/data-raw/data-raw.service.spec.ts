import { Test, TestingModule } from '@nestjs/testing';
import { DataRawService } from './data-raw.service';

describe('DataRawService', () => {
  let service: DataRawService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataRawService],
    }).compile();

    service = module.get<DataRawService>(DataRawService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
