import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import type { SessionTypes } from 'sst/node/auth';
import { createVerifier } from 'fast-jwt';
import { getPublicKey } from 'sst/node/auth';

export const createAuthContext = async (event: APIGatewayProxyEventV2) => {
  if (event.cookies) {
    const cookies = Object.fromEntries(event.cookies.map((c) => c.split('=')));
    const token = cookies['auth-token'] as string;
    if (token) {
      const jwt = createVerifier({
        algorithms: ['RS512'],
        key: getPublicKey(),
      })(token);

      return {
        event,
        user: jwt.properties as SessionTypes['user'],
      };
    }
  }

  return {
    event,
  };
};
