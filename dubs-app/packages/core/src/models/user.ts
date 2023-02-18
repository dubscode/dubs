export * as UserModel from './user';

import { Postgres } from '@dubs-app/databases/postgres';
import { Selectable } from 'kysely';
import type { User } from '../types/postgres.types';
import gravatarUrl from 'gravatar-url';
import { random } from 'lodash';

const tableName = 'users';
export type TABLE_NAME = 'users';

export type UserType = Selectable<User>;

export interface CreateUserInput {
  email: string;
  firstName?: string;
  handle?: string;
  lastName?: string;
  picture?: string;
}

export interface UpdateUserInput {
  email?: string;
  firstName?: string;
  handle?: string;
  lastName?: string;
  picture?: string;
}

export const create = async (input: CreateUserInput) => {
  const name = fullName(input);
  const handle = await generateHandle(name);
  const [result] = await Postgres.DB.insertInto(tableName)
    .values({
      ...input,
      email: sanitizeEmail(input.email),
      handle: input.handle || handle,
      picture: input.picture || gravatarUrl(input.email),
    })
    .returningAll()
    .execute();
  return result;
};

export const destroy = async (id: string) => {
  const result = await Postgres.DB.deleteFrom(tableName)
    .where('id', '=', id)
    .executeTakeFirst();

  return Number(result.numDeletedRows);
};

export const findOrCreate = async (input: CreateUserInput) => {
  const email = sanitizeEmail(input.email);
  const user = await getByEmail(email);
  if (user) return { user, created: false };
  const newUser = await create({ ...input, email });
  return { user: newUser, created: true };
};

export const fullName = (user: Partial<User> | Selectable<User>) => {
  const { firstName, lastName } = user;
  if (!firstName && !lastName) return 'New User';
  return `${firstName} ${lastName}`;
};

const generateHandle = async (name: string, ext = ''): Promise<string> => {
  const handle =
    name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .trim()
      .substring(0, 20) + ext;

  const existing = await getByHandle(handle);
  if (!existing) return handle;
  return await generateHandle(name, String(random(1000, 9999)));
};

export const get = async (id: string) => {
  return await Postgres.DB.selectFrom(tableName)
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
};

export const getByEmail = async (email: string) => {
  return await Postgres.DB.selectFrom(tableName)
    .selectAll()
    .where('email', '=', email)
    .executeTakeFirst();
};

export const getByHandle = async (handle: string) => {
  return await Postgres.DB.selectFrom(tableName)
    .selectAll()
    .where('handle', '=', handle)
    .executeTakeFirst();
};

export const list = async () => {
  return Postgres.DB.selectFrom(tableName)
    .selectAll()
    .orderBy('createdAt', 'desc')
    .execute();
};

const sanitizeEmail = (email: string) => email.toLowerCase().trim();

export const update = async (id: string, input: UpdateUserInput) => {
  const [result] = await Postgres.DB.updateTable(tableName)
    .set({
      ...input,
      ...(input.email &&
        !input.picture && { picture: gravatarUrl(input.email) }),
      updatedAt: new Date().toISOString(),
    })
    .where('id', '=', id)
    .returningAll()
    .execute();
  return result;
};
