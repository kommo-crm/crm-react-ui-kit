import { renderHook } from '@testing-library/react';

import { useListPlacement } from './useListPlacement';

type Rect = Pick<DOMRect, 'top' | 'bottom' | 'height'>;

const createListEl = (rect: Rect): HTMLUListElement => {
  const el = document.createElement('ul');

  el.getBoundingClientRect = () =>
    ({
      top: rect.top,
      bottom: rect.bottom,
      height: rect.height,
      left: 0,
      right: 0,
      width: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }) as DOMRect;

  return el;
};

const renderUseListPlacement = (listEl: HTMLUListElement) => {
  const listRef = { current: listEl };

  return renderHook(({ isOpened }) => useListPlacement({ isOpened, listRef }), {
    initialProps: { isOpened: false },
  });
};

describe('useListPlacement', () => {
  const originalInnerHeight = window.innerHeight;

  const setViewportHeight = (value: number) => {
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value,
    });
  };

  afterEach(() => {
    setViewportHeight(originalInnerHeight);
  });

  it('should default to "bottom" while closed', () => {
    setViewportHeight(500);

    const { result } = renderUseListPlacement(
      createListEl({ top: 0, bottom: 250, height: 250 })
    );

    expect(result.current).toBe('bottom');
  });

  it('should stay "bottom" when the list fits below', () => {
    setViewportHeight(500);

    const { result, rerender } = renderUseListPlacement(
      createListEl({ top: 100, bottom: 350, height: 250 })
    );

    rerender({ isOpened: true });

    expect(result.current).toBe('bottom');
  });

  it('should flip to "top" when the list overflows the viewport bottom', () => {
    setViewportHeight(500);

    const { result, rerender } = renderUseListPlacement(
      createListEl({ top: 400, bottom: 650, height: 250 })
    );

    rerender({ isOpened: true });

    expect(result.current).toBe('top');
  });

  it('should fall back to "bottom" when the list fits neither above nor below', () => {
    setViewportHeight(500);

    const { result, rerender } = renderUseListPlacement(
      createListEl({ top: 400, bottom: 650, height: 600 })
    );

    rerender({ isOpened: true });

    expect(result.current).toBe('bottom');
  });

  it('should reset to "bottom" after closing', () => {
    setViewportHeight(500);

    const { result, rerender } = renderUseListPlacement(
      createListEl({ top: 400, bottom: 650, height: 250 })
    );

    rerender({ isOpened: true });
    expect(result.current).toBe('top');

    rerender({ isOpened: false });
    expect(result.current).toBe('bottom');
  });
});
