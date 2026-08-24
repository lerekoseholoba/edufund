'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchBursaries } from '../lib/api';
import { BursaryFilters } from '../types/bursary';

export function useBursaries(filters: BursaryFilters) {
  return useQuery({
    // The query key must include every filter value that affects the result.
    // TanStack Query treats a changed key as a new query — this is what
    // triggers automatic refetching when any filter changes.
    queryKey: ['bursaries', filters],
    queryFn: () => fetchBursaries(filters),
    // Keeps showing the previous page's data while the new one loads,
    // instead of flashing a loading state on every filter change —
    // much better UX for a filter-heavy interface.
    placeholderData: keepPreviousData,
  });
}