import { Api, StackContext, use } from 'sst/constructs';

import { DomainStack } from './domain-stack';
import { PostgresStack } from './postgres-stack';

export function ApiStack({ stack }: StackContext) {
  const db = use(PostgresStack);
  const { allowOrigins, apiDomain, hostedZoneName } = use(DomainStack);

  const api = new Api(stack, 'api', {
    defaults: {
      function: {
        bind: [db],
      },
    },
    customDomain: {
      domainName: apiDomain,
      hostedZone: hostedZoneName,
    },
    cors: {
      allowCredentials: true,
      allowHeaders: ['content-type', 'authorization', 'accept'],
      allowMethods: ['ANY'],
      allowOrigins,
    },
    routes: {
      'POST /graphql': {
        type: 'graphql',
        function: {
          handler: 'packages/functions/src/graphql/server.handler',
        },
        pothos: {
          schema: 'packages/functions/src/graphql/schema.ts',
          // We need to put the generated schema file
          // outside of the main folder so the "file.changed"
          // event doesn't get triggered circularly.
          // @serverless-stack/core/dist/cli/PothosBuilder.js
          output: 'graphql-output/schema.graphql',
          commands: ['npm run gql'],
        },
      },
      'GET /graphql': {
        type: 'graphql',
        function: {
          handler: 'packages/functions/src/graphql/server.handler',
        },
      },
    },
  });

  const url = api.customDomainUrl || api.url;
  const graphqlUrl = `${url}/graphql`;

  stack.addOutputs({
    ApiUrl: url,
    GraphqlUrl: graphqlUrl,
  });

  return { api, graphqlUrl, url };
}
