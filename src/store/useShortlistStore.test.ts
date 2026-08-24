import { describe, it, expect, beforeEach } from 'vitest';
import { useShortlistStore } from './useShortlistStore';

// helper to reset the store to its initial state between tests
const resetStore = () => {
  useShortlistStore.setState({ shortlistedIds: [] });
};

describe('useShortlistStore', () => {
  beforeEach(() => {
    resetStore();
    localStorage.clear();
  });

  it('starts with an empty shortlist', () => {
    expect(useShortlistStore.getState().shortlistedIds).toEqual([]);
  });

  it('adds an id when toggled on an item not yet shortlisted', () => {
    useShortlistStore.getState().toggleShortlist('bursary-1');
    expect(useShortlistStore.getState().shortlistedIds).toEqual(['bursary-1']);
  });

  it('removes an id when toggled on an item already shortlisted', () => {
    useShortlistStore.getState().toggleShortlist('bursary-1');
    useShortlistStore.getState().toggleShortlist('bursary-1');
    expect(useShortlistStore.getState().shortlistedIds).toEqual([]);
  });

  it('handles multiple different ids independently', () => {
    const { toggleShortlist } = useShortlistStore.getState();
    toggleShortlist('bursary-1');
    toggleShortlist('bursary-2');
    toggleShortlist('bursary-3');

    expect(useShortlistStore.getState().shortlistedIds).toEqual([
      'bursary-1',
      'bursary-2',
      'bursary-3',
    ]);

    toggleShortlist('bursary-2'); // remove the middle one
    expect(useShortlistStore.getState().shortlistedIds).toEqual([
      'bursary-1',
      'bursary-3',
    ]);
  });

  it('isShortlisted returns true for a shortlisted id and false otherwise', () => {
    useShortlistStore.getState().toggleShortlist('bursary-1');

    expect(useShortlistStore.getState().isShortlisted('bursary-1')).toBe(true);
    expect(useShortlistStore.getState().isShortlisted('bursary-999')).toBe(false);
  });

  it('clearShortlist empties the list regardless of how many items were added', () => {
    const { toggleShortlist, clearShortlist } = useShortlistStore.getState();
    toggleShortlist('bursary-1');
    toggleShortlist('bursary-2');
    toggleShortlist('bursary-3');

    clearShortlist();

    expect(useShortlistStore.getState().shortlistedIds).toEqual([]);
  });

  it('does not mutate the previous array reference on toggle (immutability check)', () => {
    const before = useShortlistStore.getState().shortlistedIds;
    useShortlistStore.getState().toggleShortlist('bursary-1');
    const after = useShortlistStore.getState().shortlistedIds;

    expect(before).not.toBe(after); // different array reference
  });
});