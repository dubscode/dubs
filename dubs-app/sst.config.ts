import dotenv from 'dotenv';
import findConfig from 'find-config';
import { SSTConfig } from 'sst';
import { ApiStack } from './stacks/api-stack';
import { AuthStack } from './stacks/auth-stack';
import { DomainStack } from './stacks/domain-stack';
import { FrontendStack } from './stacks/frontend-stack';
import { PostgresStack } from './stacks/postgres-stack';
import { SesStack } from './stacks/ses-stack';

dotenv.config({
  path: findConfig('.env') as string,
  override: true,
});
dotenv.config({
  path: findConfig('.env.local') as string,
  override: true,
});

export default {
  config(_input) {
    return {
      name: 'dubs-app',
      region: 'us-west-2',
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: 'nodejs18.x',
    });
    app
      .stack(DomainStack)
      .stack(SesStack)
      .stack(PostgresStack)
      .stack(ApiStack)
      .stack(AuthStack)
      .stack(FrontendStack);
  },
} satisfies SSTConfig;
