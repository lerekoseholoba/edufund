'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchBursariesByIds } from '../lib/api';

export function useShortlistedBursaries(ids: string[]) {
  return useQuery({
    // Sorting the ids before using them in the key prevents duplicate cache
    // entries for the same set of ids in a different order.
    queryKey: ['bursaries', 'shortlist', [...ids].sort()],
    queryFn: () => fetchBursariesByIds(ids),
    // No point fetching at all if the shortlist is empty.
    enabled: ids.length > 0,
  });
}