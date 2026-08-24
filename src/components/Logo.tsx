export function Logo() {
  return (
    <span className="inline-flex items-center gap-2 text-nude-50">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M12 3L2 8l10 5 8-4v5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 10.5v4c0 1.4 2.7 2.8 6 2.8s6-1.4 6-2.8v-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        style={{ fontFamily: 'var(--font-logo), serif' }}
        className="text-xl italic"
      >
        EduFund
      </span>
    </span>
  );
}