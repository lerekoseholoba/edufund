import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';

import { Bursary } from '../types/bursary';
import { ShortlistButton } from '../components/ShortlistButton';
import { StatusBadge } from '../components/StatusBadge';
import { fetchBursaryById } from '../lib/api';

interface BursaryCardProps {
  bursary: Bursary;
}

export function BursaryCard({ bursary }: BursaryCardProps) {
  const queryClient = useQueryClient();

  const prefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ['bursary', bursary.id],
      queryFn: () => fetchBursaryById(bursary.id),
    });
  };

  return (
    <li className="group relative flex h-[320px] flex-col rounded-xl border border-greige-300 bg-nude-50 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <StatusBadge closingDate={bursary.closingDate} />

        <ShortlistButton bursaryId={bursary.id} />
      </div>

      <Link
        href={`/bursary/${bursary.id}`}
        className="flex flex-1 flex-col"
        onMouseEnter={prefetch}
        onFocus={prefetch}
      >
        <h3 className="line-clamp-2 font-display text-lg font-semibold text-ink-800 transition-colors group-hover:text-brown-700">
          {bursary.title}
        </h3>

        <p className="mt-1 text-sm font-medium text-brown-600">
          {bursary.provider} · {bursary.fundingType}
        </p>

        <p className="mt-3 line-clamp-3 flex-1 text-sm text-ink-500">
          {bursary.description}
        </p>

        <span className="mt-4 inline-flex items-center text-sm font-medium text-brown-700">
          View details →
        </span>
      </Link>
    </li>
  );
}