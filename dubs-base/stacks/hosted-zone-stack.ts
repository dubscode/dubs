import * as route53 from 'aws-cdk-lib/aws-route53';

import { CfnOutput, Fn } from 'aws-cdk-lib';

import { StackContext } from 'sst/constructs';

export function HostedZoneStack({ stack }: StackContext) {
  const domainName = process.env.DOMAIN_NAME;

  if (!domainName) {
    throw new Error('Missing DOMAIN_NAME env variable in .env.local');
  }

  const hostedZone = new route53.PublicHostedZone(stack, 'r53-hosted-zone', {
    zoneName: domainName,
    comment: `Public hosted zone for ${domainName}`,
  });

  new CfnOutput(stack, 'hostedZone', {
    value: hostedZone.zoneName,
    exportName: 'hostedZone',
  });

  if (hostedZone.hostedZoneNameServers) {
    for (let i = 0; i < 4; i++) {
      new CfnOutput(stack, `ns${i + 1}`, {
        value: Fn.select(i, hostedZone.hostedZoneNameServers),
        exportName: `ns${i + 1}`,
      });
    }
  }

  return { hostedZone };
}
