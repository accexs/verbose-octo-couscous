import { Test, TestingModule } from '@nestjs/testing';
import { FetchStarWarsEntitiesService } from './fetch-star-wars-entities.service';

describe('FetchStarWarsEntitiesService', () => {
  let service: FetchStarWarsEntitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchStarWarsEntitiesService],
    }).compile();

    service = module.get<FetchStarWarsEntitiesService>(
      FetchStarWarsEntitiesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
