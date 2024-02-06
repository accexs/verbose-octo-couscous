import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsService } from './starships.service';
import { DeepMocked } from '@golevelup/ts-jest';
import { HttpService } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Starship } from './entities/starship.entity';

describe('StarshipsService', () => {
  let starshipsService: StarshipsService;
  let httpService: DeepMocked<HttpService>;

  const mockStarshipModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StarshipsService,
        {
          provide: HttpService,
          useValue: httpService,
        },
        {
          provide: getModelToken(Starship.name),
          useValue: mockStarshipModel,
        },
      ],
    }).compile();

    starshipsService = module.get<StarshipsService>(StarshipsService);
  });

  it('should be defined', () => {
    expect(starshipsService).toBeDefined();
  });
});
