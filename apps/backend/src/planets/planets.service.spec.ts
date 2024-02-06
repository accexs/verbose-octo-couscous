import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsService } from './planets.service';
import { DeepMocked } from '@golevelup/ts-jest';
import { HttpService } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Planet } from './entities/planet.entity';

describe('PlanetsService', () => {
  let planetsService: PlanetsService;
  let httpService: DeepMocked<HttpService>;

  const mockPlanetModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetsService,
        {
          provide: HttpService,
          useValue: httpService,
        },
        {
          provide: getModelToken(Planet.name),
          useValue: mockPlanetModel,
        },
      ],
    }).compile();

    planetsService = module.get<PlanetsService>(PlanetsService);
  });

  it('should be defined', () => {
    expect(planetsService).toBeDefined();
  });
});
