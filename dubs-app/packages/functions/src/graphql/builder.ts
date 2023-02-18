import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import SchemaBuilder from '@pothos/core';
import type { SessionTypes } from 'sst/node/auth';

export const builder = new SchemaBuilder<{
  Context: {
    event: APIGatewayProxyEventV2;
    user?: SessionTypes['user'];
  };
  DefaultFieldNullability: true;
}>({
  defaultFieldNullability: true,
});

builder.queryType({});
builder.mutationType({});
