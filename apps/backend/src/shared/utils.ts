import { StarWarsBase } from './entities/starWarsBase.entity';
import { Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { FetchResponseGeneric } from './dto/fetch-response-base.dto';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { PaginationResponseDto } from './dto/pagination-response.dto';
import { Starship } from '../starships/entities/starship.entity';
import { Character } from '../characters/entities/character.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Movie } from '../movies/entities/movie.entity';

const getUpsertPayload = (entityList: StarWarsBase[]) => {
  return entityList.map((entity: StarWarsBase) => {
    return {
      updateOne: {
        filter: { extId: entity.extId },
        update: entity,
        upsert: true,
      },
    };
  });
};

const getExternalId = (externalUrl: string): string => {
  const extId = externalUrl.split('/').filter(Boolean).pop();
  if (!extId) throw new Error('Cant parse external id');
  return extId;
};

type BulkWriteResultType = {
  upsertedIds: { [key: string]: any };
  insertedIds: { [key: string]: any };
};

const loggUpsertResult = (logger: Logger, result: BulkWriteResultType) => {
  if (result.insertedIds.length === 0 && result.upsertedIds.length === 0) {
    logger.log('No upserted or inserted ids');
    return;
  }
  logger.log('---------------------');
  logger.log('--- Upsert result ---');
  logger.log('Upserted Ids', result.upsertedIds);
  logger.log('Inserted Ids', result.insertedIds);
};

async function* fetchAndPaginate(
  initialUrl: string,
  httpService: HttpService,
): AsyncGenerator<any[], void, unknown> {
  let hasNext = true;
  let url = initialUrl;
  while (hasNext) {
    const { data } = await firstValueFrom(httpService.get(url));

    const swapiData = data as FetchResponseGeneric;

    url = swapiData.next;
    if (!swapiData.next) hasNext = false;
    yield swapiData.results;
  }
}

const paginate = async (
  model: Model<StarWarsBase>,
  page: number = 1,
  limitValue: number,
  shouldPopulate: boolean = true,
): Promise<PaginationResponseDto> => {
  const query = model.find().sort({ _id: 1 });
  const totalEntities = await model.countDocuments();
  const totalPages = Math.ceil(totalEntities / limitValue);
  const currentPage = Math.min(page, totalPages);
  if (limitValue) query.limit(limitValue);
  if (shouldPopulate) query.populate(getPopulateRelationships(model));
  query.skip((currentPage - 1) * limitValue);
  return {
    total: totalEntities,
    perPage: limitValue,
    currentPage: currentPage,
    totalPages: totalPages,
    data: await query,
  };
};

const getPopulateRelationships = (model: Model<StarWarsBase>): string[] => {
  switch (model.modelName) {
    case Character.name:
      return ['planet', 'movies', 'starships'];

    case Starship.name:
      return ['pilots', 'movies'];

    case Planet.name:
      return ['residents', 'movies'];

    case Movie.name:
      return ['characters', 'planets', 'starships'];

    default:
      return [];
  }
};

export {
  getUpsertPayload,
  getExternalId,
  loggUpsertResult,
  fetchAndPaginate,
  paginate,
  getPopulateRelationships,
};
