// Mimic your lambda's environment variables with Config object.
import { Config } from '@serverless-stack/node/config';
process.env.TABLE_NAME = Config.TEST_NO_DOWNSTREAM_TABLE_NAME;

import { describe, expect, it } from 'vitest';
import { getApeNftEntityPK, getApeNftEntitySK, NftEntity } from '../../libs';
import axios from 'axios';

// Real Integration testing lambda handler through API Gateway call

const MOCK_USER_ID = 'fred';

describe('createNft', () => {
  it('should create an nft', async () => {
    const TEST_API_URL = Config.TEST_API_URL;
    // Create a new article
    const res = await axios.post(`${TEST_API_URL}/create`, {
      userId: MOCK_USER_ID,
    });

    const nftId = res.data;

    // List all articles
    const nft = await NftEntity.get({
      PK: getApeNftEntityPK(MOCK_USER_ID),
      SK: getApeNftEntitySK(nftId),
    });

    // Check the newly created article exists
    expect(nft.Item).not.toBeUndefined();

    await NftEntity.delete({
      PK: getApeNftEntityPK(MOCK_USER_ID),
      SK: getApeNftEntitySK(nftId),
    });
  });
});
