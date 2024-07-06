import { Test, TestingModule } from '@nestjs/testing';
import { MusicController } from './../music.controller';
import { MusicService } from './../music.service';
import { AudioReleaseDto, VideoReleaseDto, user, userReleases } from './dummy';

describe('MyService', () => {
  let controller: MusicController;

  const mockMusicService = {
    createAudioRelease: jest.fn(),
    createVideoRelease: jest.fn(),
    getReleases: jest.fn(() => {
      return userReleases;
    }),
    getLatestReleases: jest.fn(() => {
      return [];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicController],
      providers: [{ provide: MusicService, useValue: mockMusicService }],
    }).compile();

    controller = module.get<MusicController>(MusicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //Create Audio Release
  it('should create an audio release', async () => {
    controller.createAudioRelease(AudioReleaseDto);
    expect(mockMusicService.createAudioRelease).toHaveBeenCalledWith(
      AudioReleaseDto,
    );
  });

  //Create Video Release
  it('should create a video release', async () => {
    controller.createVideoRelease(user, VideoReleaseDto);
    expect(mockMusicService.createVideoRelease).toHaveBeenCalledWith(
      user,
      VideoReleaseDto,
    );
  });

  //Get Music Releases
  it('should get music releases', async () => {
    await expect(controller.getMusicReleases(user)).resolves.toEqual(
      userReleases,
    );
    expect(mockMusicService.getReleases).toHaveBeenCalledWith(user);
  });

  //Get Latest Releases
  it('should get latest releases', async () => {
    await expect(controller.getLatestReleases()).resolves.toEqual([]);
    expect(mockMusicService.getLatestReleases).toHaveBeenCalled();
  });
});
