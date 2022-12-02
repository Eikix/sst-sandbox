import {
  StackContext,
  Api as ApiGateway,
  use,
  Config,
} from '@serverless-stack/resources';
import { Database } from './Database';

export function Api({ stack }: StackContext) {
  const db = use(Database);
  const api = new ApiGateway(stack, 'api', {
    routes: {
      'GET /': {
        function: {
          handler: 'functions/lambda.handler',
          permissions: [db.table],
          environment: { TABLE_NAME: db.table.tableName },
        },
      },
      'GET /test': {
        function: {
          handler: 'functions/lambda.handler',
          permissions: [db.testNoDownstreamTable],
          environment: { TABLE_NAME: db.testNoDownstreamTable.tableName },
        },
      },
      'GET /{userId}': {
        function: {
          handler: 'functions/getUserNft/getUserNft.handler',
          permissions: [db.table],
          environment: { TABLE_NAME: db.table.tableName },
        },
      },
      'GET /test/{userId}': {
        function: {
          handler: 'functions/getUserNft/getUserNft.handler',
          permissions: [db.testNoDownstreamTable],
          environment: { TABLE_NAME: db.testNoDownstreamTable.tableName },
        },
      },
      'POST /create': {
        function: {
          handler: 'functions/createNft/createNft.handler',
          permissions: [db.table],
          environment: { TABLE_NAME: db.table.tableName },
        },
      },
      'POST /test/create': {
        function: {
          handler: 'functions/createNft/createNft.handler',
          permissions: [db.testNoDownstreamTable],
          environment: { TABLE_NAME: db.testNoDownstreamTable.tableName },
        },
      },
      'DELETE /delete': {
        function: {
          handler: 'functions/deleteNft/deleteNft.handler',
          permissions: [db.table],
          environment: { TABLE_NAME: db.table.tableName },
        },
      },
      'DELETE /test/delete': {
        function: {
          handler: 'functions/deleteNft/deleteNft.handler',
          permissions: [db.testNoDownstreamTable],
          environment: { TABLE_NAME: db.testNoDownstreamTable.tableName },
        },
      },
    },
  });
  new Config.Parameter(stack, 'API_URL', {
    value: api.url,
  });
  new Config.Parameter(stack, 'TEST_API_URL', {
    value: `${api.url}/test`,
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
