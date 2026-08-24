import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ShortlistButton } from './ShortlistButton';
import { useShortlistStore } from '../store/useShortlistStore';

const resetStore = () => {
  useShortlistStore.setState({ shortlistedIds: [] });
};

describe('ShortlistButton', () => {
  beforeEach(() => {
    resetStore();
    localStorage.clear();
  });

  it('renders in the unsaved state by default', () => {
    render(<ShortlistButton bursaryId="bursary-1" />);
    expect(screen.getByRole('button')).toHaveTextContent('☆ Save');
  });

  it('renders in the saved state if the bursary is already shortlisted', () => {
    useShortlistStore.getState().toggleShortlist('bursary-1');
    render(<ShortlistButton bursaryId="bursary-1" />);
    expect(screen.getByRole('button')).toHaveTextContent('★ Saved');
  });

  it('toggles to saved state when clicked', () => {
    render(<ShortlistButton bursaryId="bursary-1" />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(button).toHaveTextContent('★ Saved');
    expect(useShortlistStore.getState().isShortlisted('bursary-1')).toBe(true);
  });

  it('toggles back to unsaved state when clicked twice', () => {
    render(<ShortlistButton bursaryId="bursary-1" />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    fireEvent.click(button);

    expect(button).toHaveTextContent('☆ Save');
    expect(useShortlistStore.getState().isShortlisted('bursary-1')).toBe(false);
  });

  it('only affects its own bursaryId, not other shortlisted items', () => {
    useShortlistStore.getState().toggleShortlist('other-bursary');
    render(<ShortlistButton bursaryId="bursary-1" />);

    expect(screen.getByRole('button')).toHaveTextContent('☆ Save');
    expect(useShortlistStore.getState().isShortlisted('other-bursary')).toBe(true);
  });

  it('prevents the default click behavior (guards against navigating away when nested in a Link)', () => {
    render(<ShortlistButton bursaryId="bursary-1" />);
    const button = screen.getByRole('button');

    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

    button.dispatchEvent(clickEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});