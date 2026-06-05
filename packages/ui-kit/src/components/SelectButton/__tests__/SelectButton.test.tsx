import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { SelectButton, SelectButtonProps, SelectButtonLightTheme } from '..';

const renderSelectButton = (props: Partial<SelectButtonProps>) => {
  const handleToggle = jest.fn();

  return render(
    <SelectButton
      role="selectButton"
      theme={SelectButtonLightTheme}
      onToggle={handleToggle}
      {...props}
    />
  );
};

describe('SelectButton', () => {
  it('should be defined', () => {
    expect(renderSelectButton({})).toBeDefined();
  });

  it('should render as a select button element', () => {
    renderSelectButton({});

    expect(screen.getByRole('selectButton')).toBeInTheDocument();
  });

  it('should call onToggle when clicked', () => {
    const onToggle = jest.fn();

    renderSelectButton({ onToggle });

    const button = screen.getByRole('selectButton');

    fireEvent.click(button);
    expect(onToggle).toHaveBeenCalledTimes(1);

    fireEvent.click(button);
    expect(onToggle).toHaveBeenCalledTimes(2);
  });

  it('should handle keyboard events correctly (Enter and Space)', () => {
    const onToggle = jest.fn();

    renderSelectButton({ onToggle });

    const button = screen.getByRole('selectButton');

    fireEvent.keyDown(button, { code: 'Enter' });
    expect(onToggle).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(button, { code: 'Space' });
    expect(onToggle).toHaveBeenCalledTimes(2);
  });

  it('should not toggle on other keyboard events', () => {
    const onToggle = jest.fn();

    renderSelectButton({ onToggle });

    const button = screen.getByRole('selectButton');

    fireEvent.keyDown(button, { code: 'ArrowDown' });
    expect(onToggle).toHaveBeenCalledTimes(0);
  });
});
