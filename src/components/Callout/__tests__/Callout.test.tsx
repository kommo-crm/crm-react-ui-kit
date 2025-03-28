import React from 'react';
import { render, screen } from '@testing-library/react';

import { type CalloutProps, Callout } from '..';
import { CalloutErrorTheme } from '../themes/CalloutError.theme';

import '@testing-library/jest-dom';

const DATA_COMPONENT_TEST_ID = 'Callout';
const DATA_CHILDREN_TEST_ID = 'CalloutChildren';

const renderCallout = (props?: Partial<CalloutProps>) => {
  return render(
    <Callout
      theme={CalloutErrorTheme}
      data-testid={DATA_COMPONENT_TEST_ID}
      {...props}
    >
      <p data-testid={DATA_CHILDREN_TEST_ID}>Content</p>
    </Callout>
  );
};

describe('Callout', () => {
  it('should be defined', () => {
    expect(Callout).toBeDefined();
  });

  it('should apply custom css properties', async () => {
    const className = 'my-class';

    renderCallout({ className });

    const element = screen.getByTestId(DATA_COMPONENT_TEST_ID);

    expect(element).toHaveClass(className);
    /**
     * 1. Modular className
     * 2. Theme className
     * 3. Additional class `my-class`
     */
    expect(element.classList).toHaveLength(3);
  });

  it('should children be defined', async () => {
    renderCallout();

    const children = screen.getByTestId(DATA_CHILDREN_TEST_ID);

    expect(children).toBeInTheDocument();
  });
});
