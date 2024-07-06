import { Test, TestingModule } from '@nestjs/testing';
import { MusicService } from './../music.service';
import { AwsService } from '../../aws/aws.service';
import { PrismaService } from '../../prisma/prisma.service';
import { MusicReleaseService } from '../../mail/musicRelease.service';
import { NotificationService } from '../../mail/notification.service';
import { ConfigService } from '@nestjs/config';
import { AudioReleaseDto, VideoReleaseDto, user, userReleases } from './dummy';

describe('MusicService', () => {
  let service: MusicService;

  const MockPrisma = {
    audios: {
      create: () => Promise.resolve({}),
      findMany: () => Promise.resolve([]),
    },
    videos: {
      create: () => Promise.resolve({}),
      findMany: () => Promise.resolve([]),
    },
  };
  // const mockAwsService = {
  //   uploadImageToS3: jest.fn(),
  // };
  const mockMusicReleaseService = {
    sendMusicReleaseEmail: jest.fn(),
  };
  const mockNotificationService = {
    sendMusicReleaseEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MusicService,
        AwsService,
        ConfigService,
        {
          provide: PrismaService,
          useValue: MockPrisma,
        },
        {
          provide: MusicReleaseService,
          useValue: mockMusicReleaseService,
        },
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
      ],
    }).compile();
    service = module.get<MusicService>(MusicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Create Audio Release
  // it('should create an audio release', async () => {
  //   jest
  //     .spyOn(MockPrisma.audios, 'create')
  //     .mockResolvedValueOnce(AudioReleaseDto);
  //   jest.spyOn(mockAwsService, 'uploadImageToS3').mockResolvedValueOnce({});
  //   const result = await service.createAudioRelease(AudioReleaseDto);

  //   expect(result).toEqual('Audio Release Created');
  // });

  // Create Video Release
  it('should create a video release', async () => {
    jest
      .spyOn(MockPrisma.videos, 'create')
      .mockResolvedValueOnce(VideoReleaseDto);
    const result = await service.createVideoRelease(user, VideoReleaseDto);
    expect(result).toEqual('Video Release Created');
  });

  // Get Releases
  it('should get releases', async () => {
    jest
      .spyOn(MockPrisma.audios, 'findMany')
      .mockResolvedValueOnce([{ AudioReleaseDto: AudioReleaseDto }]);
    jest
      .spyOn(MockPrisma.videos, 'findMany')
      .mockResolvedValueOnce([{ VideoReleaseDto: VideoReleaseDto }]);
    const result = await service.getReleases(user);
    expect(result).toEqual(userReleases);
  });

  // Get Latest Releases
  it('should get latest releases', async () => {
    jest.spyOn(MockPrisma.audios, 'findMany').mockResolvedValueOnce([]);
    const result = await service.getLatestReleases();
    expect(result).toEqual([]);
  });
});
