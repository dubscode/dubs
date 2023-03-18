import { Kysely, Selectable } from 'kysely';

import { DataApiDialect } from 'kysely-data-api';
import type { Database } from '@dubs-app/core/types/postgres.types';
import { RDS } from 'sst/node/rds';
import { RDSData } from '@aws-sdk/client-rds-data';

export const DB = new Kysely<Database>({
  dialect: new DataApiDialect({
    mode: 'postgres',
    driver: {
      secretArn: RDS['db-rds'].secretArn,
      resourceArn: RDS['db-rds'].clusterArn,
      database: RDS['db-rds'].defaultDatabaseName,
      client: new RDSData({}),
    },
  }),
});

export type Row = {
  [Key in keyof Database]: Selectable<Database[Key]>;
};

export * as Postgres from './postgres';
