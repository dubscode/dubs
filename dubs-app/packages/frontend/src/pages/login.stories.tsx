import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';

import { Login } from './login';
import { expect } from '@storybook/jest';
import { faker } from '@faker-js/faker';

export default {
  title: 'Page/Login',
  component: Login,
  argTypes: {
    onSubmit: { action: 'submit' },
  },
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = () => <Login />;

export const Default = Template.bind({});
