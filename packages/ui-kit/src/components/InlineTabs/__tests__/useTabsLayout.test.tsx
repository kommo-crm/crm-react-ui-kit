import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { InlineTabs, InlineTabsPrimaryTheme } from '..';

import '@testing-library/jest-dom';

let panelWidth = 400;
let tabWidth = 100;
let overflowButtonWidth = 0;
let liveTabWidth = 0;
let liveTabLeft = 0;
let overflowWidthByVisibleTabs: Record<number, number> | null = null;
let copyWidthByLabel: Record<string, number> | null = null;

interface MockObserver {
  callback: ResizeObserverCallback;
  targets: Element[];
}

let observers: MockObserver[] = [];

const mockResizeObserver = () => {
  observers = [];

  global.ResizeObserver = jest.fn((callback: ResizeObserverCallback) => {
    const observer: MockObserver = { callback, targets: [] };

    observers.push(observer);

    return {
      observe: (target: Element) => observer.targets.push(target),
      unobserve: jest.fn(),
      disconnect: () => {
        observer.targets = [];
      },
    };
  }) as unknown as typeof ResizeObserver;
};

const isObserved = (target: Element) =>
  observers.some((observer) => observer.targets.includes(target));

const resize = (target: Element) => {
  act(() => {
    observers
      .filter((observer) => observer.targets.includes(target))
      .forEach((observer) => observer.callback([], {} as ResizeObserver));
  });
};

const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
const originalResizeObserver = global.ResizeObserver;

const renderTabs = (listStyle?: React.CSSProperties) =>
  render(
    <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="main">
      <InlineTabs.List style={listStyle}>
        <InlineTabs.Tab value="main">Main</InlineTabs.Tab>
        <InlineTabs.Tab value="media">Media</InlineTabs.Tab>
        <InlineTabs.Tab value="setup">Setup</InlineTabs.Tab>
      </InlineTabs.List>
    </InlineTabs>
  );

