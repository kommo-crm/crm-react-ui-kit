import React from 'react';
import { render, screen } from '@testing-library/react';

import {
  type SeparatorProps,
  Separator,
  SeparatorRoundedLightTheme,
  SeparatorSquaredLightTheme,
  SeparatorRoundedDarkTheme,
  SeparatorSquaredDarkTheme,
} from '..';

import '@testing-library/jest-dom';

const dataTestId = 'separator';

const renderSeparator = (props: Partial<SeparatorProps> = {}) =>
  render(
    <Separator
      data-testid={dataTestId}
      theme={SeparatorRoundedLightTheme}
      {...props}
    />
  );

describe('Separator', () => {
  it('should be defined', () => {
    expect(Separator).toBeDefined();
  });

  it('should render with role="separator"', () => {
    renderSeparator();

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('should default to horizontal orientation', () => {
    renderSeparator();

    expect(screen.getByRole('separator')).toHaveAttribute(
      'aria-orientation',
      'horizontal'
    );
  });

  it('should reflect vertical orientation in aria-orientation', () => {
    renderSeparator({ orientation: 'vertical' });

    expect(screen.getByRole('separator')).toHaveAttribute(
      'aria-orientation',
      'vertical'
    );
  });

  it('should apply custom className alongside the module and theme classes', () => {
    const className = 'my-class';

    renderSeparator({ className });

    const element = screen.getByTestId(dataTestId);

    expect(element).toHaveClass(className);
    /**
     * 1. Module className (.separator)
     * 2. Orientation className (.horizontal)
     * 3. Theme className
     * 4. Additional class `my-class`
     */
    expect(element.classList).toHaveLength(4);
  });

  it('should accept the SeparatorSquaredLightTheme', () => {
    renderSeparator({ theme: SeparatorSquaredLightTheme });

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('should accept the SeparatorRoundedDarkTheme', () => {
    renderSeparator({ theme: SeparatorRoundedDarkTheme });

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('should accept the SeparatorSquaredDarkTheme', () => {
    renderSeparator({ theme: SeparatorSquaredDarkTheme });

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
