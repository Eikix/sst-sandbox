import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

import { NftEntity } from '../libs';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const userId = event.pathParameters?.userId;

  const nft = await NftEntity.query(`USER_ID#${userId}`);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(nft),
  };
};
