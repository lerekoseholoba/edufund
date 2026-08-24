import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from '../components/SearchInput';

describe('SearchInput', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders with the initial value', () => {
    render(<SearchInput initialValue="engineering" onSearch={vi.fn()} />);
    expect(screen.getByPlaceholderText(/search bursaries/i)).toHaveValue('engineering');
  });

  it('updates the input immediately on typing (no visual lag)', () => {
    render(<SearchInput initialValue="" onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search bursaries/i);

    fireEvent.change(input, { target: { value: 'medicine' } });

    // the visible input updates instantly, even though onSearch is debounced
    expect(input).toHaveValue('medicine');
  });

  it('does NOT call onSearch immediately when typing', () => {
    const onSearch = vi.fn();
    render(<SearchInput initialValue="" onSearch={onSearch} />);
    const input = screen.getByPlaceholderText(/search bursaries/i);

    fireEvent.change(input, { target: { value: 'law' } });

    expect(onSearch).not.toHaveBeenCalled();
  });

  it('calls onSearch after the 400ms debounce delay', () => {
    const onSearch = vi.fn();
    render(<SearchInput initialValue="" onSearch={onSearch} />);
    const input = screen.getByPlaceholderText(/search bursaries/i);

    fireEvent.change(input, { target: { value: 'law' } });

    vi.advanceTimersByTime(399);
    expect(onSearch).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(onSearch).toHaveBeenCalledWith('law');
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('only fires once for rapid successive keystrokes (debounce collapses calls)', () => {
    const onSearch = vi.fn();
    render(<SearchInput initialValue="" onSearch={onSearch} />);
    const input = screen.getByPlaceholderText(/search bursaries/i);

    fireEvent.change(input, { target: { value: 'l' } });
    vi.advanceTimersByTime(200);
    fireEvent.change(input, { target: { value: 'la' } });
    vi.advanceTimersByTime(200);
    fireEvent.change(input, { target: { value: 'law' } });
    vi.advanceTimersByTime(400);

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('law');
  });

  it('syncs its displayed value when initialValue prop changes externally', () => {
    const { rerender } = render(<SearchInput initialValue="a" onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search bursaries/i);
    expect(input).toHaveValue('a');

    rerender(<SearchInput initialValue="b" onSearch={vi.fn()} />);
    expect(input).toHaveValue('b');
  });
});