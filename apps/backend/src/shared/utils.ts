import { StarWarsBase } from './entities/starWarsBase.entity';
import { Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { FetchResponseGeneric } from './dto/fetch-response-base.dto';
import { HttpService } from '@nestjs/axios';

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

export { getUpsertPayload, getExternalId, loggUpsertResult, fetchAndPaginate };
