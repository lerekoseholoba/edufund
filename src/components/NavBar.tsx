'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShortlistStore } from '../store/useShortlistStore';
import { Logo } from '../components/Logo';

export function Navbar() {
  const pathname = usePathname();
  const shortlistCount = useShortlistStore(
    (state) => state.shortlistedIds.length
  );

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      pathname === href
        ? 'text-nude-50'
        : 'text-nude-100/60 hover:text-nude-50'
    }`;

  return (
    <header className="border-b border-brown-700 bg-brown-900">
      <div className="mx-auto flex max-w-6xl items-center gap-8 px-6 py-4">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className={linkClass('/')}>
            Home
          </Link>
          <Link href="/shortlist" className={linkClass('/shortlist')}>
            Shortlisted
            {shortlistCount > 0 && (
              <span className="ml-1.5 rounded-full bg-nude-100 px-1.5 py-0.5 text-xs font-semibold text-brown-900">
                {shortlistCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}