import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from './error';

describe('Error boundary', () => {
  it('calls reset() when "Try again" is clicked', async () => {
    const user = userEvent.setup();
    const reset = vi.fn();
    const simulatedError = new Error('Simulated failure') as Error & {
      digest?: string;
    };

    render(<ErrorBoundary error={simulatedError} reset={reset} />);

    const retryButton = screen.getByRole('button', { name: /try again/i });
    await user.click(retryButton);

    expect(reset).toHaveBeenCalledTimes(1);
  });

  it('provides a link back to search', () => {
    const reset = vi.fn();
    const simulatedError = new Error('Simulated failure') as Error & {
      digest?: string;
    };

    render(<ErrorBoundary error={simulatedError} reset={reset} />);

    const backLink = screen.getByRole('link', { name: /back to search/i });
    expect(backLink).toHaveAttribute('href', '/');
  });
});