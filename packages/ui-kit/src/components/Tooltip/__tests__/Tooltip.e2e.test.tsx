import React from 'react';

import type { Page } from '@playwright/test';
import { expect } from '@playwright/experimental-ct-react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from '@ui-kit/tests/e2e/utils';

import {
  TooltipPlaygroundItem,
  TooltipTouchPairPlayground,
  TooltipTouchPlayground,
  type TooltipPlaygroundProps,
} from './Tooltip.e2e-playground';
import { STAGE_TEST_ID } from './Tooltip.e2e-constants';

const VISIBLE_CONTENT_SELECTOR = '[data-radix-popper-content-wrapper] > *';
const WRAPPER_SELECTOR = '[data-radix-popper-content-wrapper]';

/**
 * Radix parks the wrapper at translate(0, -200%) until floating-ui positions
 * it (@radix-ui/react-popper). Browsers re-serialise the value, so match the
 * offset rather than the whole string.
 */
const PARKED_TRANSFORM_MARKER = '-200%';

const waitForTooltipPositioned = async (page: Page) => {
  await expect(page.locator(VISIBLE_CONTENT_SELECTOR)).toBeVisible();

  await expect
    .poll(async () => {
      const transform = await page
        .locator(WRAPPER_SELECTOR)
        .evaluate((node: HTMLElement) => node.style.transform);

      return transform.includes(PARKED_TRANSFORM_MARKER);
    })
    .toBe(false);
};

export const combinations = multiCartesian<TooltipPlaygroundProps>([
  {
    corner: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    content: ['short', 'long'],
  },
]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('Tooltip', () => {
    test(label, async ({ mount, page, appearance, getSnapshotFileName }) => {
      await mount(
        <TooltipPlaygroundItem appearance={appearance} props={props} />
      );

      await waitForTooltipPositioned(page);
      await page.evaluate(() => document.fonts.ready);

      /**
       * The tooltip is portalled outside #root, so the content-clipped
       * fixture would crop it away.
       */
      expect(await page.screenshot({ animations: 'disabled' })).toMatchSnapshot(
        getSnapshotFileName(),
        { threshold: 0.02 }
      );
    });
  });
}

const CORNERS: TooltipPlaygroundProps['corner'][] = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
];

for (const corner of CORNERS) {
  test.describe(`Tooltip near ${corner} corner`, () => {
    test('stays inside the collision boundary', async ({
      mount,
      page,
      appearance,
    }) => {
      await mount(
        <TooltipPlaygroundItem
          appearance={appearance}
          props={{ corner, content: 'long' }}
        />
      );

      await waitForTooltipPositioned(page);

      const stage = await page.getByTestId(STAGE_TEST_ID).boundingBox();
      const box = await page.locator(VISIBLE_CONTENT_SELECTOR).boundingBox();

      expect(stage, 'stage has no bounding box').not.toBeNull();
      expect(box, 'tooltip content has no bounding box').not.toBeNull();

      expect(
        box!.x,
        'tooltip left edge is outside the stage'
      ).toBeGreaterThanOrEqual(stage!.x);
      expect(
        box!.y,
        'tooltip top edge is outside the stage'
      ).toBeGreaterThanOrEqual(stage!.y);
      expect(
        box!.x + box!.width,
        'tooltip right edge is outside the stage'
      ).toBeLessThanOrEqual(stage!.x + stage!.width);
      expect(
        box!.y + box!.height,
        'tooltip bottom edge is outside the stage'
      ).toBeLessThanOrEqual(stage!.y + stage!.height);
    });

    test('popup shifts while the arrow stays over the trigger', async ({
      mount,
      page,
      appearance,
    }) => {
      await mount(
        <TooltipPlaygroundItem
          appearance={appearance}
          props={{ corner, content: 'short' }}
        />
      );

      const arrow = page
        .locator('[data-radix-popper-content-wrapper] svg')
        .first();

      await waitForTooltipPositioned(page);
      await expect(arrow).toBeVisible();

      const arrowBox = await arrow.boundingBox();
      const triggerBox = await page.getByRole('button').boundingBox();

      expect(arrowBox, 'arrow has no bounding box').not.toBeNull();
      expect(triggerBox, 'trigger has no bounding box').not.toBeNull();

      const arrowCenter = arrowBox!.x + arrowBox!.width / 2;

      expect(
        arrowCenter,
        'arrow center is left of the trigger'
      ).toBeGreaterThanOrEqual(triggerBox!.x);
      expect(
        arrowCenter,
        'arrow center is right of the trigger'
      ).toBeLessThanOrEqual(triggerBox!.x + triggerBox!.width);
    });
  });
}

test.describe('Tooltip touch', () => {
  test('first tap shows the tooltip, second tap activates the trigger', async ({
    mount,
    page,
    hasTouch,
  }) => {
    test.skip(!hasTouch, 'Touch devices only');

    await mount(<TooltipTouchPlayground />);

    const trigger = page.getByRole('button', { name: 'Trigger' });
    const clickCount = page.locator('output');
    const content = page.locator(VISIBLE_CONTENT_SELECTOR);

    await trigger.tap();

    await expect(content).toBeVisible();
    await expect(clickCount).toHaveText('0');

    await trigger.tap();

    await expect(clickCount).toHaveText('1');
    await expect(content).toBeHidden();
  });

  test('tap on the content keeps the tooltip open', async ({
    mount,
    page,
    hasTouch,
  }) => {
    test.skip(!hasTouch, 'Touch devices only');

    await mount(<TooltipTouchPlayground />);

    const content = page.locator(VISIBLE_CONTENT_SELECTOR);

    await page.getByRole('button', { name: 'Trigger' }).tap();
    await expect(content).toBeVisible();

    await content.tap();

    await expect(page.locator('body')).toBeFocused();
    await expect(content).toBeVisible();
  });

  test('tap on another trigger closes the open tooltip', async ({
    mount,
    page,
    hasTouch,
  }) => {
    test.skip(!hasTouch, 'Touch devices only');

    await mount(<TooltipTouchPairPlayground />);

    /**
     * One visually hidden `role="tooltip"` copy per open tooltip
     */
    const tooltips = page.getByRole('tooltip');

    await page.getByRole('button', { name: 'First' }).tap();
    await expect(tooltips).toHaveText(['First tooltip']);

    await page.getByRole('button', { name: 'Second' }).tap();
    await expect(tooltips).toHaveText(['Second tooltip']);
  });
});
