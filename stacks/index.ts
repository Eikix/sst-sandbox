import { Api } from './Api';
import { App } from '@serverless-stack/resources';
import { Database } from './Database';

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: 'nodejs16.x',
    srcPath: 'services',
    bundle: {
      format: 'esm',
    },
  });
  app.stack(Database).stack(Api);
}
