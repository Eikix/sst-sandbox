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
      'GET /{userId}': {
        function: {
          handler: 'functions/getUserNft/getUserNft.handler',
          permissions: [db.table],
          config: [db.TABLE_NAME],
        },
      },

      'POST /create': {
        function: {
          handler: 'functions/createNft/createNft.handler',
          permissions: [db.table],
          config: [db.TABLE_NAME],
        },
      },

      'DELETE /delete': {
        function: {
          handler: 'functions/deleteNft/deleteNft.handler',
          permissions: [db.table],
          config: [db.TABLE_NAME],
        },
      },
    },
  });

  new Config.Parameter(stack, 'API_URL', {
    value: api.url,
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
