import { Auth, StackContext, use } from 'sst/constructs';

import { ApiStack } from './api-stack';
import { DomainStack } from './domain-stack';

export const AuthStack = ({ stack }: StackContext) => {
  const { api } = use(ApiStack);
  const { domain, mailDomain } = use(DomainStack);

  const auth = new Auth(stack, 'auth', {
    authenticator: {
      handler: 'packages/functions/src/auth.handler',
      environment: {
        MAIL_DOMAIN: mailDomain,
        REDIRECT_URL: !!process.env.IS_LOCAL
          ? `https://${domain}`
          : 'http://localhost:3000',
      },
      permissions: ['ses:SendEmail', 'ses:SendRawEmail'],
    },
  });

  auth.attach(stack, {
    api: api,
    prefix: '/auth',
  });

  return auth;
};
