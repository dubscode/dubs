import { colorConvert, render, screen, userEvent } from './test/test-utils';

import { App } from './App';

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />);
    expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
  });

  it('should increment count on click', async () => {
    render(<App />);
    userEvent.click(screen.getByRole('button'));
    expect(await screen.findByText(/count is 1/i)).toBeInTheDocument();
  });

  it('uses proper css color for learn more', async () => {
    render(<App />);
    const element = screen.getByText(
      /Click on the Vite and React logos to learn more/i
    );
    expect(element.className).toEqual('read-the-docs');
    expect(getComputedStyle(element).color).toEqual(colorConvert('#888'));
  });
});
