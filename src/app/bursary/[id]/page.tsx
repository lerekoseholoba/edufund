'use client';

import { use } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchBursaryById } from '../../../lib/api';
import { ShortlistButton } from '../../../components/ShortlistButton';
import { StatusBadge } from '../../../components/StatusBadge';
import { BursaryDetailSkeleton } from '../../../components/BursaryDetailSkeleton';

interface BursaryDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function BursaryDetailPage({ params }: BursaryDetailPageProps) {
  const { id } = use(params);

  const { data: bursary, isLoading, isError } = useQuery({
    queryKey: ['bursary', id],
    queryFn: () => fetchBursaryById(id),
  });

  if (isLoading) {
    return <BursaryDetailSkeleton />;
  }

  if (isError || !bursary) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <p className="text-red-600">
          We couldn&apos;t find that bursary. It may have been removed.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm font-medium text-brown-600 hover:underline"
        >
          ← Back to search
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href="/"
        className="mb-6 inline-block text-sm font-medium text-brown-600 hover:underline"
      >
        ← Back to search
      </Link>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-800">{bursary.title}</h1>
          <p className="mt-1 text-ink-500">
            {bursary.provider} · {bursary.fundingType}
          </p>
          <div className="mt-3">
            <StatusBadge closingDate={bursary.closingDate} />
          </div>
        </div>
        <ShortlistButton bursaryId={bursary.id} />
      </div>

      <div className="mb-8">
        <a
          href={bursary.applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 rounded-full bg-ink-800 px-6 py-3 text-sm font-medium tracking-wide text-nude-50 transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:shadow-lg"
        >
          Apply on {bursary.provider}&apos;s website
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </a>
        <p className="mt-2 text-xs text-ink-500">
          You&apos;ll be taken to {bursary.provider}&apos;s official
          application page to complete and submit your application.
        </p>
      </div>

      <Section title="About this bursary">
        <p className="text-ink-500">{bursary.description}</p>
      </Section>

      <Section title="Funding amount & benefits">
        <ul className="list-disc space-y-1 pl-5 text-ink-500">
          {bursary.benefits.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </Section>

      <Section title="Eligibility">
        <ul className="list-disc space-y-1 pl-5 text-ink-500">
          <li>Minimum academic requirement: {bursary.minimumAverage}</li>
          {bursary.requirements.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
          <li>Eligible provinces: {bursary.provinces.join(', ')}</li>
          <li>Household income bracket: {bursary.incomeBracket.join(' or ')}</li>
          <li>Study level: {bursary.studyLevel}</li>
        </ul>
      </Section>

      <Section title="Work-back obligation">
        <p className="text-ink-500">{bursary.workBackObligation}</p>
      </Section>

      <Section title="Documents you'll need to submit">
        <ul className="list-disc space-y-1 pl-5 text-ink-500">
          {bursary.requiredDocuments.map((doc, i) => (
            <li key={i}>{doc}</li>
          ))}
        </ul>
      </Section>

      <Section title="Closing date">
        <p className="text-ink-500">
          {new Date(bursary.closingDate).toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </Section>

      <Section title="Contact">
        <p className="text-ink-500">
          {bursary.contactPerson} — {bursary.contactEmail}
        </p>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 border-t border-greige-300 pt-6 first:border-t-0 first:pt-0">
      <h2 className="mb-2 text-lg font-semibold text-ink-800">{title}</h2>
      {children}
    </div>
  );
}