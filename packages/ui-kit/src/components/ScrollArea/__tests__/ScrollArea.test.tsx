import React, { createRef } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ScrollArea, ScrollAreaSurfaceTheme } from '..';

import '@testing-library/jest-dom';

const viewportTestId = 'scroll-area-viewport';

const resizeCallbacks = new Set<() => void>();

class ResizeObserverMock {
  callback: () => void;

  constructor(callback: () => void) {
    this.callback = callback;
  }

  observe() {
    resizeCallbacks.add(this.callback);
  }

  unobserve() {
    resizeCallbacks.delete(this.callback);
  }

  disconnect() {
    resizeCallbacks.delete(this.callback);
  }
}

/**
 * Radix shows the scrollbar with type="auto" after a resize:
 * in jsdom offsetHeight is 0, so any scrollHeight counts as overflow.
 */
const triggerResize = () => {
  act(() => {
    resizeCallbacks.forEach((callback) => callback());
    jest.advanceTimersByTime(100);
  });
};

const runResizeCallbacks = () => {
  act(() => {
    resizeCallbacks.forEach((callback) => callback());
  });
};

const advanceFrame = () => {
  act(() => {
    jest.advanceTimersByTime(16);
  });
};

beforeAll(() => {
  window.ResizeObserver =
    ResizeObserverMock as unknown as typeof ResizeObserver;
});

type ScrollAreaTestProps = Partial<
  React.ComponentPropsWithRef<typeof ScrollArea>
>;

const renderScrollArea = (props: ScrollAreaTestProps) => {
  const handleMockFn = jest.fn();

  const renderElement = (elementProps: ScrollAreaTestProps) => (
    <ScrollArea
      data-testid={viewportTestId}
      theme={ScrollAreaSurfaceTheme}
      onScroll={handleMockFn}
      {...elementProps}
    >
      {elementProps.children ?? 'Content'}
    </ScrollArea>
  );

  const { rerender } = render(renderElement(props));

  const viewport = screen.getByTestId(viewportTestId);

  return {
    handleMockFn,
    viewport,
    root: viewport.parentElement as HTMLElement,
    rerender: (nextProps: ScrollAreaTestProps) =>
      rerender(renderElement(nextProps)),
  };
};

const scrollViewport = (
  viewport: HTMLElement,
  scrollTop: number,
  scrollHeight = 300,
  clientHeight = 100
) => {
  Object.defineProperty(viewport, 'scrollHeight', {
    configurable: true,
    value: scrollHeight,
  });
  Object.defineProperty(viewport, 'clientHeight', {
    configurable: true,
    value: clientHeight,
  });

  viewport.scrollTop = scrollTop;
  fireEvent.scroll(viewport);
};

const getScrollbar = (root: HTMLElement) =>
  root.querySelector('[data-orientation="vertical"]');

