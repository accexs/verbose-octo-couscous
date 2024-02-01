import { Injectable, Logger } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Character, CharacterDocument } from './entities/character.entity';
import { Model } from 'mongoose';
import {
  fetchAndPaginate,
  getExternalId,
  getUpsertPayload,
  loggUpsertResult,
} from '../shared/utils';
import { FetchResponseCharacterDto } from './dto/fetch-response-character.dto';
import { FetchResponseGeneric } from '../shared/dto/fetch-response-base.dto';

@Injectable()
export class CharactersService {
  private readonly logger = new Logger(CharactersService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Character.name)
    private readonly characterModel: Model<Character>,
  ) {}

  create(createCharacterDto: CreateCharacterDto) {
    return 'This action adds a new character';
  }

  findAll(): Promise<CharacterDocument[]> {
    return this.characterModel.find();
  }

  findOne(id: string): Promise<CharacterDocument | null> {
    return this.characterModel.findById(id);
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }

  async fetchAll(): Promise<void> {
    const swapiUrl = 'https://swapi.dev/api/people';
    const characterListGenerator = fetchAndPaginate(swapiUrl, this.httpService);

    for await (const characterList of characterListGenerator) {
      const curatedList = characterList.map(
        (character: FetchResponseCharacterDto): CreateCharacterDto => {
          return {
            name: character.name,
            height: character.height,
            mass: character.mass,
            hairColor: character.hair_color,
            skinColor: character.skin_color,
            eyeColor: character.eye_color,
            birthYear: character.birth_year,
            gender: character.gender,
            extId: getExternalId(character.url),
            extPlanetId: getExternalId(character.homeworld),
            extStarshipIds: character.starships.map((starshipUrl: string) =>
              getExternalId(starshipUrl),
            ),
            extMovieIds: character.films.map((filmUrl: string) =>
              getExternalId(filmUrl),
            ),
          };
        },
      );
      this.logger.log(`Inserting [${curatedList.length}] entities`);
      await this.upsert(curatedList);
    }
  }

  async upsert(characterList: Character[]) {
    const result = await this.characterModel.bulkWrite(
      getUpsertPayload(characterList),
    );
    loggUpsertResult(this.logger, result);
  }
}
