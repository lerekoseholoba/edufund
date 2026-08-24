'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In a real deployment this is where you'd send the error to a
    // monitoring service (Sentry, etc). For now, log it for debugging.
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
      <p className="font-display text-sm uppercase tracking-[0.2em] text-brown-600">
        Something went wrong
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink-800">
        We hit a snag loading this page.
      </h1>
      <p className="mt-3 max-w-md text-ink-500">
        This is on us, not you. Try again, or head back to search for
        bursaries.
      </p>
      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={reset}
          className="rounded-full bg-ink-800 px-6 py-3 text-sm font-medium text-nude-50 transition-colors hover:bg-black"
        >
          Try again
        </button>
        <Link
          href="/"
          className="text-sm font-medium text-brown-600 hover:underline"
        >
          Back to search
        </Link>
      </div>
    </main>
  );
}