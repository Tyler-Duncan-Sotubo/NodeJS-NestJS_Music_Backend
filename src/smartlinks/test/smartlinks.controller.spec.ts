import { Test, TestingModule } from '@nestjs/testing';
import { SmartlinksController } from './../smartlinks.controller';
import { SmartLinksService } from './../smartlinks.service';
import { PrismaService } from '../../prisma/prisma.service';
import { PreSaveDto } from './dummy';

describe('SmartlinksController', () => {
  let controller: SmartlinksController;

  const mockSmartLinksService = {
    createSmartLink: jest.fn(),
    getSmartLinks: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmartlinksController],
      providers: [
        {
          provide: SmartLinksService,
          useValue: mockSmartLinksService,
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();
    controller = module.get<SmartlinksController>(SmartlinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call createSmartLink', async () => {
    await controller.createSmartLink(PreSaveDto);
    expect(mockSmartLinksService.createSmartLink).toHaveBeenCalledWith(
      PreSaveDto,
    );
  });

  it('should call getSmartLinks', async () => {
    await controller.getSmartLinks('test');
    expect(mockSmartLinksService.getSmartLinks).toHaveBeenCalledWith('test');
  });
});
