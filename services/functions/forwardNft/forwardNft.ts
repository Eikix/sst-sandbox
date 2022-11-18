import axios from 'axios';
import { Converter } from 'aws-sdk/clients/dynamodb';
import type { DynamoDBStreamEvent } from 'aws-lambda';
import { NftEntity } from 'libs';

// type DynamoDbStreamEvent = {
//   Records: DynamoDbRecord[];
// };

// type DynamoDbRecord = {
//   eventID: string;
//   eventName: string;
//   eventVersion: string;
//   eventSource: string;
//   awsRegion: string;
//   dynamodb: DynamoDbStreamRecord;
//   eventSourceARN: string;
// };

// type DynamoDbStreamRecord = {
//   ApproximateCreationDateTime: number;
//   Keys: {
//     [key: string]: {
//       S: string;
//     };
//   };
// };

type TNft = ReturnType<typeof NftEntity['parse']>;

export const main = async (
  event: DynamoDBStreamEvent
): Promise<TNft[] | undefined> => {
  const res: TNft[] = [];
  try {
    await Promise.all(
      event.Records.map(async ({ eventName, dynamodb }) => {
        switch (eventName) {
          case 'INSERT':
            if (dynamodb?.NewImage === undefined) return;
            const newImage = Converter.unmarshall(dynamodb.NewImage);
            const nft = NftEntity.parse(newImage);
            res.push(nft);
            await axios.post(
              'https://webhook.site/351c0363-563e-4a46-a4be-e940e7725628',
              {
                event: JSON.stringify(nft),
              }
            );
            break;
          default:
            return;
        }
      })
    );
    return res;
  } catch (err) {
    console.error(err);
  }
};
