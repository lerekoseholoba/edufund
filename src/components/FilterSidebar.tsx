'use client';

import {
  FIELDS_OF_STUDY,
  PROVINCES,
  INCOME_BRACKETS,
  FUNDING_TYPES,
  STUDY_LEVELS,
} from '../lib/constants';

interface FilterSidebarProps {
  province: string;
  fieldOfStudy: string;
  incomeBracket: string;
  fundingType: string;
  studyLevel: string;
  onChange: (partial: {
    province?: string;
    fieldOfStudy?: string;
    incomeBracket?: string;
    fundingType?: string;
    studyLevel?: string;
  }) => void;
  onClear: () => void;
}

export function FilterSidebar({
  province,
  fieldOfStudy,
  incomeBracket,
  fundingType,
  studyLevel,
  onChange,
  onClear,
}: FilterSidebarProps) {
  const hasActiveFilters =
    province || fieldOfStudy || incomeBracket || fundingType || studyLevel;

  return (
    <aside className="w-full shrink-0 space-y-6 rounded-xl border border-greige-300 bg-nude-50 p-5 md:w-64">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-semibold text-ink-800">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-sm text-brown-600 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <FilterGroup label="Province" htmlFor="province-filter">
        <select
          id="province-filter"
          value={province}
          onChange={(e) => onChange({ province: e.target.value })}
          className="w-full rounded-md border border-greige-300 bg-nude-50 px-3 py-2 text-sm text-ink-800 focus:outline-none focus:ring-2 focus:ring-brown-500"
        >
          <option value="">All Provinces</option>
          {PROVINCES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Field of Study" htmlFor="field-of-study-filter">
        <select
          id="field-of-study-filter"
          value={fieldOfStudy}
          onChange={(e) => onChange({ fieldOfStudy: e.target.value })}
          className="w-full rounded-md border border-greige-300 bg-nude-50 px-3 py-2 text-sm text-ink-800 focus:outline-none focus:ring-2 focus:ring-brown-500"
        >
          <option value="">All Fields</option>
          {FIELDS_OF_STUDY.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Household Income" htmlFor="income-bracket-filter">
        <select
          id="income-bracket-filter"
          value={incomeBracket}
          onChange={(e) => onChange({ incomeBracket: e.target.value })}
          className="w-full rounded-md border border-greige-300 bg-nude-50 px-3 py-2 text-sm text-ink-800 focus:outline-none focus:ring-2 focus:ring-brown-500"
        >
          <option value="">Any Income</option>
          {INCOME_BRACKETS.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Funding Type" htmlFor="funding-type-filter">
        <select
          id="funding-type-filter"
          value={fundingType}
          onChange={(e) => onChange({ fundingType: e.target.value })}
          className="w-full rounded-md border border-greige-300 bg-nude-50 px-3 py-2 text-sm text-ink-800 focus:outline-none focus:ring-2 focus:ring-brown-500"
        >
          <option value="">All Types</option>
          {FUNDING_TYPES.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Study Level" htmlFor="study-level-filter">
        <select
          id="study-level-filter"
          value={studyLevel}
          onChange={(e) => onChange({ studyLevel: e.target.value })}
          className="w-full rounded-md border border-greige-300 bg-nude-50 px-3 py-2 text-sm text-ink-800 focus:outline-none focus:ring-2 focus:ring-brown-500"
        >
          <option value="">Any Level</option>
          {STUDY_LEVELS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-ink-800"
      >
        {label}
      </label>
      {children}
    </div>
  );
}