import React from 'react';
import { render, screen } from '@testing-library/react';

import { type BadgeProps, Badge, BadgeSafetyTheme } from '..';

import '@testing-library/jest-dom';

const dataTestId = 'badge';

const renderBadge = (props: Partial<BadgeProps>) => {
  return render(
    <Badge data-testid={dataTestId} theme={BadgeSafetyTheme} {...props}>
      Badge
    </Badge>
  );
};

describe('Badge', () => {
  it('should be defined', () => {
    expect(Badge).toBeDefined();
  });

  it('should render children content', () => {
    renderBadge({});

    expect(screen.getByTestId(dataTestId)).toHaveTextContent('Badge');
  });

  it('should fall back to deprecated title when no children', () => {
    render(
      <Badge data-testid={dataTestId} theme={BadgeSafetyTheme} title="Legacy" />
    );

    expect(screen.getByTestId(dataTestId)).toHaveTextContent('Legacy');
  });

  it('should prefer children over title', () => {
    render(
      <Badge data-testid={dataTestId} theme={BadgeSafetyTheme} title="Legacy">
        Modern
      </Badge>
    );

    const element = screen.getByTestId(dataTestId);

    expect(element).toHaveTextContent('Modern');
    expect(element).not.toHaveTextContent('Legacy');
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
