import React from 'react';
import { render, screen } from '@testing-library/react';

import { type SpinnerProps, Spinner, SpinnerPrimaryTheme } from '..';

import '@testing-library/jest-dom';

const dataTestId = 'spinner';

const renderSpinner = (props: Partial<SpinnerProps>) => {
  return render(
    <Spinner data-testid={dataTestId} theme={SpinnerPrimaryTheme} {...props} />
  );
};

describe('Spinner', () => {
  it('should be defined', () => {
    expect(Spinner).toBeDefined();
  });

  it('should apply custom span properties', async () => {
    const className = 'my-class';

    renderSpinner({ className });

    const element = screen.getByTestId(dataTestId);

    expect(element).toHaveClass(className);
    /**
     * 1. Module className
     * 2. Theme className
     * 3. Additional class `my-class`
     */
    expect(element.classList).toHaveLength(3);
  });
});
