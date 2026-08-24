import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
      <p className="font-display text-sm uppercase tracking-[0.2em] text-brown-600">
        404
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink-800">
        We couldn&apos;t find that page.
      </h1>
      <p className="mt-3 max-w-md text-ink-500">
        The page you&apos;re looking for doesn&apos;t exist, or may have
        moved. Let&apos;s get you back to finding funding.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-ink-800 px-6 py-3 text-sm font-medium text-nude-50 transition-colors hover:bg-black"
      >
        Back to search
      </Link>
    </main>
  );
}