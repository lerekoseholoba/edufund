'use client';

import Link from 'next/link';
import { useShortlistStore } from '../store/useShortlistStore';
import { useShortlistedBursaries } from '../hooks/useShortlistedBursaries';
import { ShortlistButton } from '../components/ShortlistButton';
import { StatusBadge } from '../components/StatusBadge';

export function ShortlistContent() {
  const shortlistedIds = useShortlistStore((state) => state.shortlistedIds);
  const { data, isLoading, isError } = useShortlistedBursaries(shortlistedIds);

  return (
    <>
      {shortlistedIds.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-gray-500">
          You haven&apos;t saved any bursaries yet. Head back to{' '}
          <Link href="/" className="text-blue-600 hover:underline">
            search
          </Link>{' '}
          and click &quot;Save&quot; on ones you&apos;re interested in.
        </div>
      )}

      {isLoading && shortlistedIds.length > 0 && (
        <p className="text-gray-500">Loading your saved bursaries...</p>
      )}

      {isError && (
        <p className="text-red-600">
          Something went wrong loading your shortlist.
        </p>
      )}

      <ul className="space-y-3">
        {data?.map((b) => (
          <li
            key={b.id}
            className="rounded-lg border border-gray-200 p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <Link href={`/bursary/${b.id}`} className="flex-1">
                <h3 className="font-semibold text-gray-900 hover:text-blue-600">
                  {b.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {b.provider} · {b.fundingType}
                </p>
                <p className="mt-1 text-sm text-gray-700">{b.description}</p>
                <div className="mt-2">
                  <StatusBadge closingDate={b.closingDate} />
                </div>
              </Link>
              <ShortlistButton bursaryId={b.id} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}