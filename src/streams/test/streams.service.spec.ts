import { Test, TestingModule } from '@nestjs/testing';
import { StreamsService } from '../streams.service';
import { PrismaService } from '../../prisma/prisma.service';
import { PostStreamDto, user } from './dummyData';

describe(' StreamsService', () => {
  let service: StreamsService;

  const mockPrisma = {
    streams: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
    audios: {
      findUnique: jest.fn(),
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StreamsService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();
    service = module.get<StreamsService>(StreamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Create a test for the createStream method
  it('should call createStream method of StreamsService', async () => {
    jest.spyOn(mockPrisma.streams, 'create').mockResolvedValue(PostStreamDto);
    jest.spyOn(mockPrisma.user, 'findUnique').mockResolvedValue({ id: 1 });
    jest.spyOn(mockPrisma.audios, 'findUnique').mockResolvedValue({ id: 1 });
    const result = await service.createStream(PostStreamDto);
    expect(result).toEqual(PostStreamDto);
  });

  // Create a test for the getAllStreams method
  it('should call getAllStreams method of StreamsService', async () => {
    jest.spyOn(mockPrisma.streams, 'findMany').mockResolvedValue([]);
    const result = await service.getAllStreams(user);
    expect(result).toEqual([]);
  });
});
