import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Users {
  id: Generated<string>;
  email: string;
  firstName: string | null;
  handle: string;
  lastName: string | null;
  picture: string | null;
  createdAt: Generated<string>;
  updatedAt: Generated<string>;
}

export interface Database {
  users: Users;
}
