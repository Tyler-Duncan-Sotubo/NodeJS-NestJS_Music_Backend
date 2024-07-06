import { Test, TestingModule } from '@nestjs/testing';
import { LabelService } from '../label.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('LabelService', () => {
  let service: LabelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LabelService,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<LabelService>(LabelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
