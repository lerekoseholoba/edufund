'use client';

import { Suspense } from 'react';
import { useBursaryFilters } from '../hooks/useBursaryFilters';
import { useBursaries } from '../hooks/useBursaries';
import { SearchInput } from '../components/SearchInput';
import { FilterSidebar } from '../components/FilterSidebar';
import { BursaryCard } from '../components/BursaryCard';
import { BursaryCardSkeleton } from '../components/BursaryCardSkeleton';
import { HomePageSkeleton } from '../components/HomePageSkeleton';
import { Hero } from '../components/Hero';
import {
  Bursary,
  FieldOfStudy,
  Province,
  IncomeBracket,
  StudyLevel,
} from '../types/bursary';

export function HomeContent() {
  const { filters, setFilter, setPage, clearFilters } = useBursaryFilters();

  const apiFilters = {
    search: filters.search || undefined,
    province: (filters.province || undefined) as Province | undefined,
    fieldOfStudy: (filters.fieldOfStudy || undefined) as
      | FieldOfStudy
      | undefined,
    incomeBracket: (filters.incomeBracket || undefined) as
      | IncomeBracket
      | undefined,
    fundingType: (filters.fundingType || undefined) as
      | Bursary['fundingType']
      | undefined,
    studyLevel: (filters.studyLevel || undefined) as StudyLevel | undefined,
    page: filters.page,
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useBursaries(apiFilters);

  return (
    <>
      <Hero totalCount={data?.total} />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6">
          <SearchInput
            initialValue={filters.search}
            onSearch={(value) => setFilter({ search: value })}
          />
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          <FilterSidebar
            province={filters.province}
            fieldOfStudy={filters.fieldOfStudy}
            incomeBracket={filters.incomeBracket}
            fundingType={filters.fundingType}
            studyLevel={filters.studyLevel}
            onChange={(partial) => setFilter(partial)}
            onClear={clearFilters}
          />

          <div className="flex-1">
            <p className="mb-4 text-sm text-ink-500">
              {isLoading
                ? 'Loading bursaries...'
                : `${data?.total ?? 0} bursaries found`}
              {isFetching && !isLoading && ' — updating...'}
            </p>

            {isError && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                <p className="text-red-700">
                  Something went wrong loading bursaries.
                </p>
                <button
                  onClick={() => refetch()}
                  className="mt-3 rounded-full border border-red-300 px-4 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
                >
                  Try again
                </button>
              </div>
            )}

            {!isLoading && !isError && data?.results.length === 0 && (
              <div className="rounded-xl border border-dashed border-greige-300 bg-nude-50 p-10 text-center text-ink-500">
                No bursaries match your current filters. Try widening your
                search or clearing a filter.
              </div>
            )}

            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <BursaryCardSkeleton key={i} />
                  ))
                : data?.results.map((b) => (
                    <BursaryCard key={b.id} bursary={b} />
                  ))}
            </ul>

            {data && data.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  disabled={filters.page <= 1}
                  onClick={() => setPage(filters.page - 1)}
                  className="rounded-md border border-greige-400 px-3 py-1.5 text-sm text-ink-800 hover:border-brown-600 hover:text-brown-600 disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="text-sm text-ink-500">
                  Page {data.page} of {data.totalPages}
                </span>
                <button
                  disabled={filters.page >= data.totalPages}
                  onClick={() => setPage(filters.page + 1)}
                  className="rounded-md border border-greige-400 px-3 py-1.5 text-sm text-ink-800 hover:border-brown-600 hover:text-brown-600 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}