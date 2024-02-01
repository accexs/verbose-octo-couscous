import { Injectable, Logger } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planet, PlanetDocument } from './entities/planet.entity';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  fetchAndPaginate,
  getExternalId,
  getUpsertPayload,
  loggUpsertResult,
} from '../shared/utils';
import { FetchResponsePlanetDto } from './dto/fetch-response-planet.dto';

@Injectable()
export class PlanetsService {
  private readonly logger = new Logger(PlanetsService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Planet.name)
    private readonly planetModel: Model<Planet>,
  ) {}

  create(createPlanetDto: CreatePlanetDto) {
    return 'This action adds a new planet';
  }

  findAll(): Promise<PlanetDocument[]> {
    return this.planetModel.find();
  }

  findOne(id: string): Promise<PlanetDocument | null> {
    return this.planetModel.findById(id);
  }

  update(id: number, updatePlanetDto: UpdatePlanetDto) {
    return `This action updates a #${id} planet`;
  }

  remove(id: number) {
    return `This action removes a #${id} planet`;
  }

  async fetchAll(): Promise<void> {
    const swapiUrl = 'https://swapi.dev/api/planets';
    const planetListGenerator = fetchAndPaginate(swapiUrl, this.httpService);

    for await (const planetList of planetListGenerator) {
      const curatedList = planetList.map(
        (planet: FetchResponsePlanetDto): CreatePlanetDto => {
          return {
            name: planet.name,
            rotationPeriod: planet.rotation_period,
            orbitalPeriod: planet.orbital_period,
            diameter: planet.diameter,
            climate: planet.climate,
            gravity: planet.gravity,
            terrain: planet.terrain,
            surfaceWater: planet.surface_water,
            population: planet.population,
            extId: getExternalId(planet.url),
            extMovieIds: planet.films.map((filmUrl: string) =>
              getExternalId(filmUrl),
            ),
            extResidentsIds: planet.residents.map((residentUrl: string) =>
              getExternalId(residentUrl),
            ),
          };
        },
      );
      this.logger.log(`Inserting [${curatedList.length}] entities`);
      await this.upsert(curatedList);
    }
  }

  async upsert(planetList: Planet[]) {
    const result = await this.planetModel.bulkWrite(
      getUpsertPayload(planetList),
    );
    loggUpsertResult(this.logger, result);
  }
}