describe('ScrollArea', () => {
  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('should forward ref to the viewport', () => {
    const ref = createRef<HTMLDivElement>();

    renderScrollArea({ ref });

    expect(ref.current).toHaveAttribute('data-radix-scroll-area-viewport');
  });

  it('should put className and style on the root and other props on the viewport', () => {
    const { root, viewport } = renderScrollArea({
      'className': 'my-class',
      'style': { maxHeight: 320 },
      'id': 'list',
      'tabIndex': 0,
      'aria-label': 'List',
    });

    expect(root).toHaveClass('my-class');
    expect(root).toHaveStyle({ maxHeight: '320px' });
    expect(viewport).not.toHaveClass('my-class');
    expect(viewport).toHaveAttribute('id', 'list');
    expect(viewport).toHaveAttribute('tabindex', '0');
    expect(viewport).toHaveAttribute('aria-label', 'List');
  });

  it('should call onScroll when the viewport scrolls', () => {
    const { handleMockFn, viewport } = renderScrollArea({});

    scrollViewport(viewport, 50);

    expect(handleMockFn).toHaveBeenCalledTimes(1);
  });

  it('should show the scrollbar while scrolling and hide it after scrollHideDelay with type="scroll"', () => {
    jest.useFakeTimers();

    const { root, viewport } = renderScrollArea({
      type: 'scroll',
      scrollHideDelay: 600,
    });

    expect(getScrollbar(root)).not.toBeInTheDocument();

    scrollViewport(viewport, 50);

    expect(getScrollbar(root)).toBeInTheDocument();

    /**
     * Radix ends scrolling after 100ms without scroll events
     * and only then starts the scrollHideDelay timer.
     */
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(getScrollbar(root)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(getScrollbar(root)).not.toBeInTheDocument();
  });

  it('should show the scrollbar while hovered and hide it after scrollHideDelay with type="hover"', async () => {
    jest.useFakeTimers();

    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    const { root, viewport } = renderScrollArea({
      type: 'hover',
      scrollHideDelay: 600,
    });

    expect(getScrollbar(root)).not.toBeInTheDocument();

    await user.hover(root);
    scrollViewport(viewport, 0);
    triggerResize();

    expect(getScrollbar(root)).toBeInTheDocument();

    await user.unhover(root);

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(getScrollbar(root)).not.toBeInTheDocument();
  });

  it('should show the scrollbar when the content overflows with type="auto"', () => {
    jest.useFakeTimers();

    const { root, viewport } = renderScrollArea({});

    scrollViewport(viewport, 0);
    triggerResize();

    expect(getScrollbar(root)).toBeInTheDocument();
    expect(getScrollbar(root)).not.toHaveClass('scrollbar_hidden');
  });

  it('should show the scrollbar when the content fits with type="always"', () => {
    const { root } = renderScrollArea({ type: 'always' });

    expect(getScrollbar(root)).toBeInTheDocument();
  });

  it('should hide the scrollbar and keep the viewport scrollable with isScrollbarHidden', () => {
    jest.useFakeTimers();

    const { root, viewport } = renderScrollArea({ isScrollbarHidden: true });

    scrollViewport(viewport, 0);
    triggerResize();

    expect(getScrollbar(root)).toHaveClass('scrollbar_hidden');
    expect(viewport).toHaveStyle({ overflowY: 'scroll' });
  });

  describe('thumb fallback', () => {
    const sizeVar = '--crm-ui-kit-scroll-area-fallback-thumb-size';
    const offsetVar = '--crm-ui-kit-scroll-area-fallback-thumb-offset';

    beforeEach(() => {
      jest.spyOn(Element.prototype, 'scrollHeight', 'get').mockReturnValue(300);
      jest.spyOn(Element.prototype, 'clientHeight', 'get').mockReturnValue(100);
      jest
        .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
        .mockReturnValue(100);
    });

    it('should draw the thumb on mount before Radix measures the scrollbar with type="auto"', () => {
      const { root } = renderScrollArea({});
      const scrollbar = getScrollbar(root) as HTMLElement;

      expect(root).toHaveAttribute('data-overflow');
      expect(scrollbar).toHaveAttribute('data-state', 'hidden');
      expect(scrollbar.style.getPropertyValue(sizeVar)).toBe(
        `${(100 * 100) / 300}px`
      );
      expect(scrollbar.style.getPropertyValue(offsetVar)).toBe('0px');
    });

    it('should move the thumb on scroll', () => {
      const { root, viewport } = renderScrollArea({});

      scrollViewport(viewport, 100);

      const size = (100 * 100) / 300;

      expect(
        (getScrollbar(root) as HTMLElement).style.getPropertyValue(offsetVar)
      ).toBe(`${(100 / 200) * (100 - size)}px`);
    });

    it('should clear the thumb at once and the overflow on the next frame when the content stops overflowing', () => {
      jest.useFakeTimers();

      const { root } = renderScrollArea({});
      const scrollbar = getScrollbar(root) as HTMLElement;

      jest.spyOn(Element.prototype, 'scrollHeight', 'get').mockReturnValue(100);

      runResizeCallbacks();

      expect(scrollbar).not.toHaveAttribute('data-thumb-fallback');
      expect(scrollbar.style.getPropertyValue(sizeVar)).toBe('');
      expect(scrollbar.style.getPropertyValue(offsetVar)).toBe('');
      expect(root).toHaveAttribute('data-overflow');

      advanceFrame();

      expect(root).not.toHaveAttribute('data-overflow');
    });

    it('should clear the thumb when the scrollbar gets hidden', () => {
      const { root, rerender } = renderScrollArea({});
      const scrollbar = getScrollbar(root) as HTMLElement;

      rerender({ isScrollbarHidden: true });

      expect(root).not.toHaveAttribute('data-overflow');
      expect(scrollbar.style.getPropertyValue(sizeVar)).toBe('');
      expect(scrollbar.style.getPropertyValue(offsetVar)).toBe('');
    });

    it('should draw the thumb on the new scrollbar when type changes from "auto" to "always"', () => {
      const { root, rerender } = renderScrollArea({});

      rerender({ type: 'always' });

      expect(
        (getScrollbar(root) as HTMLElement).style.getPropertyValue(sizeVar)
      ).toBe(`${(100 * 100) / 300}px`);
    });

    it('should not draw the thumb with isScrollbarHidden', () => {
      const { root } = renderScrollArea({ isScrollbarHidden: true });

      expect(root).not.toHaveAttribute('data-overflow');
    });

    it('should not draw the thumb with type="hover"', () => {
      const { root } = renderScrollArea({ type: 'hover' });

      expect(root).not.toHaveAttribute('data-overflow');
      expect(getScrollbar(root)).not.toBeInTheDocument();
    });
  });

  it.each([
    {
      scrollTop: 0,
      isContentClippedAtTop: false,
      isContentClippedAtBottom: true,
    },
    {
      scrollTop: 100,
      isContentClippedAtTop: true,
      isContentClippedAtBottom: true,
    },
    {
      scrollTop: 200,
      isContentClippedAtTop: true,
      isContentClippedAtBottom: false,
    },
  ])(
    'should show fade by scroll position: scrollTop $scrollTop',
    ({ scrollTop, isContentClippedAtTop, isContentClippedAtBottom }) => {
      const onScrollVisibilityChange = jest.fn();

      const { root, viewport } = renderScrollArea({
        isFadeEnabled: true,
        onScrollVisibilityChange,
      });

      scrollViewport(viewport, scrollTop);

      expect(root.hasAttribute('data-fade-top')).toBe(isContentClippedAtTop);
      expect(root.hasAttribute('data-fade-bottom')).toBe(
        isContentClippedAtBottom
      );
      expect(onScrollVisibilityChange).toHaveBeenLastCalledWith({
        isContentClippedAtTop,
        isContentClippedAtBottom,
      });
    }
  );

  it('should not show fade when the content fits', () => {
    const onScrollVisibilityChange = jest.fn();

    const { root, viewport } = renderScrollArea({
      isFadeEnabled: true,
      onScrollVisibilityChange,
    });

    scrollViewport(viewport, 0, 100, 100);

    expect(root).not.toHaveAttribute('data-fade-top');
    expect(root).not.toHaveAttribute('data-fade-bottom');
    expect(onScrollVisibilityChange).toHaveBeenCalledTimes(1);
    expect(onScrollVisibilityChange).toHaveBeenCalledWith({
      isContentClippedAtTop: false,
      isContentClippedAtBottom: false,
    });
  });

  it('should call onScrollVisibilityChange once on mount with the measured state', () => {
    jest.spyOn(Element.prototype, 'scrollHeight', 'get').mockReturnValue(300);
    jest.spyOn(Element.prototype, 'clientHeight', 'get').mockReturnValue(100);

    const onScrollVisibilityChange = jest.fn();

    renderScrollArea({ onScrollVisibilityChange });

    expect(onScrollVisibilityChange).toHaveBeenCalledTimes(1);
    expect(onScrollVisibilityChange).toHaveBeenCalledWith({
      isContentClippedAtTop: false,
      isContentClippedAtBottom: true,
    });
  });

  it('should not call onScrollVisibilityChange when the state does not change', () => {
    const onScrollVisibilityChange = jest.fn();

    const { viewport } = renderScrollArea({ onScrollVisibilityChange });

    scrollViewport(viewport, 50);
    scrollViewport(viewport, 60);

    expect(onScrollVisibilityChange).toHaveBeenCalledTimes(2);
    expect(onScrollVisibilityChange).toHaveBeenLastCalledWith({
      isContentClippedAtTop: true,
      isContentClippedAtBottom: true,
    });
  });
});
