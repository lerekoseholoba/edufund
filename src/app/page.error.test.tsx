import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsTestingAdapter } from 'nuqs/adapters/testing';
import { HomeContent } from './page';
import * as api from '../lib/api';

const WAIT_TIMEOUT = 10000;

function renderHome() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <NuqsTestingAdapter>
      <QueryClientProvider client={queryClient}>
        <HomeContent />
      </QueryClientProvider>
    </NuqsTestingAdapter>
  );
}

describe('Home page — error state', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows an error message and retry button when the API call fails', async () => {
    vi.spyOn(api, 'fetchBursaries').mockRejectedValue(
      new Error('Simulated failure')
    );

    renderHome();

    await waitFor(
      () => {
        expect(
          screen.getByText(/something went wrong loading bursaries/i)
        ).toBeInTheDocument();
      },
      { timeout: WAIT_TIMEOUT }
    );

    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
  });

  it('calling retry re-invokes fetchBursaries', async () => {
    const fetchSpy = vi
      .spyOn(api, 'fetchBursaries')
      .mockRejectedValue(new Error('Simulated failure'));

    const user = userEvent.setup();
    renderHome();

    await waitFor(
      () => {
        expect(
          screen.getByRole('button', { name: /try again/i })
        ).toBeInTheDocument();
      },
      { timeout: WAIT_TIMEOUT }
    );

    const callCountBeforeRetry = fetchSpy.mock.calls.length;
    await user.click(screen.getByRole('button', { name: /try again/i }));

    await waitFor(
      () => {
        expect(fetchSpy.mock.calls.length).toBeGreaterThan(
          callCountBeforeRetry
        );
      },
      { timeout: WAIT_TIMEOUT }
    );
  });
});