export function isBursaryOpen(closingDate: string): boolean {
  const closing = new Date(closingDate);
  const today = new Date();
  // Zero out today's time so a bursary closing "today" still counts as open
  today.setHours(0, 0, 0, 0);
  return closing >= today;
}

export function formatClosingDate(closingDate: string): string {
  return new Date(closingDate).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}