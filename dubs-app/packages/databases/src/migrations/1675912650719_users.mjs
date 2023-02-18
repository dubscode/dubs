import { Kysely, sql } from 'kysely';

const TABLE_NAME = 'users';

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`.execute(db);

  await db.schema
    .createTable(TABLE_NAME)
    .addColumn('id', 'text', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn('email', 'text', (col) => col.notNull().unique())
    .addColumn('firstName', 'text')
    .addColumn('handle', 'text', (col) => col.notNull().unique())
    .addColumn('lastName', 'text')
    .addColumn('picture', 'text')
    .addColumn('createdAt', 'text', (col) =>
      col.notNull().defaultTo(new Date().toISOString())
    )
    .addColumn('updatedAt', 'text', (col) =>
      col.notNull().defaultTo(new Date().toISOString())
    )
    .execute();

  await db.schema
    .createIndex('idx_user_email')
    .on(TABLE_NAME)
    .column('email')
    .execute();

  await db.schema
    .createIndex('idx_user_handle')
    .on(TABLE_NAME)
    .column('handle')
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropIndex('idx_user_email').execute();
  await db.schema.dropIndex('idx_user_handle').execute();
  await db.schema.dropTable(TABLE_NAME).execute();
}
