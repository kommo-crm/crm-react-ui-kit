import React from 'react';
import { type Page } from '@playwright/test';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from '@ui-kit/tests/e2e/utils';
import { FOCUSABLE_ELEMENT_ID } from '@ui-kit/tests/e2e/constants';

import {
  ScrollAreaSurfacePlaygroundItem,
  ScrollAreaCompactPlaygroundItem,
  type ScrollAreaTestProps,
} from './ScrollArea.e2e-playground';
import { MAX_FITTING_ITEMS_COUNT } from './ScrollArea.e2e-constants';

/**
 * Radix mounts the scrollbar after ResizeObserver and moves the thumb
 * in requestAnimationFrame, so the screenshot waits for both.
 */
const waitForScrollArea = async (page: Page, hasScrollbar: boolean) => {
  if (hasScrollbar) {
    await page.locator('[data-orientation="vertical"]').waitFor();
  }

  await page.evaluate(
    () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
      })
  );
};

const combinations = multiCartesian<ScrollAreaTestProps>([
  { itemsCount: [20], scrollPosition: ['start', 'middle'] },
  { itemsCount: [2] },
  { itemsCount: [3, 20], isMaxHeight: [true] },
  { itemsCount: [20], isEllipsis: [true] },
  {
    itemsCount: [20],
    isFadeEnabled: [true],
    scrollPosition: ['start', 'middle', 'end'],
  },
  { itemsCount: [20], isScrollbarHidden: [true], scrollPosition: ['middle'] },
]);

const hasScrollbar = (props: ScrollAreaTestProps) =>
  props.itemsCount > MAX_FITTING_ITEMS_COUNT && !props.isScrollbarHidden;

const focusedCombinations = multiCartesian<ScrollAreaTestProps>([
  { itemsCount: [20], id: [FOCUSABLE_ELEMENT_ID] },
]);

/**
 * Playwright CT mounts only components referenced in JSX by their import
 * name, so each playground is written out instead of looping over them.
 */
for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('ScrollArea Surface', () => {
    test(
      label,
      async ({ mount, page, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <ScrollAreaSurfacePlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await waitForScrollArea(page, hasScrollbar(props));
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('ScrollArea Compact', () => {
    test(
      label,
      async ({ mount, page, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <ScrollAreaCompactPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await waitForScrollArea(page, hasScrollbar(props));
        await expectScreenshotClippedToContent();
      }
    );
  });
}

for (const props of focusedCombinations) {
  const label = prettyProps(props);

  test.describe('ScrollArea Surface Focused', () => {
    test(
      label,
      async ({
        mount,
        page,
        appearance,
        expectScreenshotClippedToContent,
        setFocusOnElement,
      }) => {
        await mount(
          <ScrollAreaSurfacePlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await setFocusOnElement();
        await waitForScrollArea(page, true);
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('ScrollArea Compact Focused', () => {
    test(
      label,
      async ({
        mount,
        page,
        appearance,
        expectScreenshotClippedToContent,
        setFocusOnElement,
      }) => {
        await mount(
          <ScrollAreaCompactPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await setFocusOnElement();
        await waitForScrollArea(page, true);
        await expectScreenshotClippedToContent();
      }
    );
  });
}
