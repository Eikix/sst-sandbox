import { Config } from '@serverless-stack/node/config';
// Mimic your lambda's environment variables with Config object.
process.env.TABLE_NAME = Config.TEST_TABLE_NAME;

import { describe, it } from 'vitest';

import { getApeNftEntityPK, getApeNftEntitySK, NftEntity } from '../../libs';

const mintTimestamp = Date.now().toFixed();

const TEST_NFT = {
  userId: 'Fred',
  nftId: '123456789',
  nftRarity: 'common',
  mintTimestamp,
};

describe('forwardNft', () => {
  it('should forward create nft', async () => {
    await NftEntity.put(TEST_NFT);
    await NftEntity.delete({
      PK: getApeNftEntityPK('Fred'),
      SK: getApeNftEntitySK('123456789'),
    });
  });
});
