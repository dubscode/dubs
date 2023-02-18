import {
  GetDomainDetailCommand,
  Route53DomainsClient,
  UpdateDomainNameserversCommand,
} from '@aws-sdk/client-route-53-domains';

interface NameserverEvent {
  params: {
    domainName: string;
    nameservers: string[];
  };
}

export const updateNameservers = async (event: NameserverEvent) => {
  const { domainName, nameservers } = event.params;

  const client = new Route53DomainsClient({
    region: 'us-east-1', // This has to be hardcoded to us-east-1 for route53 domains
  });

  const getDomainDetailCommand = new GetDomainDetailCommand({
    DomainName: domainName,
  });

  const { Nameservers } = await client.send(getDomainDetailCommand);

  if (Nameservers) {
    const currentNameservers = Nameservers.map((ns) => ns.Name);

    if (currentNameservers.sort().join(',') === nameservers.sort().join(',')) {
      console.log('Nameservers are already up to date. Skipping...');
      return;
    }
  }

  const updateNsCommand = new UpdateDomainNameserversCommand({
    DomainName: domainName,
    Nameservers: nameservers.map((ns) => {
      return {
        Name: ns,
      };
    }),
  });

  const { OperationId: opId } = await client.send(updateNsCommand);

  return opId;
};
