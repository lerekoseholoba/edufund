import { isBursaryOpen, formatClosingDate } from '../lib/dates';

interface StatusBadgeProps {
  closingDate: string;
}

export function StatusBadge({ closingDate }: StatusBadgeProps) {
  const open = isBursaryOpen(closingDate);

  return (
    <div className="flex flex-col gap-1">
      <span
        className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          open ? 'bg-olive-100 text-olive-600' : 'bg-greige-300 text-ink-500'
        }`}
      >
        {open ? 'Open' : 'Closed'}
      </span>
      <span className="text-xs text-ink-500">
        {open ? 'Closes' : 'Closed on'} {formatClosingDate(closingDate)}
      </span>
    </div>
  );
}