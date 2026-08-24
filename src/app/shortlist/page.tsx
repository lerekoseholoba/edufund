'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

// Lazy-loaded: this component's JS chunk is only fetched when a user
// actually navigates to /shortlist, instead of being bundled into
// every route's initial load.
const ShortlistContent = dynamic(
  () =>
    import('../../components/ShortlistContent').then(
      (mod) => mod.ShortlistContent
    ),
  {
    loading: () => <p className="text-gray-500">Loading shortlist...</p>,
  }
);

export default function ShortlistPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-gray-900">
            Your Shortlist
          </h1>
          <p className="text-gray-600">
            Bursaries you&apos;ve saved for later.
          </p>
        </div>
        <Link
          href="/"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to search
        </Link>
      </div>

      <ShortlistContent />
    </main>
  );
}