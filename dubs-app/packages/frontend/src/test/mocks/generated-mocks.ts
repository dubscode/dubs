/* eslint-disable @typescript-eslint/no-use-before-define,@typescript-eslint/no-unused-vars,no-prototype-builtins */
import { faker } from '@faker-js/faker';
import { Mutation, Query, User } from '@dubs-app/core/types/gql.generated';

export const aMutation = (overrides?: Partial<Mutation>): Mutation => {
    return {
        createUser: overrides && overrides.hasOwnProperty('createUser') ? overrides.createUser! : aUser(),
        destroyUser: overrides && overrides.hasOwnProperty('destroyUser') ? overrides.destroyUser! : 230,
        updateUser: overrides && overrides.hasOwnProperty('updateUser') ? overrides.updateUser! : aUser(),
    };
};

export const aQuery = (overrides?: Partial<Query>): Query => {
    return {
        currentUser: overrides && overrides.hasOwnProperty('currentUser') ? overrides.currentUser! : aUser(),
        user: overrides && overrides.hasOwnProperty('user') ? overrides.user! : aUser(),
        users: overrides && overrides.hasOwnProperty('users') ? overrides.users! : [aUser()],
    };
};

export const aUser = (overrides?: Partial<User>): User => {
    return {
        createdAt: overrides && overrides.hasOwnProperty('createdAt') ? overrides.createdAt! : new Date().toISOString(),
        email: overrides && overrides.hasOwnProperty('email') ? overrides.email! : faker.internet.email(),
        firstName: overrides && overrides.hasOwnProperty('firstName') ? overrides.firstName! : faker.name.firstName(),
        handle: overrides && overrides.hasOwnProperty('handle') ? overrides.handle! : faker.internet.userName(),
        id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : faker.datatype.uuid(),
        lastName: overrides && overrides.hasOwnProperty('lastName') ? overrides.lastName! : faker.name.lastName(),
        name: overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'porro',
        picture: overrides && overrides.hasOwnProperty('picture') ? overrides.picture! : faker.image.avatar(),
        updatedAt: overrides && overrides.hasOwnProperty('updatedAt') ? overrides.updatedAt! : new Date().toISOString(),
    };
};
