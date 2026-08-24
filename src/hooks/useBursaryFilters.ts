'use client';

import {
  parseAsString,
  parseAsInteger,
  useQueryStates,
} from 'nuqs';

const filterParsers = {
  search: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  province: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  fieldOfStudy: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  incomeBracket: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  fundingType: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  studyLevel: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  page: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
};

export function useBursaryFilters() {
  const [filters, setFilters] = useQueryStates(filterParsers, {
    shallow: true,
  });

  function setFilter(
    partial: Partial<Omit<typeof filters, 'page'>>
  ) {
    setFilters({ ...partial, page: 1 });
  }

  function setPage(page: number) {
    setFilters({ page });
  }

  function clearFilters() {
    setFilters({
      search: '',
      province: '',
      fieldOfStudy: '',
      incomeBracket: '',
      fundingType: '',
      studyLevel: '',
      page: 1,
    });
  }

  return { filters, setFilter, setPage, clearFilters };
}