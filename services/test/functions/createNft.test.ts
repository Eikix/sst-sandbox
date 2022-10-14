import { expect, it } from 'vitest';

import { Config } from '@serverless-stack/node/config';

import { NftEntity } from '../../libs';
import axios from 'axios';

it('create an nft', async () => {
  const userId = 'fred';

  const API_URL = Config.API_URL;
  // Create a new article
  const res = await axios.post(`${API_URL}/create`);

  const nftId = res.data;

  // List all articles
  const nft = await NftEntity.query(`USER_ID#${userId}`);

  // Check the newly created article exists
  console.log(nft);
  expect(nft?.Items?.find((nft) => nft?.nftId === nftId)).not.toBeUndefined();
});
