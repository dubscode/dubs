import { render, screen } from './test/test-utils';

import { App } from './App';

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />);
    expect(screen.getByText(/enter your email to login/i)).toBeInTheDocument();
  });
});
