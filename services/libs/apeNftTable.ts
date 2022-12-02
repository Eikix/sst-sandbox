import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Table } from 'dynamodb-toolbox';
import { PARTITION_KEY, SORT_KEY } from '../../stacks/partitionKeys';
import { getEnv } from './getEnv';

const documentClient = new DocumentClient({
  region: 'us-east-1',
});

export default new Table({
  name: getEnv('TABLE_NAME'),
  partitionKey: PARTITION_KEY,
  sortKey: SORT_KEY,
  autoExecute: true,
  autoParse: true,
  DocumentClient: documentClient,
});
