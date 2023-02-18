import { Script, StackContext, dependsOn } from 'sst/constructs';

import { Fn } from 'aws-cdk-lib';
import { HostedZoneStack } from './hosted-zone-stack';

export function ScriptDomain({ stack }: StackContext) {
  dependsOn(HostedZoneStack);

  const hostedZoneName = Fn.importValue('hostedZone');
  const nameservers = [
    Fn.importValue('ns1'),
    Fn.importValue('ns2'),
    Fn.importValue('ns3'),
    Fn.importValue('ns4'),
  ];

  // This stack creates a script that updates the nameservers for the domain
  const script = new Script(stack, 'script-domain-ns', {
    onCreate: 'packages/functions/src/script-domain.updateNameservers',
    onUpdate: 'packages/functions/src/script-domain.updateNameservers',
    params: {
      domainName: hostedZoneName,
      nameservers,
    },
  });

  script.attachPermissions(['route53', 'route53domains']);

  return { script };
}
