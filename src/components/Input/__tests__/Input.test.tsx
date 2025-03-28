import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from '../Input';
import { InputLightTheme } from '../Input.themes';
import { InputProps } from '../Input.props';

import '@testing-library/jest-dom';

const basePlaceholderText = 'Input';

const renderInput = (props: Partial<InputProps>) => {
  const handleMockFn = jest.fn();

  render(
    <Input
      placeholder={basePlaceholderText}
      theme={InputLightTheme}
      onChange={handleMockFn}
      {...props}
    />
  );

  return handleMockFn;
};

describe('Input', () => {
  it('should be defined', () => {
    expect(Input).toBeDefined();
  });

  it('should not call onChange function if disabled', async () => {
    const mockFn = renderInput({ isDisabled: true });

    const element = screen.getByPlaceholderText(basePlaceholderText);

    await userEvent.type(element, 'hello');

    expect(mockFn).not.toHaveBeenCalled();
    expect(element).toBeDisabled();
  });

  it('should call onChange function on type', async () => {
    const mockFn = renderInput({});

    const element = screen.getByPlaceholderText(basePlaceholderText);

    await userEvent.type(element, 'hello');

    expect(mockFn).toHaveBeenCalledTimes(5);
  });

  it('should call onChange function on type', async () => {
    const mockFn = renderInput({});
    const expectedValue = 'hello';

    const element = screen.getByPlaceholderText(basePlaceholderText);

    await userEvent.type(element, expectedValue);

    expect(mockFn).toHaveBeenCalledTimes(5);
    expect(element).toHaveValue(expectedValue);
  });

  test('should pass props correctly', () => {
    renderInput({ type: 'email' });

    const inputElement = screen.getByPlaceholderText(basePlaceholderText);

    expect(inputElement).toHaveAttribute('type', 'email');
  });
});
