import { Test, TestingModule } from '@nestjs/testing';
import { StreamsController } from '../streams.controller';
import { StreamsService } from '../streams.service';
import { PostStreamDto, user } from './dummyData';

describe('StreamsController', () => {
  let controller: StreamsController;

  const mockStreamsService = {
    createStream: jest.fn(() => {
      return PostStreamDto;
    }),
    getAllStreams: jest.fn(() => {
      return [];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreamsController],
      providers: [
        {
          provide: StreamsService,
          useValue: mockStreamsService,
        },
      ],
    }).compile();
    controller = module.get<StreamsController>(StreamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Create a test for the createStream method
  it('should call createStream method of StreamsService', async () => {
    await expect(controller.createStream(PostStreamDto)).resolves.toEqual(
      PostStreamDto,
    );
    expect(mockStreamsService.createStream).toHaveBeenCalledWith(PostStreamDto);
  });

  // Create a test for the getAllStreams method
  it('should call getAllStreams method of StreamsService', async () => {
    await expect(controller.getAllStreams(user)).resolves.toEqual([]);
    expect(mockStreamsService.getAllStreams).toHaveBeenCalledWith(user);
  });
});
