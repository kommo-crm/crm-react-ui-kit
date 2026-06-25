import React from 'react';
import { render, screen } from '@testing-library/react';

import { type RibbonProps, Ribbon, RibbonPrimaryTheme } from '..';

import '@testing-library/jest-dom';

const DATA_RIBBON_TEST_ID = 'Ribbon';
const DATA_CHILDREN_TEST_ID = 'RibbonChildren';

const renderRibbonStandalone = (props?: Partial<RibbonProps>) => {
  return render(
    <Ribbon
      data-testid={DATA_RIBBON_TEST_ID}
      label="Pro"
      theme={RibbonPrimaryTheme}
      {...props}
    />
  );
};

const renderRibbonWithChildren = (props?: Partial<RibbonProps>) => {
  return render(
    <Ribbon
      data-testid={DATA_RIBBON_TEST_ID}
      label="Pro"
      theme={RibbonPrimaryTheme}
      {...props}
    >
      <div data-testid={DATA_CHILDREN_TEST_ID}>Content</div>
    </Ribbon>
  );
};

describe('Ribbon', () => {
  it('should be defined', () => {
    expect(Ribbon).toBeDefined();
  });

  it('should apply custom className in standalone mode', () => {
    const className = 'my-class';

    renderRibbonStandalone({ className });

    const element = screen.getByTestId(DATA_RIBBON_TEST_ID);

    expect(element).toHaveClass(className);
    /**
     * 1. Module className (ribbon-wrapper)
     * 3. Additional class `my-class`
     */
    expect(element.classList).toHaveLength(2);
  });

  it('should render ribbon label in standalone mode', () => {
    renderRibbonStandalone({ label: 'Sale' });

    expect(screen.getByText('Sale')).toBeInTheDocument();
  });

  it('should render children in wrapper mode', () => {
    renderRibbonWithChildren();

    expect(screen.getByTestId(DATA_CHILDREN_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('should apply custom className on wrapper container', () => {
    const className = 'my-class';

    renderRibbonWithChildren({ className });

    const element = screen.getByTestId(DATA_RIBBON_TEST_ID);

    expect(element).toHaveClass(className);
    /**
     * 1. Module className (container)
     * 2. Additional class `my-class`
     */
    expect(element.classList).toHaveLength(2);
  });
});
