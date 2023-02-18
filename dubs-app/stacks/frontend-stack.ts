import { StackContext, StaticSite, dependsOn, use } from 'sst/constructs';

import { ApiStack } from './api-stack';
import { DomainStack } from './domain-stack';

export function FrontendStack({ stack }: StackContext) {
  dependsOn(ApiStack);
  const { graphqlUrl, url } = use(ApiStack);
  const { domain, hostedZoneName, storyDomain } = use(DomainStack);

  const storybook = new StaticSite(stack, 'storybook-site', {
    dev: {
      deploy: true,
    },
    path: 'packages/frontend',
    buildOutput: 'storybook-static',
    buildCommand: 'npm run build-storybook',
    customDomain: {
      domainName: storyDomain,
      hostedZone: hostedZoneName,
    },
    environment: {
      API_URL: url,
      GRAPHQL_URL: graphqlUrl,
    },
  });

  const frontend = new StaticSite(stack, 'frontend-site', {
    path: 'packages/frontend',
    buildOutput: 'dist',
    buildCommand: 'npm run build',
    customDomain: {
      domainName: domain,
      hostedZone: hostedZoneName,
    },
    environment: {
      VITE_API_URL: url,
      VITE_GRAPHQL_URL: graphqlUrl,
      VITE_STORYBOOK_URL: storyDomain,
    },
  });

  const frontUrl = frontend.customDomainUrl || frontend.url;

  if (frontUrl) {
    stack.addOutputs({
      FrontendUrl: frontUrl,
    });
  }

  return { frontend, storybook };
}
