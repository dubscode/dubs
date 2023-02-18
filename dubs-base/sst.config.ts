import dotenv from 'dotenv';
import findConfig from 'find-config';
import { SSTConfig } from 'sst';
import { HostedZoneStack } from './stacks/hosted-zone-stack';
import { ScriptDomain } from './stacks/script-domain-stack';

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
      name: 'dubs-base',
      region: 'us-west-2',
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: 'nodejs18.x',
    });
    app.stack(HostedZoneStack).stack(ScriptDomain);
  },
} satisfies SSTConfig;
