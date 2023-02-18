import { RDS, StackContext } from 'sst/constructs';

export function PostgresStack({ stack }: StackContext) {
  const rds = new RDS(stack, 'db-rds', {
    engine: 'postgresql11.13',
    defaultDatabaseName: 'main',
    scaling: {
      autoPause: stack.stage !== 'prod',
      minCapacity: 'ACU_2',
      maxCapacity: stack.stage !== 'prod' ? 'ACU_2' : 'ACU_4',
    },
    migrations: 'packages/databases/src/migrations',
    types: 'packages/core/src/types/sql.generated.ts',
  });

  return rds;
}
