'use client';

import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface SearchInputProps {
  initialValue: string;
  onSearch: (value: string) => void;
}

export function SearchInput({ initialValue, onSearch }: SearchInputProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const debouncedSearch = useDebouncedCallback((val: string) => {
    onSearch(val);
  }, 400);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        debouncedSearch(e.target.value);
      }}
      placeholder="Search bursaries by title, provider, or keyword..."
      className="w-full rounded-md border border-greige-300 bg-nude-50 px-4 py-2 text-sm text-ink-800 placeholder:text-ink-500/60 focus:outline-none focus:ring-2 focus:ring-brown-500"
    />
  );
}