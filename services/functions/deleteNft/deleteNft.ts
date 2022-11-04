import { ulid } from 'ulid';
import { getApeNftEntityPK, getApeNftEntitySK, NftEntity } from '../../libs';
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import validator from '@middy/validator';
import httpErrorHandler from '@middy/http-error-handler';
import { DeleteNftInput, responseSchema, eventSchema } from './schema';
import { BadRequest } from 'http-errors';

export const lambdaHandler = async (event: DeleteNftInput) => {
  const { userId, nftId } = event.body;

  try {
    await NftEntity.delete({
      PK: getApeNftEntityPK(userId),
      SK: getApeNftEntitySK(nftId),
    });
  } catch (err) {
    throw new BadRequest();
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: nftId,
  };
};

export const handler = middy()
  .use(jsonBodyParser())
  .use(validator({ eventSchema, responseSchema }))
  .use(httpErrorHandler())
  .handler(lambdaHandler);
