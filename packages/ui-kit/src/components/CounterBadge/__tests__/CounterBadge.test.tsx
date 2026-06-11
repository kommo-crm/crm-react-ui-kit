import React from 'react';
import { render, screen } from '@testing-library/react';

import {
  type CounterBadgeProps,
  CounterBadge,
  CounterBadgePrimaryTheme,
} from '..';

import '@testing-library/jest-dom';

const dataTestId = 'counter-badge';

const renderCounterBadge = (props: Partial<CounterBadgeProps>) => {
  return render(
    <CounterBadge
      data-testid={dataTestId}
      theme={CounterBadgePrimaryTheme}
      {...props}
    >
      99+
    </CounterBadge>
  );
};

describe('CounterBadge', () => {
  it('should be defined', () => {
    expect(CounterBadge).toBeDefined();
  });

  it('should apply custom span properties', async () => {
    const className = 'my-class';

    renderCounterBadge({ className });

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
