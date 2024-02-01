import { Injectable, Logger } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Starship, StarshipDocument } from './entities/starship.entity';
import { Model } from 'mongoose';
import {
  fetchAndPaginate,
  getExternalId,
  getUpsertPayload,
  loggUpsertResult,
} from '../shared/utils';
import { FetchResponseStarshipDto } from './dto/fetch-response-starship.dto';

@Injectable()
export class StarshipsService {
  private readonly logger = new Logger(StarshipsService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Starship.name) private readonly starshipModel: Model<Starship>,
  ) {}

  create(createStarshipDto: CreateStarshipDto) {
    return 'This action adds a new starship';
  }

  findAll(): Promise<StarshipDocument[]> {
    return this.starshipModel.find();
  }

  findOne(id: string): Promise<StarshipDocument | null> {
    return this.starshipModel.findById(id);
  }

  update(id: number, updateStarshipDto: UpdateStarshipDto) {
    return `This action updates a #${id} starship`;
  }

  remove(id: number) {
    return `This action removes a #${id} starship`;
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
}
