import { Config } from '@serverless-stack/node/config';
// Mimic your lambda's environment variables with Config object.
process.env.TABLE_NAME = Config.TEST_NO_DOWNSTREAM_TABLE_NAME;
import { expect, it } from 'vitest';
import { getApeNftEntityPK, getApeNftEntitySK, NftEntity } from '../../libs';
import axios from 'axios';

// Real Integration testing lambda handler through API Gateway call

const USER_ID = 'fred';

it('gets an nft', async () => {
  const TEST_API_URL = Config.TEST_API_URL;
  const mintTimestamp = Date.now().toFixed();

  const TEST_NFT = {
    userId: USER_ID,
    nftId: '1234567890',
    nftRarity: 'common',
    mintTimestamp,
  };
  await NftEntity.put(TEST_NFT);

  const res = await axios.get(`${TEST_API_URL}/${USER_ID}`);

  expect(
    // @ts-expect-error No typing in axios.get
    res.data?.Items?.find((nft) => nft.nftId === '1234567890')
  ).not.toBeUndefined();

  await NftEntity.delete({
    PK: getApeNftEntityPK(USER_ID),
    SK: getApeNftEntitySK(TEST_NFT.nftId),
  });
});
