import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox, CheckboxLightTheme, type CheckboxProps } from '..';

import '@testing-library/jest-dom';

const renderCheckbox = (props: Partial<Omit<CheckboxProps, 'isChecked'>>) => {
  const handleMockFn = jest.fn();

  render(
    <Checkbox
      isDefaultChecked={false}
      theme={CheckboxLightTheme}
      role="checkbox"
      onChange={handleMockFn}
      {...props}
    />
  );

  return handleMockFn;
};

describe('Checkbox', () => {
  it('should not call onChange function if disabled', async () => {
    const mockFn = renderCheckbox({ isDisabled: true });

    await userEvent.click(screen.getByRole('checkbox'));

    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should call onChange function if clicked', async () => {
    const mockFn = renderCheckbox({});

    await userEvent.click(screen.getByRole('checkbox'));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('should be checked initially and toggle state if clicked', async () => {
    const mockFn = renderCheckbox({ isDefaultChecked: true });

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);

    expect(mockFn).toHaveBeenCalled();
    expect(checkbox).not.toBeChecked();
  });
});