describe('useTabsLayout', () => {
  beforeEach(() => {
    jest.useFakeTimers();

    panelWidth = 400;
    tabWidth = 100;
    overflowButtonWidth = 0;
    liveTabWidth = 0;
    liveTabLeft = 0;
    overflowWidthByVisibleTabs = null;
    copyWidthByLabel = null;

    function widthOf(element: Element) {
      if (element.getAttribute('role') === 'tablist') {
        return panelWidth;
      }

      if (element.hasAttribute('aria-haspopup')) {
        return overflowWidthByVisibleTabs
          ? (overflowWidthByVisibleTabs[
              document.querySelectorAll('[role="tab"]:not([hidden])').length
            ] ?? 0)
          : overflowButtonWidth;
      }

      if (element.getAttribute('role') === 'tab') {
        return liveTabWidth;
      }

      if (element.parentElement?.getAttribute('aria-hidden') !== 'true') {
        return 0;
      }

      return copyWidthByLabel?.[element.textContent ?? ''] ?? tabWidth;
    }

    Element.prototype.getBoundingClientRect = function getBoundingClientRect(
      this: Element
    ) {
      const left = this.getAttribute('role') === 'tab' ? liveTabLeft : 0;

      return { left, width: widthOf(this) } as DOMRect;
    };
  });

  afterEach(() => {
    jest.useRealTimers();

    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;

    global.ResizeObserver = originalResizeObserver;
  });

  it('should re-measure on window resize when ResizeObserver is missing', () => {
    delete (global as { ResizeObserver?: unknown }).ResizeObserver;

    renderTabs();

    expect(screen.getAllByRole('tab')).toHaveLength(3);

    panelWidth = 150;
    fireEvent(window, new Event('resize'));

    expect(screen.getAllByRole('tab')).toHaveLength(3);

    act(() => {
      jest.advanceTimersByTime(50);
    });

    expect(screen.getAllByRole('tab')).toHaveLength(1);
    expect(screen.getByRole('tab')).toHaveTextContent('Main');
  });
  it('should re-measure when the measure layer is resized', () => {
    mockResizeObserver();

    const { container } = renderTabs();

    const measureLayer = container.querySelector(
      '[role="tablist"] > [aria-hidden="true"]'
    ) as HTMLElement;

    expect(isObserved(measureLayer)).toBe(true);
    expect(screen.getAllByRole('tab')).toHaveLength(3);

    tabWidth = 180;
    resize(measureLayer);

    expect(screen.getAllByRole('tab')).toHaveLength(2);
  });

  it('should re-measure when a tab grows while some tabs are hidden', () => {
    mockResizeObserver();
    panelWidth = 250;

    const { container } = renderTabs();

    expect(screen.getAllByRole('tab')).toHaveLength(2);

    const measureLayer = container.querySelector(
      '[role="tablist"] > [aria-hidden="true"]'
    ) as HTMLElement;

    expect(isObserved(measureLayer)).toBe(true);

    tabWidth = 130;
    resize(measureLayer);

    expect(screen.getAllByRole('tab')).toHaveLength(1);
  });

  it('should re-measure when tab copies resize without changing the layer width', () => {
    mockResizeObserver();

    const { container } = renderTabs();

    const [mainCopy] = Array.from(
      container.querySelectorAll('[role="tablist"] > [aria-hidden="true"] > *')
    );

    expect(isObserved(mainCopy)).toBe(true);

    copyWidthByLabel = { Main: 120, Setup: 80 };
    resize(mainCopy);

    expect(screen.getByRole('tab', { name: 'Main' })).toHaveStyle({
      flexBasis: '120px',
    });
    expect(screen.getByRole('tab', { name: 'Setup' })).toHaveStyle({
      flexBasis: '80px',
    });
  });

  it('should reserve the width of the overflow button with its badge', () => {
    mockResizeObserver();
    panelWidth = 250;

    renderTabs();

    expect(screen.getAllByRole('tab')).toHaveLength(2);

    const overflowButton = screen.getByRole('button');

    expect(isObserved(overflowButton)).toBe(true);

    overflowButtonWidth = 60;
    resize(overflowButton);

    expect(screen.getAllByRole('tab')).toHaveLength(1);
  });

  it('should move the slider when tabs resize without a new split', () => {
    mockResizeObserver();
    liveTabWidth = 100;

    const { container } = renderTabs();
    const getSlider = () =>
      container.querySelector<HTMLElement>('[data-inline-tabs-slider]');

    expect(getSlider()).toHaveStyle({ width: '100px' });

    tabWidth = 110;
    liveTabWidth = 110;
    resize(container.querySelector('[aria-hidden="true"]') as Element);

    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(getSlider()).toHaveStyle({ width: '110px' });
  });

  it('should pass fractional measured widths as the flex basis', () => {
    mockResizeObserver();
    tabWidth = 100.5;

    renderTabs();

    expect(screen.getByRole('tab', { name: 'Main' })).toHaveStyle({
      flexBasis: '100.5px',
    });
  });

  it('should pick the largest split whose own overflow button fits', () => {
    mockResizeObserver();
    panelWidth = 250;
    overflowWidthByVisibleTabs = { 2: 60, 1: 20 };

    renderTabs();

    expect(screen.getAllByRole('tab')).toHaveLength(1);
  });

  it('should keep a split whose own overflow button is narrower', () => {
    mockResizeObserver();
    panelWidth = 250;
    overflowWidthByVisibleTabs = { 2: 40, 1: 80 };

    renderTabs();

    expect(screen.getAllByRole('tab')).toHaveLength(2);
  });

  it('should give the same split whatever direction the panel is resized from', () => {
    mockResizeObserver();
    overflowWidthByVisibleTabs = { 2: 25, 1: 50 };

    panelWidth = 150;
    renderTabs();

    expect(screen.getAllByRole('tab')).toHaveLength(1);

    panelWidth = 225;
    resize(screen.getByRole('tablist'));

    expect(screen.getAllByRole('tab')).toHaveLength(2);

    panelWidth = 400;
    resize(screen.getByRole('tablist'));

    expect(screen.getAllByRole('tab')).toHaveLength(3);

    panelWidth = 225;
    resize(screen.getByRole('tablist'));

    expect(screen.getAllByRole('tab')).toHaveLength(2);
  });

  it('should bring a tab back when the overflow button narrows', () => {
    mockResizeObserver();
    panelWidth = 250;
    overflowButtonWidth = 60;

    renderTabs();

    expect(screen.getAllByRole('tab')).toHaveLength(1);

    /**
     * The badge on the button lost a digit while the tabs kept their sizes.
     */
    overflowButtonWidth = 40;
    resize(screen.getByRole('button'));

    expect(screen.getAllByRole('tab')).toHaveLength(2);
  });

  it('should settle when the button is wider with fewer hidden tabs', () => {
    mockResizeObserver();
    panelWidth = 250;
    overflowWidthByVisibleTabs = { 2: 100, 1: 10 };

    renderTabs();

    expect(screen.getAllByRole('tab')).toHaveLength(1);

    resize(screen.getByRole('button'));
    resize(screen.getByRole('button'));

    expect(screen.getAllByRole('tab')).toHaveLength(1);
  });

  it('should split the content box of a panel with padding and border', () => {
    mockResizeObserver();
    panelWidth = 320;

    renderTabs({
      paddingLeft: '10px',
      paddingRight: '10px',
      borderLeft: '5px solid',
      borderRight: '5px solid',
    });

    expect(screen.getAllByRole('tab')).toHaveLength(2);
  });

  it('should place the slider under the tab inside the panel border', () => {
    mockResizeObserver();
    liveTabWidth = 100;
    liveTabLeft = 5;

    const { container } = renderTabs({ borderLeft: '5px solid' });

    expect(container.querySelector('[data-inline-tabs-slider]')).toHaveStyle({
      left: '0px',
    });
  });

  it('should move the slider when the panel resizes without a new split', () => {
    mockResizeObserver();
    liveTabWidth = 100;

    const { container } = renderTabs();
    const getSlider = () =>
      container.querySelector<HTMLElement>('[data-inline-tabs-slider]');

    expect(getSlider()).toHaveStyle({ width: '100px' });

    /**
     * The tabs grow by CSS, so a wider panel changes the live tab box while
     * the measured widths and the split stay the same.
     */
    panelWidth = 500;
    liveTabWidth = 120;
    resize(screen.getByRole('tablist'));

    expect(getSlider()).toHaveStyle({ width: '120px' });
  });
});
