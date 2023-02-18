import {
  CurrentUserDocument,
  GetUsersDocument,
} from '../features/users/gql/_gen_/users.gql';
/* eslint-disable import/export */
import { cleanup, render } from '@testing-library/react';

import { MockedProvider } from '@apollo/client/testing';
import { aUser } from './mocks/generated-mocks';
import { afterEach } from 'vitest';
import hexRgb from 'hex-rgb';

afterEach(() => {
  cleanup();
});

const mocks = [
  {
    request: {
      query: GetUsersDocument,
    },
    result: {
      data: {
        users: [aUser()],
      },
    },
  },
  {
    request: {
      query: CurrentUserDocument,
    },
    result: {
      data: {
        currentUser: aUser(),
      },
    },
  },
];

const colorConvert = (hexColor: string) => {
  const rgb = hexRgb(hexColor);
  return `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      {ui}
    </MockedProvider>,
    {
      // wrap provider(s) here if needed
      wrapper: ({ children }) => children,
      ...options,
    }
  );

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render, colorConvert };
