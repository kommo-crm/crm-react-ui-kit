import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Switcher } from '../Switcher';
import { SwitcherPrimaryTheme } from '../Switcher.themes';
import { SwitcherProps } from '../Switcher.props';

import '@testing-library/jest-dom';

const renderSwitcher = (props: Partial<SwitcherProps>) => {
  const handleMockFn = jest.fn();

  render(
    <Switcher
      isDefaultChecked={false}
      theme={SwitcherPrimaryTheme}
      role="switch"
      onChange={handleMockFn}
      {...props}
    />
  );

  return handleMockFn;
};

describe('Switcher', () => {
  it('should not call onChange function if disabled', async () => {
    const mockFn = renderSwitcher({ isDisabled: true });

    await userEvent.click(screen.getByRole('switch'));

    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should call onChange function if clicked', async () => {
    const mockFn = renderSwitcher({});

    await userEvent.click(screen.getByRole('switch'));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('should be checked initially and toggle state if clicked', async () => {
    const mockFn = renderSwitcher({ isDefaultChecked: true });

    const checkbox = screen.getByRole('switch');

    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);

    expect(mockFn).toHaveBeenCalled();
    expect(checkbox).not.toBeChecked();
  });
});
