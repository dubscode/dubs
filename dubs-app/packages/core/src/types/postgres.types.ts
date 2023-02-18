import { Generated } from 'kysely';

export interface User {
  createdAt?: string;
  email: string;
  firstName?: string;
  handle: string;
  id: Generated<string>;
  lastName?: string;
  picture?: string;
  updatedAt?: string;
}

export interface Database {
  users: User;
}
