import { Config, StackContext, Table } from '@serverless-stack/resources';
import {
  GS1_PARTITION_KEY,
  GS1_SORT_KEY,
  PARTITION_KEY,
  SORT_KEY,
} from './partitionKeys';

export function Database({ stack }: StackContext) {
  const table = new Table(stack, 'table', {
    fields: {
      [PARTITION_KEY]: 'string',
      [SORT_KEY]: 'string',
      [GS1_PARTITION_KEY]: 'string',
      [GS1_SORT_KEY]: 'string',
    },
    primaryIndex: {
      partitionKey: PARTITION_KEY,
      sortKey: SORT_KEY,
    },
    globalIndexes: {
      gsi1: {
        partitionKey: GS1_PARTITION_KEY,
        sortKey: GS1_SORT_KEY,
      },
    },
  });

  return {
    table,
    TABLE_NAME: new Config.Parameter(stack, 'TABLE_NAME', {
      value: table.tableName,
    }),
  };
}