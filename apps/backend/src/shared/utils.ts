import { StarWarsBase } from './entities/starWarsBase.entity';
import { Logger } from '@nestjs/common';

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
  logger.log('--- Upsert result ---');
  logger.log('Upserted Ids', result.upsertedIds);
  logger.log('Inserted Ids', result.insertedIds);
  logger.log('---------------------');
};

export { getUpsertPayload, getExternalId, loggUpsertResult };
