import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InlineInput } from '../InlineInput';
import { InlineInputPrimaryTheme } from '../InlineInput.themes';
import { InlineInputProps } from '../InlineInput.props';

import '@testing-library/jest-dom';

const basePlaceholderText = 'InlineInput';

const renderInlineInput = (props: Partial<InlineInputProps>) => {
  const handleMockFn = jest.fn();

  render(
    <InlineInput
      placeholder={basePlaceholderText}
      theme={InlineInputPrimaryTheme}
      onChange={handleMockFn}
      {...props}
    />
  );

  return handleMockFn;
};

describe('InlineInput', () => {
  it('should be defined', () => {
    expect(InlineInput).toBeDefined();
  });

  it('should not call onChange function if disabled', async () => {
    const mockFn = renderInlineInput({ isDisabled: true });

    const element = screen.getByPlaceholderText(basePlaceholderText);

    await userEvent.type(element, 'hello');

    expect(mockFn).not.toHaveBeenCalled();
    expect(element).toBeDisabled();
  });

  it('should call onChange function on type', async () => {
    const mockFn = renderInlineInput({});

    const element = screen.getByPlaceholderText(basePlaceholderText);

    await userEvent.type(element, 'hello');

    expect(mockFn).toHaveBeenCalledTimes(5);
  });

  it('should call onChange function on type', async () => {
    const mockFn = renderInlineInput({});
    const expectedValue = 'hello';

    const element = screen.getByPlaceholderText(basePlaceholderText);

    await userEvent.type(element, expectedValue);

    expect(mockFn).toHaveBeenCalledTimes(5);
    expect(element).toHaveValue(expectedValue);
  });

  test('should pass props correctly', () => {
    renderInlineInput({ type: 'email' });

    const inlineInputElement = screen.getByPlaceholderText(basePlaceholderText);

    expect(inlineInputElement).toHaveAttribute('type', 'email');
  });
});
