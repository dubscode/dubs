import { render, screen, userEvent, waitFor } from '../../../test/test-utils';

import { LoginForm } from './login-form';

describe('LoginForm', () => {
  it('should render', () => {
    render(<LoginForm />);
    expect(screen.getByText(/send link/i)).toBeInTheDocument();
  });

  it('should show error message when email is empty', async () => {
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    userEvent.click(emailInput);
    expect(emailInput).toHaveValue('');

    const submitButton = screen.getByRole('button');
    expect(submitButton).toHaveTextContent(/send link/i);

    await waitFor(() => {
      userEvent.click(submitButton);
      expect(screen.getByText(/email field is required/i)).toBeInTheDocument();
    });
  });
});
