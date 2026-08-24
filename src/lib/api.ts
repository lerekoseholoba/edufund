import { bursaries } from '../data/bursaries';
import { Bursary, BursaryFilters } from '../types/bursary';

const PAGE_SIZE = 6;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface BursaryResponse {
  results: Bursary[];
  total: number;
  page: number;
  totalPages: number;
}

export async function fetchBursaries(
  filters: BursaryFilters
): Promise<BursaryResponse> {
  await delay(150);
  
  let filtered = [...bursaries];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.provider.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
    );
  }

  if (filters.province) {
    filtered = filtered.filter((b) =>
      b.provinces.includes(filters.province!)
    );
  }

  if (filters.fieldOfStudy) {
    filtered = filtered.filter((b) =>
      b.fieldsOfStudy.includes(filters.fieldOfStudy!)
    );
  }

  if (filters.incomeBracket) {
    filtered = filtered.filter((b) =>
      b.incomeBracket.includes(filters.incomeBracket!)
    );
  }

  if (filters.fundingType) {
    filtered = filtered.filter((b) => b.fundingType === filters.fundingType);
  }

  if (filters.studyLevel) {
    filtered = filtered.filter(
      (b) => b.studyLevel === filters.studyLevel || b.studyLevel === 'Both'
    );
  }

  const total = filtered.length;
  const page = filters.page ?? 1;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  return {
    results: paginated,
    total,
    page,
    totalPages,
  };
}

export async function fetchBursaryById(id: string): Promise<Bursary | null> {
  await delay(150);
  return bursaries.find((b) => b.id === id) ?? null;
}

export async function fetchBursariesByIds(ids: string[]): Promise<Bursary[]> {
  await delay(150);
  return bursaries.filter((b) => ids.includes(b.id));
}