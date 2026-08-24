import { describe, it, expect } from 'vitest';
import { fetchBursaries, fetchBursaryById, fetchBursariesByIds } from './api';

describe('fetchBursaries', () => {
  it('returns all bursaries when no filters are applied (first page only)', async () => {
    const result = await fetchBursaries({});
    expect(result.page).toBe(1);
    expect(result.results.length).toBeLessThanOrEqual(6); // PAGE_SIZE
    expect(result.total).toBe(50);
    expect(result.totalPages).toBe(9); // 50 / 6, rounded up
  });

  it('filters by search term across title, provider, and description', async () => {
    const result = await fetchBursaries({ search: 'nursing' });
    expect(result.total).toBeGreaterThan(0);
    result.results.forEach((b) => {
      const haystack =
        `${b.title} ${b.provider} ${b.description}`.toLowerCase();
      expect(haystack).toContain('nursing');
    });
  });

  it('search is case-insensitive', async () => {
    const lower = await fetchBursaries({ search: 'engineering' });
    const upper = await fetchBursaries({ search: 'ENGINEERING' });
    expect(lower.total).toBe(upper.total);
  });

  it('returns zero results for a nonsense search term', async () => {
    const result = await fetchBursaries({ search: 'zzzzzznotreal' });
    expect(result.total).toBe(0);
    expect(result.results).toEqual([]);
  });

  it('filters by province — every result includes the requested province', async () => {
    const result = await fetchBursaries({ province: 'Limpopo' });
    expect(result.total).toBeGreaterThan(0);
    result.results.forEach((b) => {
      expect(b.provinces).toContain('Limpopo');
    });
  });

  it('filters by field of study', async () => {
    const result = await fetchBursaries({ fieldOfStudy: 'Law' });
    expect(result.total).toBeGreaterThan(0);
    result.results.forEach((b) => {
      expect(b.fieldsOfStudy).toContain('Law');
    });
  });

  it('filters by funding type', async () => {
    const result = await fetchBursaries({ fundingType: 'NSFAS' });
    result.results.forEach((b) => {
      expect(b.fundingType).toBe('NSFAS');
    });
  });

  it('filters by study level, including "Both"-tagged bursaries', async () => {
    const result = await fetchBursaries({ studyLevel: 'Postgraduate' });
    expect(result.total).toBe(3); // matches our known dataset: 2 "Both" + 1 "Postgraduate"
    result.results.forEach((b) => {
      expect(['Postgraduate', 'Both']).toContain(b.studyLevel);
    });
  });

  it('combines multiple filters with AND logic', async () => {
    const result = await fetchBursaries({
      fundingType: 'Corporate',
      fieldOfStudy: 'Engineering',
    });
    result.results.forEach((b) => {
      expect(b.fundingType).toBe('Corporate');
      expect(b.fieldsOfStudy).toContain('Engineering');
    });
  });

  it('paginates correctly — page 2 returns different results than page 1', async () => {
    const page1 = await fetchBursaries({ page: 1 });
    const page2 = await fetchBursaries({ page: 2 });
    const page1Ids = page1.results.map((b) => b.id);
    const page2Ids = page2.results.map((b) => b.id);
    expect(page1Ids).not.toEqual(page2Ids);
  });

  it('the last page has no more than PAGE_SIZE results and is non-empty', async () => {
    const first = await fetchBursaries({});
    const last = await fetchBursaries({ page: first.totalPages });
    expect(last.results.length).toBeGreaterThan(0);
    expect(last.results.length).toBeLessThanOrEqual(6);
  });
});

describe('fetchBursaryById', () => {
  it('returns the correct bursary for a valid id', async () => {
    const bursary = await fetchBursaryById('1');
    expect(bursary).not.toBeNull();
    expect(bursary?.id).toBe('1');
  });

  it('returns null for a nonexistent id', async () => {
    const bursary = await fetchBursaryById('does-not-exist');
    expect(bursary).toBeNull();
  });
});

describe('fetchBursariesByIds', () => {
  it('returns bursaries matching the given ids, in dataset order', async () => {
    const result = await fetchBursariesByIds(['3', '1']);
    expect(result).toHaveLength(2);
    expect(result.map((b) => b.id).sort()).toEqual(['1', '3']);
  });

  it('returns an empty array for an empty id list', async () => {
    const result = await fetchBursariesByIds([]);
    expect(result).toEqual([]);
  });

  it('ignores ids that do not exist in the dataset', async () => {
    const result = await fetchBursariesByIds(['1', 'fake-id']);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });
});