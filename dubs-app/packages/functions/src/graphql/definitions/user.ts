import { TABLE_NAME, UserModel } from '@dubs-app/core/models/user';

import { Postgres } from '@dubs-app/databases/postgres';
import { builder } from '../builder';
import { omit } from 'lodash';

const UserType = builder.objectRef<Postgres.Row[TABLE_NAME]>('User').implement({
  description: 'User record from the Postgres database.',
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.string({ resolve: (user) => UserModel.fullName(user) }),
    email: t.exposeString('email'),
    handle: t.exposeString('handle'),
    lastName: t.exposeString('lastName'),
    firstName: t.exposeString('firstName'),
    picture: t.exposeString('picture'),
    createdAt: t.exposeString('createdAt'),
    updatedAt: t.exposeString('updatedAt'),
  }),
});

builder.queryFields((t) => ({
  currentUser: t.field({
    type: UserType || undefined,
    resolve: (_, _args, context) => {
      return context.user as unknown as Postgres.Row[TABLE_NAME];
    },
  }),
  user: t.field({
    type: UserType,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      const result = await UserModel.get(args.id);

      if (!result) {
        throw new Error('User not found');
      }

      return result;
    },
  }),
  users: t.field({
    type: [UserType],
    resolve: (_parent, _args, _context, _info) => {
      return UserModel.list();
    },
  }),
}));

builder.mutationFields((t) => ({
  createUser: t.field({
    type: UserType,
    args: {
      email: t.arg.string({ required: true }),
      firstName: t.arg.string({ required: false }),
      handle: t.arg.string({ required: false }),
      lastName: t.arg.string({ required: false }),
      picture: t.arg.string({ required: false }),
    },
    resolve: (_, args) => UserModel.create(args as UserModel.CreateUserInput),
  }),
  destroyUser: t.field({
    type: 'Int',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (_, args) => UserModel.destroy(args.id),
  }),
  updateUser: t.field({
    type: UserType,
    args: {
      id: t.arg.string({ required: true }),
      email: t.arg.string({ required: false }),
      firstName: t.arg.string({ required: false }),
      handle: t.arg.string({ required: false }),
      lastName: t.arg.string({ required: false }),
      picture: t.arg.string({ required: false }),
    },
    resolve: (_, args) => {
      const modifiedArgs = {
        ...omit(args, 'id'),
      };

      return UserModel.update(
        args.id,
        modifiedArgs as UserModel.UpdateUserInput
      );
    },
  }),
}));
