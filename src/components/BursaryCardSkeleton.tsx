export function BursaryCardSkeleton() {
  return (
    <li className="flex h-[280px] animate-pulse flex-col rounded-xl border border-greige-300 bg-nude-50 p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="h-5 w-16 rounded-full bg-greige-200" />
        <div className="h-8 w-16 rounded-md bg-greige-200" />
      </div>
      <div className="h-5 w-3/4 rounded bg-greige-200" />
      <div className="mt-2 h-4 w-1/2 rounded bg-greige-200" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full rounded bg-greige-200" />
        <div className="h-3 w-full rounded bg-greige-200" />
        <div className="h-3 w-2/3 rounded bg-greige-200" />
      </div>
      <div className="mt-4 h-4 w-24 rounded bg-greige-200" />
    </li>
  );
}