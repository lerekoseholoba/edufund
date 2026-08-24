import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterSidebar } from './FilterSidebar';

const defaultProps = {
  province: '',
  fieldOfStudy: '',
  incomeBracket: '',
  fundingType: '',
  studyLevel: '',
  onChange: vi.fn(),
  onClear: vi.fn(),
};

describe('FilterSidebar', () => {
  it('renders all five filter dropdowns', () => {
    render(<FilterSidebar {...defaultProps} />);
    expect(screen.getAllByRole('combobox')).toHaveLength(5);
  });

  it('does not show "Clear all" when no filters are active', () => {
    render(<FilterSidebar {...defaultProps} />);
    expect(screen.queryByText('Clear all')).not.toBeInTheDocument();
  });

  it('shows "Clear all" when at least one filter is active', () => {
    render(<FilterSidebar {...defaultProps} province="Gauteng" />);
    expect(screen.getByText('Clear all')).toBeInTheDocument();
  });

  it('calls onClear when "Clear all" is clicked', () => {
    const onClear = vi.fn();
    render(<FilterSidebar {...defaultProps} province="Gauteng" onClear={onClear} />);

    screen.getByText('Clear all').click();

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('reflects the current value in each select', () => {
    render(
      <FilterSidebar
        {...defaultProps}
        province="Gauteng"
        fieldOfStudy="Engineering"
      />
    );

    const provinceSelect = screen.getByLabelText('Province') as HTMLSelectElement;
    const fieldSelect = screen.getByLabelText('Field of Study') as HTMLSelectElement;

    expect(provinceSelect.value).toBe('Gauteng');
    expect(fieldSelect.value).toBe('Engineering');
  });

  it('calls onChange with the correct key when a dropdown changes', () => {
    const onChange = vi.fn();
    render(<FilterSidebar {...defaultProps} onChange={onChange} />);

    const provinceSelect = screen.getByLabelText('Province');
    // "Gauteng" must exist as an option in your PROVINCES constant for this to work —
    // swap for a real value from your constants file if different
    fireEvent.change(provinceSelect, { target: { value: 'Gauteng' } });

    expect(onChange).toHaveBeenCalledWith({ province: 'Gauteng' });
  });
});