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
      PK: getApeNftEntityPK(TEST_NFT.userId),
      SK: getApeNftEntitySK(TEST_NFT.nftId),
    });
  });
});
