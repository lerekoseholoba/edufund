export function BursaryDetailSkeleton() {
  return (
    <main className="mx-auto max-w-3xl animate-pulse px-6 py-10">
      <div className="mb-6 h-4 w-24 rounded bg-greige-200" />
      <div className="h-8 w-3/4 rounded bg-greige-200" />
      <div className="mt-2 h-4 w-1/2 rounded bg-greige-200" />
      <div className="mt-8 h-10 w-48 rounded-full bg-greige-200" />
      <div className="mt-10 space-y-3">
        <div className="h-4 w-full rounded bg-greige-200" />
        <div className="h-4 w-full rounded bg-greige-200" />
        <div className="h-4 w-2/3 rounded bg-greige-200" />
      </div>
    </main>
  );
}