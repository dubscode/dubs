import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';

import { LoginForm } from './login-form';
import { expect } from '@storybook/jest';
import { faker } from '@faker-js/faker';

export default {
  title: 'Auth/LoginForm',
  component: LoginForm,
  argTypes: {
    onSubmit: { action: 'submit' },
  },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = () => <LoginForm />;

export const Default = Template.bind({});
export const EmptyEmail = Template.bind({});

EmptyEmail.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Set the email input to an empty string
  const emailInput = canvas.getByPlaceholderText('Enter your email');
  userEvent.click(emailInput);
  expect(emailInput).toHaveValue('');

  // Find the submit button
  const submitButton = canvas.getByRole('button');
  expect(submitButton).toHaveTextContent(/send link/i);

  // Click the submit button and verify error message
  await waitFor(() => {
    userEvent.click(submitButton);
    expect(canvas.getByText(/email field is required/i)).toBeInTheDocument();
  });
};
