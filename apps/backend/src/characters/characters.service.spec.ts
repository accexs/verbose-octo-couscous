import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { Character } from './entities/character.entity';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { HttpModule, HttpService } from '@nestjs/axios';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

describe('CharactersService', () => {
  let service: CharactersService;
  let model: Model<Character>;
  let httpService: DeepMocked<HttpService>;

  const mockCharacter = {
    _id: '65b8457954c69cce2f135ea3',
    extId: '1',
    __v: 0,
    birthYear: '19BBY',
    extMovieIds: ['1', '2', '3', '6'],
    extPlanetId: '1',
    extStarshipIds: ['12', '22'],
    eyeColor: 'blue',
    gender: 'male',
    hairColor: 'blond',
    height: '172',
    mass: '77',
    movies: [],
    name: 'Luke Skywalker',
    planet: [],
    skinColor: 'fair',
    starships: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [HttpModule],
      providers: [
        CharactersService,
        {
          provide: HttpService,
          useValue: createMock<HttpService>(),
        },
        {
          provide: getModelToken('Character'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockCharacter),
            constructor: jest.fn().mockResolvedValue(mockCharacter),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CharactersService>(CharactersService);
    model = module.get<Model<Character>>(getModelToken('Character'));
    httpService = module.get(HttpService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    const res = await service.fetchAll();
    console.log(res);
  });
});
