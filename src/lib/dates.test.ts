import { describe, it, expect, vi, afterEach } from 'vitest';
import { isBursaryOpen, formatClosingDate } from './dates';

describe('isBursaryOpen', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns true for a closing date in the future', () => {
    vi.setSystemTime(new Date('2026-08-22'));
    expect(isBursaryOpen('2026-09-30')).toBe(true);
  });

  it('returns false for a closing date in the past', () => {
    vi.setSystemTime(new Date('2026-08-22'));
    expect(isBursaryOpen('2026-01-15')).toBe(false);
  });

  it('returns true when the closing date is today', () => {
    vi.setSystemTime(new Date('2026-08-22T15:30:00'));
    expect(isBursaryOpen('2026-08-22')).toBe(true);
  });

  it('returns false for a date that closed yesterday', () => {
    vi.setSystemTime(new Date('2026-08-22'));
    expect(isBursaryOpen('2026-08-21')).toBe(false);
  });
});

describe('formatClosingDate', () => {
  it('formats an ISO date into a readable South African format', () => {
    const formatted = formatClosingDate('2026-09-30');
    expect(formatted).toContain('2026');
    expect(formatted).toContain('30');
  });
});