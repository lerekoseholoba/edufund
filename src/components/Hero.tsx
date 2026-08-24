interface HeroProps {
  totalCount?: number;
}

export function Hero({ totalCount }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-greige-300 bg-nude-50">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, transparent, transparent 27px, var(--color-greige-300) 28px)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-brown-600">
            Bursary &amp; funding portal
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink-800 md:text-5xl">
            Discover Bursaries Built for Your Future.
          </h1>
          <p className="mt-4 max-w-xl text-base text-ink-500">
            Search corporate bursaries, NSFAS, and government funding side by
            side filter by province, field of study, and household income
            to find what you actually qualify for.
          </p>
        </div>
      </div>

      {typeof totalCount === 'number' && (
        <div
          className="absolute right-8 top-10 hidden -rotate-6 rounded-md border-2 border-brown-600 px-4 py-2 text-center md:block"
          aria-hidden="true"
        >
          <p className="font-display text-2xl font-bold text-brown-700">
            {totalCount}
          </p>
          <p className="text-[10px] uppercase tracking-wide text-brown-600">
            Bursaries listed
          </p>
        </div>
      )}
    </section>
  );
}