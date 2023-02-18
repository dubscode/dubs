import {
  handlers,
  startServerAndCreateLambdaHandler,
} from '@as-integrations/aws-lambda';

import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import type { SessionTypes } from 'sst/node/auth';
import { createAuthContext } from '../utils/auth-utils';
import { schema } from './schema';

interface Context {
  event: APIGatewayProxyEventV2;
  user?: SessionTypes['user'];
}

const server = new ApolloServer<Context>({
  schema,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ includeCookies: true }),
  ],
  introspection: !!process.env.IS_LOCAL,
});

export const handler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
  {
    context: async ({ event }) => {
      return createAuthContext(event);
    },
  }
);
