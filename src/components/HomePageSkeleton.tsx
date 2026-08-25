import { BursaryCardSkeleton } from '../components/BursaryCardSkeleton';

export function HomePageSkeleton() {
  return (
    <>
      <section className="border-b border-greige-300 bg-nude-50">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="max-w-2xl animate-pulse">
            <div className="h-4 w-40 rounded bg-greige-200" />
            <div className="mt-3 h-10 w-full rounded bg-greige-200" />
            <div className="mt-2 h-10 w-2/3 rounded bg-greige-200" />
            <div className="mt-4 h-4 w-full rounded bg-greige-200" />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 h-10 animate-pulse rounded-md bg-greige-200" />

        <div className="flex flex-col gap-8 md:flex-row">
          <aside className="w-full shrink-0 animate-pulse space-y-6 rounded-xl border border-greige-300 bg-nude-50 p-5 md:w-64">
            <div className="h-5 w-16 rounded bg-greige-200" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}>
                <div className="mb-1.5 h-3 w-20 rounded bg-greige-200" />
                <div className="h-9 w-full rounded bg-greige-200" />
              </div>
            ))}
          </aside>

          <div className="flex-1">
            <div className="mb-4 h-4 w-32 animate-pulse rounded bg-greige-200" />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <BursaryCardSkeleton key={i} />
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}