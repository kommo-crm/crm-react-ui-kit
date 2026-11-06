import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Skeleton, SkeletonPrimaryTheme } from '..';

import '@testing-library/jest-dom';

const DATA_COMPONENT_TEST_ID = 'Skeleton';
const DATA_CHILDREN_TEST_ID = 'SkeletonChildren';

describe('Skeleton', () => {
  it('should be defined', () => {
    expect(Skeleton).toBeDefined();
  });

  it('should render an empty div with width and height', () => {
    render(
      <Skeleton
        theme={SkeletonPrimaryTheme}
        width="120px"
        height="1rem"
        data-testid={DATA_COMPONENT_TEST_ID}
      />
    );

    const element = screen.getByTestId(DATA_COMPONENT_TEST_ID);

    expect(element.tagName).toBe('DIV');
    expect(element.childNodes).toHaveLength(1);
    expect(element.firstElementChild).toHaveClass('layer');
    expect(element).toHaveClass('skeleton');
    expect(element.style.width).toBe('120px');
    expect(element.style.height).toBe('1rem');
  });

  it('should render a span with the inline class when as is span', () => {
    render(
      <Skeleton
        as="span"
        theme={SkeletonPrimaryTheme}
        data-testid={DATA_COMPONENT_TEST_ID}
      />
    );

    const element = screen.getByTestId(DATA_COMPONENT_TEST_ID);

    expect(element.tagName).toBe('SPAN');
    expect(element).toHaveClass('inline');
  });

  it('should set the min and max size props as styles', () => {
    render(
      <Skeleton
        theme={SkeletonPrimaryTheme}
        minWidth="60px"
        maxWidth="50%"
        minHeight="1rem"
        maxHeight="40px"
        data-testid={DATA_COMPONENT_TEST_ID}
      />
    );

    expect(screen.getByTestId(DATA_COMPONENT_TEST_ID)).toHaveStyle({
      minWidth: '60px',
      maxWidth: '50%',
      minHeight: '1rem',
      maxHeight: '40px',
    });
  });

  it('should wrap children and hide them from assistive technologies', () => {
    render(
      <Skeleton
        theme={SkeletonPrimaryTheme}
        data-testid={DATA_COMPONENT_TEST_ID}
      >
        <>
          <button type="button">Save</button>
          Text
        </>
      </Skeleton>
    );

    const element = screen.getByTestId(DATA_COMPONENT_TEST_ID);

    expect(element).toHaveAttribute('aria-hidden', 'true');
    expect(element).toHaveClass('skeleton');
    expect(element.firstElementChild).toHaveClass('layer');
    expect(element).toHaveTextContent('SaveText');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should show children and keep the size without placeholder props when not loading', () => {
    render(
      <Skeleton
        theme={SkeletonPrimaryTheme}
        isLoading={false}
        className="my-class"
        width="100px"
        data-testid={DATA_COMPONENT_TEST_ID}
      >
        <p data-testid={DATA_CHILDREN_TEST_ID}>Content</p>
      </Skeleton>
    );

    const element = screen.getByTestId(DATA_COMPONENT_TEST_ID);

    expect(element).toContainElement(screen.getByTestId(DATA_CHILDREN_TEST_ID));
    expect(element).toHaveClass('my-class');
    expect(element).not.toHaveClass('skeleton');
    expect(element.firstElementChild).toBe(
      screen.getByTestId(DATA_CHILDREN_TEST_ID)
    );
    expect(element).not.toHaveAttribute('aria-hidden');
    expect(element.style.width).toBe('100px');
  });

  it('should keep children mounted when isLoading toggles', async () => {
    const renderSkeleton = (isLoading: boolean) => (
      <Skeleton theme={SkeletonPrimaryTheme} isLoading={isLoading}>
        <input aria-label="Name" />
      </Skeleton>
    );

    const { rerender } = render(renderSkeleton(false));

    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'John');

    rerender(renderSkeleton(true));
    rerender(renderSkeleton(false));

    expect(screen.getByRole('textbox')).toBe(input);
    expect(input).toHaveValue('John');
  });

  it('should pass className, style and ref to the root', () => {
    const ref = createRef<HTMLElement>();

    render(
      <Skeleton
        theme={SkeletonPrimaryTheme}
        ref={ref}
        className="my-class"
        style={{ color: 'red' }}
        data-testid={DATA_COMPONENT_TEST_ID}
      />
    );

    const element = screen.getByTestId(DATA_COMPONENT_TEST_ID);

    expect(ref.current).toBe(element);
    expect(element).toHaveClass('my-class');
    expect(element.style.color).toBe('red');
  });
});
