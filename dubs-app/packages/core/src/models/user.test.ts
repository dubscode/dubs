import { beforeEach, describe, expect, it } from 'vitest';

import { UserModel } from './user';
import { faker } from '@faker-js/faker';

describe('test users', () => {
  let user: UserModel.UserType;

  beforeEach(async () => {
    user = (await UserModel.create({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      picture: faker.image.avatar(),
    })) as UserModel.UserType;

    // clean up function, called once after each test run
    return async () => {
      await UserModel.destroy(user.id);
    };
  });

  describe('fullName', () => {
    it('generates users full name', () => {
      expect(UserModel.fullName(user)).toBe(
        `${user.firstName} ${user.lastName}`
      );
    });

    it('returns New user if names are null', () => {
      expect(
        UserModel.fullName({
          ...user,
          firstName: undefined,
          lastName: undefined,
        })
      ).toBe('New User');
    });
  });

  it('creates a user', async () => {
    // List all users
    const list = await UserModel.list();

    // Check the newly created user exists
    expect(list.find((u) => u.id === user.id)).not.toBeNull();
  });

  describe('get', () => {
    it('gets the user', async () => {
      // Get the user
      const foundUser = await UserModel.get(user.id);

      // Ensure we received the user
      expect(foundUser).not.toBeUndefined();
      expect(foundUser?.id).toBe(user.id);
    });

    it('returns undefined if not found', async () => {
      // Get the user
      const foundUser = await UserModel.get('999999999');

      // Ensure we received the user
      expect(foundUser).toBeUndefined();
    });
  });

  describe('getByEmail', () => {
    it('gets the user', async () => {
      // Get the user
      const foundUser = await UserModel.getByEmail(user.email);

      // Ensure we received the user
      expect(foundUser).not.toBeUndefined();
      expect(foundUser?.id).toBe(user.id);
    });

    it('returns undefined if not found', async () => {
      // Get the user
      const foundUser = await UserModel.getByEmail(faker.internet.email());

      // Ensure we received the user
      expect(foundUser).toBeUndefined();
    });
  });

  describe('getByHandle', () => {
    it('gets the user', async () => {
      // Get the user
      const foundUser = await UserModel.getByHandle(user.handle);

      // Ensure we received the user
      expect(foundUser).not.toBeUndefined();
      expect(foundUser?.id).toBe(user.id);
    });

    it('returns undefined if not found', async () => {
      // Get the user
      const foundUser = await UserModel.getByHandle(faker.internet.userName());

      // Ensure we received the user
      expect(foundUser).toBeUndefined();
    });
  });

  it('updates a user', async () => {
    const NEW_FIRST_NAME = 'Updated';
    const updatedUser = await UserModel.update(user.id, {
      firstName: NEW_FIRST_NAME,
    });

    // Check the user was updated
    expect(updatedUser.firstName).toBe(NEW_FIRST_NAME);
  });

  it('deletes a user', async () => {
    // Delete the user
    const numDeleted = await UserModel.destroy(user.id);

    // Check the user was deleted
    expect(numDeleted).toBe(1);

    // List all users
    const list = await UserModel.list();

    // Check the deleted user does not exist
    expect(list.find((u) => u.id === user.id)).toBeUndefined();
  });
});
