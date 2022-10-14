import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { ulid } from 'ulid';
import { NftEntity } from '../libs';

// Only one user for now
const USERS = ['Fred'] as const;

const RARITIES = ['common', 'rare', 'unique', 'legendary'];

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // const body: { userId: typeof USERS[number] } = JSON.parse(event.body ?? '');
  const nftId = ulid();
  const userId = USERS[Math.floor(Math.random() * USERS.length)].toLowerCase();
  const nft = {
    userId,
    nftId,
    nftRarity: RARITIES[Math.floor(Math.random() * RARITIES.length)],
    mintTimestamp: Date.now().toString(),
  };
  try {
    await NftEntity.put(nft);
  } catch (err) {
    if (typeof err === 'string') console.error(err);
    console.log(err);
    throw new Error('Create NFT: Server Error');
  }
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: nftId,
  };
};
