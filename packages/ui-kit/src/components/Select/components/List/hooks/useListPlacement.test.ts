import { renderHook } from '@testing-library/react';

import { type DropdownListPlacement } from '@ui-kit/components/DropdownList';

import { useListPlacement } from './useListPlacement';

type TriggerRect = { top: number; bottom: number };

/**
 * Mimics the real DOM: the list is CSS-positioned relative to the trigger,
 * anchored below it in 'bottom' placement and above it in 'top' placement.
 * So, just like in the browser, its measured rect depends on which placement
 * is currently rendered, not just on the trigger's position.
 *
 * `currentPlacement` is updated synchronously from inside the render (see
 * renderUseListPlacement below), so it's always in sync with what was just
 * rendered by the time a layout effect measures the element — including
 * across the multiple renders of a single cascading update.
 */
const createTriggerAwareListEl = (listHeight: number) => {
  let trigger: TriggerRect = { top: 0, bottom: 0 };
  let currentPlacement: DropdownListPlacement = 'bottom';
  const el = document.createElement('ul');

  el.getBoundingClientRect = () => {
    const top =
      currentPlacement === 'top' ? trigger.top - listHeight : trigger.bottom;

    return {
      top,
      bottom: top + listHeight,
      height: listHeight,
      left: 0,
      right: 0,
      width: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    };
  };

  return {
    el,
    setTriggerRect: (next: TriggerRect) => {
      trigger = next;
    },
    setCurrentPlacement: (next: DropdownListPlacement) => {
      currentPlacement = next;
    },
  };
};

const renderUseListPlacement = (
  listEl: HTMLUListElement,
  onPlacementRendered: (placement: DropdownListPlacement) => void
) => {
  const listRef = { current: listEl };

  return renderHook(
    ({ isOpened }) => {
      const placement = useListPlacement({ isOpened, listRef });

      onPlacementRendered(placement);

      return placement;
    },
    { initialProps: { isOpened: false } }
  );
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

    const { el, setCurrentPlacement } = createTriggerAwareListEl(250);
    const { result } = renderUseListPlacement(el, setCurrentPlacement);

    expect(result.current).toBe('bottom');
  });

  it('should stay "bottom" when the list fits below', () => {
    setViewportHeight(500);

    const { el, setTriggerRect, setCurrentPlacement } =
      createTriggerAwareListEl(250);

    setTriggerRect({ top: 60, bottom: 100 });

    const { result, rerender } = renderUseListPlacement(
      el,
      setCurrentPlacement
    );

    rerender({ isOpened: true });

    expect(result.current).toBe('bottom');
  });

  it('should flip to "top" when the list overflows the viewport bottom', () => {
    setViewportHeight(500);

    const { el, setTriggerRect, setCurrentPlacement } =
      createTriggerAwareListEl(250);

    // Space below (500 - 400 = 100) doesn't fit 250, space above (360) does.
    setTriggerRect({ top: 360, bottom: 400 });

    const { result, rerender } = renderUseListPlacement(
      el,
      setCurrentPlacement
    );

    rerender({ isOpened: true });

    expect(result.current).toBe('top');
  });

  it('should fall back to "bottom" when the list fits neither above nor below', () => {
    setViewportHeight(500);

    // List taller than the viewport itself — can't fit on either side.
    const { el, setTriggerRect, setCurrentPlacement } =
      createTriggerAwareListEl(600);

    setTriggerRect({ top: 360, bottom: 400 });

    const { result, rerender } = renderUseListPlacement(
      el,
      setCurrentPlacement
    );

    rerender({ isOpened: true });

    expect(result.current).toBe('bottom');
  });

  it('should reset to "bottom" after closing', () => {
    setViewportHeight(500);

    const { el, setTriggerRect, setCurrentPlacement } =
      createTriggerAwareListEl(250);

    setTriggerRect({ top: 360, bottom: 400 });

    const { result, rerender } = renderUseListPlacement(
      el,
      setCurrentPlacement
    );

    rerender({ isOpened: true });
    expect(result.current).toBe('top');

    rerender({ isOpened: false });
    expect(result.current).toBe('bottom');
  });
});
