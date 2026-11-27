import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as RadixTooltip from '@radix-ui/react-tooltip';

import { Arrow } from '..';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('Arrow', () => {
  it('renders border and fill layers and forwards ref to the fill layer', () => {
    const ref = createRef<SVGSVGElement>();

    render(
      <RadixTooltip.Provider>
        <RadixTooltip.Root open>
          <RadixTooltip.Trigger>trigger</RadixTooltip.Trigger>
          <RadixTooltip.Portal>
            <RadixTooltip.Content data-testid="content">
              <Arrow
                as={RadixTooltip.Arrow}
                className="fill"
                borderClassName="border"
                ref={ref}
              />
            </RadixTooltip.Content>
          </RadixTooltip.Portal>
        </RadixTooltip.Root>
      </RadixTooltip.Provider>
    );

    const svgs = screen.getByTestId('content').querySelectorAll('svg');

    expect(svgs).toHaveLength(2);
    expect(svgs[0]).toHaveClass('border');
    expect(svgs[1]).toHaveClass('fill');
    expect(ref.current).toBe(svgs[1]);
  });
});
