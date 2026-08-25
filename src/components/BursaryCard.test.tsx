import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BursaryCard } from './BursaryCard';
import { Bursary } from '../types/bursary';

const mockBursary: Bursary = {
  id: '1',
  title: 'Test Bursary',
  provider: 'Test Provider',
  description: 'A test bursary description.',
  fieldsOfStudy: ['Engineering'],
  provinces: ['Gauteng'],
  incomeBracket: ['Under R150,000'],
  fundingType: 'Corporate',
  closingDate: '2026-12-31',
  amount: 'Full cost of study',
  requirements: ['Matric Maths 70%+'],
  minimumAverage: '70%',
  workBackObligation: 'None',
  requiredDocuments: ['ID document'],
  benefits: ['Full cost of study'],
  contactPerson: 'Admin',
  contactEmail: 'admin@test.co.za',
  applicationUrl: 'https://example.com/apply',
  studyLevel: 'Undergraduate',
};

function renderCard() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const prefetchSpy = vi.spyOn(queryClient, 'prefetchQuery');

  render(
    <QueryClientProvider client={queryClient}>
      <BursaryCard bursary={mockBursary} />
    </QueryClientProvider>
  );

  return { prefetchSpy };
}

describe('BursaryCard', () => {
  it('prefetches the bursary detail on hover', async () => {
    const user = userEvent.setup();
    const { prefetchSpy } = renderCard();

    const link = screen.getByRole('link');
    await user.hover(link);

    expect(prefetchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: ['bursary', '1'] })
    );
  });

  it('prefetches the bursary detail on keyboard focus', async () => {
    const user = userEvent.setup();
    const { prefetchSpy } = renderCard();

    // The Save button sits before the Link in tab order (it's rendered
    // first in the card), so it takes two Tab presses to reach the link.
    await user.tab(); // focuses the Save button
    await user.tab(); // focuses the Link

    expect(prefetchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: ['bursary', '1'] })
    );
  });

  it('links to the correct detail page', () => {
    renderCard();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/bursary/1');
  });
});