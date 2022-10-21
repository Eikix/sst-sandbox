import { ulid } from 'ulid';
import { NftEntity } from '../../libs';
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import validator from '@middy/validator';
import httpErrorHandler from '@middy/http-error-handler';
import { CreateNftInput, responseSchema, eventSchema } from './schema';
import { BadRequest } from 'http-errors';

const RARITIES = ['common', 'rare', 'unique', 'legendary'];

const lambdaHandler = async (event: CreateNftInput) => {
  const { userId } = event.body;
  const nftId = ulid();
  const nft = {
    userId,
    nftId,
    nftRarity: RARITIES[Math.floor(Math.random() * RARITIES.length)],
    mintTimestamp: Date.now().toString(),
  };

  try {
    await NftEntity.put(nft);
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
