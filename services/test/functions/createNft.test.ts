import { describe, expect, it } from 'vitest';

import { Config } from '@serverless-stack/node/config';

import { getApeNftEntityPK, getApeNftEntitySK, NftEntity } from '../../libs';
import axios from 'axios';

import { BadRequest } from 'http-errors';

const MOCK_USER_ID = 'fred';

describe('createNft', () => {
  it('should create an nft', async () => {
    const API_URL = Config.API_URL;
    // Create a new article
    const res = await axios.post(`${API_URL}/create`, {
      userId: MOCK_USER_ID,
    });

    const nftId = res.data;

    // List all articles
    const nft = await NftEntity.query(`USER_ID#${MOCK_USER_ID}`);

    // Check the newly created article exists
    expect(nft?.Items?.find((nft) => nft?.nftId === nftId)).not.toBeUndefined();

    await NftEntity.delete({
      PK: getApeNftEntityPK(MOCK_USER_ID),
      SK: getApeNftEntitySK(nftId),
    });
  });
});
