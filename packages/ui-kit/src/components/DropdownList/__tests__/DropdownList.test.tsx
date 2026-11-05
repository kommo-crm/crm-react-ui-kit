import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { noop } from '@ui-kit/utils';

import { DropdownList, DropdownListTheme, DropdownListProps } from '..';

/**
 * jsdom has no ResizeObserver, Radix ScrollArea inside the list needs one.
 */
class ResizeObserverMock {
  observe = noop;

  unobserve = noop;

  disconnect = noop;
}

beforeAll(() => {
  Object.defineProperty(window, 'ResizeObserver', {
    configurable: true,
    value: ResizeObserverMock,
  });
});

const renderDropdownList = (
  props: Partial<DropdownListProps> & React.RefAttributes<HTMLDivElement>
) => {
  return render(
    <DropdownList theme={DropdownListTheme} isOpened {...props}>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </DropdownList>
  );
};

describe('DropdownList', () => {
  it('should be defined', () => {
    expect(DropdownList).toBeDefined();
  });

  it('should render children correctly', () => {
    renderDropdownList({});

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('should apply custom className to the list box', () => {
    const ref = createRef<HTMLDivElement>();

    renderDropdownList({ className: 'my-custom-class', ref });

    expect(ref.current).toHaveClass('my-custom-class');
  });

  it('should render the children inside the scrollable viewport', () => {
    const viewportRef = createRef<HTMLDivElement>();

    renderDropdownList({ viewportRef });

    expect(viewportRef.current).toContainElement(screen.getByText('Item 1'));
  });

  it('should report the scroll visibility when tracked', () => {
    const onScrollVisibilityChange = jest.fn();

    renderDropdownList({ onScrollVisibilityChange });

    expect(onScrollVisibilityChange).toHaveBeenCalledWith({
      isContentClippedAtTop: false,
      isContentClippedAtBottom: false,
    });
  });

  it('should render nothing when isOpened is false', () => {
    renderDropdownList({ isOpened: false });

    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });
});
