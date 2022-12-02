import { Config, StackContext, Table } from '@serverless-stack/resources';

import {
  GS1_PARTITION_KEY,
  GS1_SORT_KEY,
  PARTITION_KEY,
  SORT_KEY,
} from './partitionKeys';

const defaultTableProps = {
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
  stream: true,
} as const;

export function Database({ stack }: StackContext) {
  const table = new Table(stack, 'Table', defaultTableProps);

  const testTable = new Table(stack, `TestTable`, defaultTableProps);

  const testNoDownstreamTable = new Table(
    stack,
    `TestNoDownstreamTable`,
    defaultTableProps
  );

  const TEST_TABLE_NAME = new Config.Parameter(stack, 'TEST_TABLE_NAME', {
    value: testTable.tableName,
  });

  const TEST_NO_DOWNSTREAM_TABLE_NAME = new Config.Parameter(
    stack,
    'TEST_NO_DOWNSTREAM_TABLE_NAME',
    {
      value: testNoDownstreamTable.tableName,
    }
  );

  const forwardNft = {
    function: {
      handler: 'functions/forwardNft/forwardNft.main',
      environment: {
        TABLE_NAME: table.tableName,
        HOOK_URL: 'https://webhook.site/351c0363-563e-4a46-a4be-e940e7725628',
      },
    },
  };

  const testForwardNft = {
    function: {
      handler: 'functions/forwardNft/forwardNft.main',
      environment: {
        TABLE_NAME: testTable.tableName,
        HOOK_URL:
          'https://webhook.site/351c0363-563e-4a46-a4be-e940e7725628/test',
      },
    },
  };

  table.addConsumers(stack, { forwardNft });
  testTable.addConsumers(stack, { testForwardNft });

  return {
    table,
    testTable,
    testNoDownstreamTable,
    TEST_NO_DOWNSTREAM_TABLE_NAME,
    TEST_TABLE_NAME,
  };
}
