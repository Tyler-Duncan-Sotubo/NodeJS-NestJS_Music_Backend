import { Test, TestingModule } from '@nestjs/testing';
import { SmartLinksService } from './../smartlinks.service';
import { PrismaService } from '../../prisma/prisma.service';
import { PreSaveDto } from './dummy';

describe(' SmartLinksService', () => {
  let service: SmartLinksService;

  const mockPrisma = {
    preSaveLinks: {
      create: () => Promise.resolve({}),
      findUnique: () => Promise.resolve(''),
      findMany: () => Promise.resolve([]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SmartLinksService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();
    service = module.get<SmartLinksService>(SmartLinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // create smart link
  it('should create smart link', async () => {
    jest
      .spyOn(mockPrisma.preSaveLinks, 'create')
      .mockResolvedValueOnce(PreSaveDto);
    const result = await service.createSmartLink(PreSaveDto);
    expect(result).toEqual(PreSaveDto);
  });

  // get smart link

  it('should get smart link', async () => {
    jest
      .spyOn(mockPrisma.preSaveLinks, 'findUnique')
      .mockResolvedValueOnce('test');
    const result = await service.getSmartLinks('test');
    expect(result).toEqual('test');
  });
});
