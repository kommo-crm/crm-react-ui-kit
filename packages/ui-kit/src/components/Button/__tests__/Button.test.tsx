import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button, ButtonPrimaryTheme, type ButtonProps } from '..';

import '@testing-library/jest-dom';

const renderButton = (props: Partial<ButtonProps>) => {
  const handleMockFn = jest.fn();

  render(
    <Button role="button" theme={ButtonPrimaryTheme} {...props}>
      Go to Dashboard
    </Button>
  );

  return handleMockFn;
};

describe('Button', () => {
  it('should be defined', () => {
    expect(Button).toBeDefined();
  });

  it('should not call onClick when disabled', async () => {
    const mockFn = renderButton({ isDisabled: true });

    await userEvent.click(screen.getByRole('button'));

    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should not call onClick when loading', async () => {
    const mockFn = renderButton({ isLoading: true });

    await userEvent.click(screen.getByRole('button'));

    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should call onClick by default', async () => {
    const mockFn = renderButton({});

    await userEvent.click(screen.getByRole('button'));

    expect(mockFn).not.toHaveBeenCalled();
  });
});
