import { describe, it, expect } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { NuqsTestingAdapter, type OnUrlUpdateFunction } from 'nuqs/adapters/testing';
import { useBursaryFilters } from './useBursaryFilters';

function setup(searchParams = '') {
  let latestSearchParams: URLSearchParams = new URLSearchParams(searchParams);
  const onUrlUpdate: OnUrlUpdateFunction = (event) => {
    latestSearchParams = event.searchParams;
  };

  const { result, rerender } = renderHook(() => useBursaryFilters(), {
    wrapper: ({ children }) => (
      <NuqsTestingAdapter searchParams={searchParams} onUrlUpdate={onUrlUpdate}>
        {children}
      </NuqsTestingAdapter>
    ),
  });

  return {
    result,
    rerender,
    getUrlParams: () => latestSearchParams,
  };
}

describe('useBursaryFilters', () => {
  it('defaults to empty filters and page 1 when the URL has no params', () => {
    const { result } = setup();

    expect(result.current.filters).toEqual({
      search: '',
      province: '',
      fieldOfStudy: '',
      incomeBracket: '',
      fundingType: '',
      studyLevel: '',
      page: 1,
    });
  });

  it('reads initial filter values from the URL', () => {
    const { result } = setup('?province=Gauteng&fieldOfStudy=Engineering&page=2');

    expect(result.current.filters.province).toBe('Gauteng');
    expect(result.current.filters.fieldOfStudy).toBe('Engineering');
    expect(result.current.filters.page).toBe(2);
  });

  it('setFilter updates the given key and resets page to 1', () => {
    const { result } = setup('?page=3');

    act(() => {
      result.current.setFilter({ province: 'Western Cape' });
    });

    expect(result.current.filters.province).toBe('Western Cape');
    expect(result.current.filters.page).toBe(1);
  });

  it('setFilter writes the change into the URL search params', async () => {
    const { result, getUrlParams } = setup();

    act(() => {
      result.current.setFilter({ fieldOfStudy: 'Law' });
    });

    await waitFor(() => {
      expect(getUrlParams().get('fieldOfStudy')).toBe('Law');
    });
  });

  it('setPage updates only the page, leaving other filters untouched', () => {
    const { result } = setup('?province=Gauteng');

    act(() => {
      result.current.setPage(3);
    });

    expect(result.current.filters.page).toBe(3);
    expect(result.current.filters.province).toBe('Gauteng');
  });

  it('clearFilters resets every field back to its default', () => {
    const { result } = setup(
      '?search=bursary&province=Gauteng&fieldOfStudy=Law&incomeBracket=Under+R150%2C000&fundingType=NSFAS&studyLevel=Postgraduate&page=4'
    );

    act(() => {
      result.current.clearFilters();
    });

    expect(result.current.filters).toEqual({
      search: '',
      province: '',
      fieldOfStudy: '',
      incomeBracket: '',
      fundingType: '',
      studyLevel: '',
      page: 1,
    });
  });

  it('clearFilters removes the params from the URL entirely (clearOnDefault behavior)', async () => {
    const { result, getUrlParams } = setup('?province=Gauteng&page=2');

    act(() => {
      result.current.clearFilters();
    });

    await waitFor(() => {
      expect(getUrlParams().has('province')).toBe(false);
      expect(getUrlParams().has('page')).toBe(false);
    });
  });

  it('setting an empty string for a filter removes it from the URL (clearOnDefault)', async () => {
    const { result, getUrlParams } = setup('?province=Gauteng');

    act(() => {
      result.current.setFilter({ province: '' });
    });

    await waitFor(() => {
      expect(getUrlParams().has('province')).toBe(false);
    });
  });
});