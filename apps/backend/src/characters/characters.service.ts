import { Injectable, Logger } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Character, CharacterDocument } from './entities/character.entity';
import { Model } from 'mongoose';
import {
  getExternalId,
  getUpsertPayload,
  loggUpsertResult,
} from '../shared/utils';
import { FetchResponseCharacterDto } from './dto/fetch-response-character.dto';

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

  async fetchAll(): Promise<Character[]> {
    const { data } = await firstValueFrom(
      this.httpService.get('https://swapi.dev/api/people'),
    );
    this.logger.log(`Inserting [${data.results.length}] entities`);
    const characterList = data.results.map(
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
    await this.upsert(characterList);
    return characterList;
  }

  async upsert(characterList: Character[]) {
    const result = await this.characterModel.bulkWrite(
      getUpsertPayload(characterList),
    );
    loggUpsertResult(this.logger, result);
  }
}
