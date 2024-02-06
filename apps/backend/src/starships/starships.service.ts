import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Starship, StarshipDocument } from './entities/starship.entity';
import { isValidObjectId, Model } from 'mongoose';
import {
  fetchAndPaginate,
  getExternalId,
  getPopulateRelationships,
  getUpsertPayload,
  loggUpsertResult,
  paginate,
} from '../shared/utils';
import { FetchResponseStarshipDto } from './dto/fetch-response-starship.dto';
import { PaginationResponseDto } from '../shared/dto/pagination-response.dto';
import { RelationshipsService } from '../shared/relationships.service';
import { RelationshipsStarshipDto } from './dto/relationships-starship.dto';

@Injectable()
export class StarshipsService extends RelationshipsService {
  private readonly logger = new Logger(StarshipsService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Starship.name) private readonly starshipModel: Model<Starship>,
  ) {
    super(starshipModel);
  }

  async findAll(page = 1, limitValue = 10): Promise<PaginationResponseDto> {
    return paginate(this.starshipModel, page, limitValue);
  }

  async findOne(id: string): Promise<StarshipDocument | null> {
    if (!isValidObjectId(id)) throw new NotFoundException();
    return this.starshipModel
      .findById(id)
      .populate(getPopulateRelationships(this.starshipModel));
  }

  async fetchAll(): Promise<void> {
    const swapiUrl = 'https://swapi.dev/api/starships';
    const starshipListGenerator = fetchAndPaginate(swapiUrl, this.httpService);

    for await (const starshipList of starshipListGenerator) {
      const curatedList = starshipList.map(
        (starship: FetchResponseStarshipDto): CreateStarshipDto => {
          return {
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.cost_in_credits,
            length: starship.length,
            maxAtmospheringSpeed: starship.max_atmosphering_speed,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargo_capacity,
            consumables: starship.consumables,
            hyperdriveRating: starship.hyperdrive_rating,
            mglt: starship.MGLT,
            starshipClass: starship.starship_class,
            extId: getExternalId(starship.url),
            extPilotIds: starship.pilots.map((pilotUrl: string) =>
              getExternalId(pilotUrl),
            ),
            extMovieIds: starship.films.map((filmUrl: string) =>
              getExternalId(filmUrl),
            ),
          };
        },
      );
      this.logger.log(`Inserting [${curatedList.length}] entities`);
      await this.upsert(curatedList);
    }
  }

  async upsert(starshipList: Starship[]) {
    const result = await this.starshipModel.bulkWrite(
      getUpsertPayload(starshipList),
    );
    loggUpsertResult(this.logger, result);
  }

  getRelationships(starship: Starship): RelationshipsStarshipDto {
    return { movies: starship.extMovieIds, pilots: starship.extPilotIds };
  }
}
