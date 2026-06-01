import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { waitForNextFrame } from 'src/lib/utils';

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

  describe('not interactive "before" and "after" should focus input on click', () => {
    it('not interactive', async () => {
      renderInput({
        before: <div data-testid="before" />,
        after: <div data-testid="after" />,
      });

      const beforeElement = screen.getByTestId('before');
      const afterElement = screen.getByTestId('after');
      const element = screen.getByPlaceholderText(basePlaceholderText);

      await userEvent.click(beforeElement);
      await waitForNextFrame();
      expect(element).toHaveFocus();

      await userEvent.click(afterElement);
      await waitForNextFrame();
      expect(element).toHaveFocus();
    });

    it('interactive', async () => {
      renderInput({
        before: <button data-testid="before" />,
        after: <button data-testid="after" />,
      });

      const beforeElement = screen.getByTestId('before');
      const afterElement = screen.getByTestId('after');
      const element = screen.getByPlaceholderText(basePlaceholderText);

      await userEvent.click(beforeElement);
      await waitForNextFrame();
      expect(beforeElement).toHaveFocus();
      expect(element).not.toHaveFocus();

      await userEvent.click(afterElement);
      await waitForNextFrame();
      expect(afterElement).toHaveFocus();
      expect(element).not.toHaveFocus();
    });
  });
});
