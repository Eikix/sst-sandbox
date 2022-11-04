import { NftEntity } from '../../libs';
import { expect, it, vi } from 'vitest';

import { lambdaHandler } from './deleteNft';

// @ts-expect-error broken type inference on dynamodb-toolbox entity
const spyDeleteNft = vi.spyOn(NftEntity, 'delete').mockResolvedValue();

const USER_ID = 'fred';
const NFT_ID = '01GH1PRSYPMHF2SSS3E0EJWH4X';

const MOCK_EVENT = {
  version: '2.0',
  routeKey: 'DELETE /delete',
  rawPath: '/delete',
  rawQueryString: '',
  headers: {
    accept: '*/*',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-GB,en;q=0.9,fr;q=0.8,en-US;q=0.7',
    'content-length': '56',
    'content-type': 'application/json',
    host: '94uz95334j.execute-api.us-east-1.amazonaws.com',
    origin: 'https://console.sst.dev',
    referer: 'https://console.sst.dev/',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'sec-gpc': '1',
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
    'x-amzn-trace-id': 'Root=1-6365372b-40397d22070bd15c476fa879',
    'x-forwarded-for': '46.193.107.8',
    'x-forwarded-port': '443',
    'x-forwarded-proto': 'https',
  },
  requestContext: {
    accountId: '984751533405',
    apiId: '94uz95334j',
    domainName: '94uz95334j.execute-api.us-east-1.amazonaws.com',
    domainPrefix: '94uz95334j',
    http: {
      method: 'DELETE',
      path: '/delete',
      protocol: 'HTTP/1.1',
      sourceIp: '46.193.107.8',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
    },
    requestId: 'bFWOyjbrIAMEJdQ=',
    routeKey: 'DELETE /delete',
    stage: '$default',
    time: '04/Nov/2022:16:00:43 +0000',
    timeEpoch: 1667577643200,
  },
  body: { userId: USER_ID, nftId: NFT_ID },
  isBase64Encoded: false,
  rawBody: `{"userId": "${USER_ID}", "nftId":"${NFT_ID}"}`,
};

it('should delete an nft', async () => {
  const res = await lambdaHandler(MOCK_EVENT);
  expect(res.body).toBe(NFT_ID);
  expect(spyDeleteNft).toBeCalledWith({
    PK: 'USER_ID#fred',
    SK: 'NFT_ID#01GH1PRSYPMHF2SSS3E0EJWH4X',
  });
});
