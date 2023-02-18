import * as route53 from 'aws-cdk-lib/aws-route53';
import * as ses from 'aws-cdk-lib/aws-ses';

import { StackContext, use } from 'sst/constructs';

import { DomainStack } from './domain-stack';
import { RemovalPolicy } from 'aws-cdk-lib';

export function SesStack({ stack }: StackContext) {
  const { hostedZoneName, mailDomain } = use(DomainStack);

  const hostedZone = route53.HostedZone.fromLookup(stack, 'HostedZone', {
    domainName: hostedZoneName,
  });

  const identity = new ses.EmailIdentity(stack, 'Identity', {
    identity: ses.Identity.publicHostedZone(hostedZone),
    mailFromDomain: mailDomain,
  });

  identity.applyRemovalPolicy(RemovalPolicy.DESTROY);

  stack.addOutputs({
    EmailIdentity: identity.emailIdentityName,
    HostedZoneId: hostedZone.hostedZoneId,
  });

  return { identity };
}
