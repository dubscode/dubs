import { StackContext } from 'sst/constructs';

export function DomainStack({ stack }: StackContext) {
  const domainName = process.env.DOMAIN_NAME;

  if (!domainName) {
    throw new Error('Missing DOMAIN_NAME env variable in .env.local');
  }

  const DOMAIN: Record<string, string> = {
    dev: `dev.${stack.stage}.${domainName}`,
    prod: domainName,
    staging: `staging.${domainName}`,
  };

  const apiDomain = DOMAIN[stack.stage]
    ? `api.${DOMAIN[stack.stage]}`
    : `api.${DOMAIN.dev}`;

  const docsDomain = DOMAIN[stack.stage]
    ? `docs.${DOMAIN[stack.stage]}`
    : `docs.${DOMAIN.dev}`;

  const domain = DOMAIN[stack.stage] ? DOMAIN[stack.stage] : DOMAIN.dev;

  const mailDomain = DOMAIN[stack.stage]
    ? `mail.${DOMAIN[stack.stage]}`
    : `mail.${DOMAIN.dev}`;

  const storyDomain = DOMAIN[stack.stage]
    ? `story.${DOMAIN[stack.stage]}`
    : `story.${DOMAIN.dev}`;

  const allowOrigins = !!process.env.IS_LOCAL
    ? [`https://${domain}`, `https://${apiDomain}`]
    : [`https://${domain}`, `https://${apiDomain}`, 'http://localhost:3000'];

  stack.addOutputs({
    AllowOrigins: allowOrigins.join(','),
    ApiDomain: apiDomain,
    DocsDomain: docsDomain,
    Domain: domain,
    HostedZoneName: domainName,
    MailDomain: mailDomain,
    StoryDomain: storyDomain,
  });

  return {
    allowOrigins,
    apiDomain,
    docsDomain,
    domain,
    hostedZoneName: domainName,
    mailDomain,
    storyDomain,
  };
}
