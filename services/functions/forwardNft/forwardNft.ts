import { DynamoDBStreamEvent } from 'aws-lambda';
import axios from 'axios';

const WEBHOOK_URL = 'https://webhook.site/351c0363-563e-4a46-a4be-e940e7725628';

// write forwardNft here
export const main = async (event: DynamoDBStreamEvent): Promise<void> => {
  await axios.post(WEBHOOK_URL, 'hello');
  Promise.resolve();
};
