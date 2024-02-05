import { Injectable, Logger } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { Planet, PlanetDocument } from './entities/planet.entity';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  fetchAndPaginate,
  getExternalId,
  getPopulateRelationships,
  getUpsertPayload,
  loggUpsertResult,
  paginate,
} from '../shared/utils';
import { FetchResponsePlanetDto } from './dto/fetch-response-planet.dto';
import { PaginationResponseDto } from '../shared/dto/pagination-response.dto';
import { RelationshipsService } from '../shared/relationships.service';
import { RelationshipsPlanetDto } from './dto/relationships-planet.dto';

@Injectable()
export class PlanetsService extends RelationshipsService {
  private readonly logger = new Logger(PlanetsService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Planet.name)
    private readonly planetModel: Model<Planet>,
  ) {
    super(planetModel);
  }

  async findAll(page = 1, limitValue = 10): Promise<PaginationResponseDto> {
    return paginate(this.planetModel, page, limitValue);
  }

  findOne(id: string): Promise<PlanetDocument | null> {
    return this.planetModel
      .findById(id)
      .populate(getPopulateRelationships(this.planetModel));
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

  getRelationships(planet: Planet): RelationshipsPlanetDto {
    return {
      movies: planet.extMovieIds,
      residents: planet.extResidentsIds,
    };
  }
}
