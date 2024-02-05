import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { Character } from './entities/character.entity';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { DeepMocked } from '@golevelup/ts-jest';

describe('CharactersService', () => {
  let charactersService: CharactersService;
  let characterModel: Model<Character>;
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

  const mockCharacterService = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharactersService,
        {
          provide: HttpService,
          useValue: httpService,
        },
        {
          provide: getModelToken('Character'),
          useValue: mockCharacterService,
        },
      ],
    }).compile();

    charactersService = module.get<CharactersService>(CharactersService);
    characterModel = module.get<Model<Character>>(
      getModelToken(Character.name),
    );
    httpService = module.get(HttpService);
  });

  it('should be defined', async () => {
    expect(charactersService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a character', async () => {
      jest.spyOn(characterModel, 'findById').mockImplementation(
        () =>
          ({
            populate: jest.fn().mockResolvedValue(mockCharacter),
          }) as any,
      );

      const result = await charactersService.findOne(mockCharacter._id);

      expect(characterModel.findById).toHaveBeenCalledWith(mockCharacter._id);
      expect(result).toEqual(mockCharacter);
    });
  });
  //end tests
});
