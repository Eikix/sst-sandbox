import axios from 'axios';
import { Converter } from 'aws-sdk/clients/dynamodb';
import type { DynamoDBStreamEvent } from 'aws-lambda';
import { NftEntity } from 'libs';
import { getEnv } from 'libs/getEnv';

export const main = async (event: DynamoDBStreamEvent): Promise<void> => {
  try {
    await Promise.all(
      event.Records.map(async ({ eventName, dynamodb }) => {
        switch (eventName) {
          case 'INSERT':
            if (dynamodb?.NewImage === undefined) return;
            const newImage = Converter.unmarshall(dynamodb.NewImage);
            const nft = NftEntity.parse(newImage);
            await axios.post(getEnv('HOOK_URL'), {
              event: JSON.stringify(nft),
            });
            break;
          default:
            return;
        }
      })
    );
  } catch (err) {
    console.error(err);
  }
};
