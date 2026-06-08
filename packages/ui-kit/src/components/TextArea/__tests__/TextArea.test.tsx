import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextArea } from '../TextArea';
import { TextareaLightTheme } from '../TextArea.themes';
import { TextAreaProps } from '../TextArea.props';

import '@testing-library/jest-dom';

const basePlaceholderText = 'TextArea';

const renderTextArea = (props: Partial<TextAreaProps>) => {
  const handleMockFn = jest.fn();

  render(
    <TextArea
      placeholder={basePlaceholderText}
      theme={TextareaLightTheme}
      onChange={handleMockFn}
      {...props}
    />
  );

  return handleMockFn;
};

describe('TextArea', () => {
  it('should be defined', () => {
    expect(TextArea).toBeDefined();
  });

  it('should not call onChange function if disabled', async () => {
    const mockFn = renderTextArea({ isDisabled: true });

    const element = screen.getByPlaceholderText(basePlaceholderText);

    await userEvent.type(element, 'hello');

    expect(mockFn).not.toHaveBeenCalled();
    expect(element).toBeDisabled();
  });

  it('should call onChange function on type', async () => {
    const mockFn = renderTextArea({});

    const element = screen.getByPlaceholderText(basePlaceholderText);

    await userEvent.type(element, 'hello');

    expect(mockFn).toHaveBeenCalledTimes(5);
  });

  it('should call onChange function on type', async () => {
    const mockFn = renderTextArea({});
    const expectedValue = 'hello';

    const element = screen.getByPlaceholderText(basePlaceholderText);

    await userEvent.type(element, expectedValue);

    expect(mockFn).toHaveBeenCalledTimes(5);
    expect(element).toHaveValue(expectedValue);
  });

  test('should pass props correctly', () => {
    renderTextArea({ cols: 3 });

    const textareaElement = screen.getByPlaceholderText(basePlaceholderText);

    expect(textareaElement).toHaveAttribute('cols', '3');
  });
});
