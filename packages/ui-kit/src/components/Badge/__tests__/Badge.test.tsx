import React from 'react';
import { render, screen } from '@testing-library/react';

import { type BadgeProps, Badge, BadgeSafetyTheme } from '..';

import '@testing-library/jest-dom';

const dataTestId = 'badge';

const renderBadge = (props: Partial<BadgeProps>) => {
  return render(
    <Badge
      data-testid={dataTestId}
      theme={BadgeSafetyTheme}
      title="Badge"
      {...props}
    />
  );
};

describe('Badge', () => {
  it('should be defined', () => {
    expect(Badge).toBeDefined();
  });

  it('should apply custom span properties', async () => {
    const className = 'my-class';

    renderBadge({ className });

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
