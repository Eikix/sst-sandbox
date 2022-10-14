import { Config } from '@serverless-stack/node/config';
import { expect, it } from 'vitest';
import { NftEntity } from '../../libs';
import axios from 'axios';

const USER_ID = 'fred';

it('gets an nft', async () => {
  const API_URL = Config.API_URL;
  const mintTimestamp = Date.now().toFixed();

  const testNft = {
    userId: USER_ID,
    nftId: '123456789',
    nftRarity: 'common',
    mintTimestamp,
  };
  await NftEntity.put(testNft);

  const res = await axios.get(`${API_URL}/${USER_ID}`);

  expect(
    res.data?.Items?.find((nft) => nft.nftId === '123456789')
  ).not.toBeUndefined();
});
