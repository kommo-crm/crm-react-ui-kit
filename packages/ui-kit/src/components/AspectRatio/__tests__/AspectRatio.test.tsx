import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';

import { AspectRatio } from '..';

import '@testing-library/jest-dom';

const DATA_COMPONENT_TEST_ID = 'AspectRatio';
const DATA_CHILDREN_TEST_ID = 'AspectRatioChildren';

const getWrapper = (element: HTMLElement) => {
  return element.closest<HTMLElement>('[data-radix-aspect-ratio-wrapper]');
};

describe('AspectRatio', () => {
  it('should be defined', () => {
    expect(AspectRatio).toBeDefined();
  });

  it('should render children inside the content element', () => {
    render(
      <AspectRatio data-testid={DATA_COMPONENT_TEST_ID}>
        <p data-testid={DATA_CHILDREN_TEST_ID}>Content</p>
      </AspectRatio>
    );

    expect(screen.getByTestId(DATA_COMPONENT_TEST_ID)).toContainElement(
      screen.getByTestId(DATA_CHILDREN_TEST_ID)
    );
  });

  it('should pass className, style and ref to the content element', () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <AspectRatio
        ref={ref}
        className="my-class"
        style={{ color: 'red' }}
        data-testid={DATA_COMPONENT_TEST_ID}
      >
        Content
      </AspectRatio>
    );

    const element = screen.getByTestId(DATA_COMPONENT_TEST_ID);

    expect(ref.current).toBe(element);
    expect(element).toHaveClass('my-class');
    expect(element.style.color).toBe('red');
    expect(getWrapper(element)).not.toHaveClass('my-class');
  });

  it('should keep a square ratio by default', () => {
    render(
      <AspectRatio data-testid={DATA_COMPONENT_TEST_ID}>Content</AspectRatio>
    );

    expect(
      getWrapper(screen.getByTestId(DATA_COMPONENT_TEST_ID))?.style
        .paddingBottom
    ).toBe('100%');
  });

  it('should keep the passed ratio', () => {
    render(
      <AspectRatio ratio={16 / 9} data-testid={DATA_COMPONENT_TEST_ID}>
        Content
      </AspectRatio>
    );

    expect(
      getWrapper(screen.getByTestId(DATA_COMPONENT_TEST_ID))?.style
        .paddingBottom
    ).toBe('56.25%');
  });

  it.each([0, -1, NaN, Infinity])(
    'should fall back to a square ratio for invalid ratio %p',
    (ratio) => {
      render(
        <AspectRatio ratio={ratio} data-testid={DATA_COMPONENT_TEST_ID}>
          Content
        </AspectRatio>
      );

      expect(
        getWrapper(screen.getByTestId(DATA_COMPONENT_TEST_ID))?.style
          .paddingBottom
      ).toBe('100%');
    }
  );

  it('should render the child element as the content element with asChild', () => {
    render(
      <AspectRatio asChild className="ratio-class" style={{ color: 'red' }}>
        <img
          data-testid={DATA_COMPONENT_TEST_ID}
          className="child-class"
          alt=""
        />
      </AspectRatio>
    );

    const element = screen.getByTestId(DATA_COMPONENT_TEST_ID);

    expect(element.tagName).toBe('IMG');
    expect(element).toHaveClass('ratio-class', 'child-class');
    expect(element.style.color).toBe('red');
    expect(getWrapper(element)?.style.paddingBottom).toBe('100%');
  });
});
