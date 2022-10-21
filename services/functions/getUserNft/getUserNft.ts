import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

import { NftEntity } from '../../libs';

import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import validator from '@middy/validator';
import httpErrorHandler from '@middy/http-error-handler';
import { BadRequest } from 'http-errors';

import { GetUserNftInput, eventSchema, responseSchema } from './schema';

const lambdaHandler = async (event: GetUserNftInput) => {
  const userId = event.pathParameters.userId;

  try {
    const nft = await NftEntity.query(`USER_ID#${userId}`);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(nft),
    };
  } catch (error) {
    throw new BadRequest();
  }
};

export const handler = middy()
  .use(jsonBodyParser())
  .use(validator({ eventSchema, responseSchema }))
  .use(httpErrorHandler())
  // @ts-expect-error wrong typing
  .handler(lambdaHandler);
