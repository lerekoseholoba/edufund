'use client';

import { useShortlistStore } from '../store/useShortlistStore';

interface ShortlistButtonProps {
  bursaryId: string;
}

export function ShortlistButton({ bursaryId }: ShortlistButtonProps) {
  const isShortlisted = useShortlistStore((state) =>
    state.isShortlisted(bursaryId)
  );
  const toggleShortlist = useShortlistStore((state) => state.toggleShortlist);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggleShortlist(bursaryId);
      }}
      className={`shrink-0 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
        isShortlisted
          ? 'border-brown-600 bg-brown-600 text-nude-50'
          : 'border-greige-400 text-ink-500 hover:border-brown-600 hover:text-brown-600'
      }`}
    >
      {isShortlisted ? '★ Saved' : '☆ Save'}
    </button>
  );
}