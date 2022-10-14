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
    defaults: {
      function: {
        permissions: [db.table],
        config: [db.TABLE_NAME],
      },
    },
    routes: {
      'GET /': 'functions/lambda.handler',
      'GET /{userId}': 'functions/getUserNft.handler',
      'POST /create': 'functions/createNft.handler',
    },
  });
  new Config.Parameter(stack, 'API_URL', {
    value: api.url,
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
