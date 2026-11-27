import React from 'react';
import { type Page } from '@playwright/test';
import { expect } from '@playwright/experimental-ct-react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from '@ui-kit/tests/e2e/utils';

import {
  InlineTabsFocusPlaygroundItem,
  InlineTabsPrimaryPlaygroundItem,
  InlineTabsSecondaryPlaygroundItem,
  type InlineTabsTestProps,
} from './InlineTabs.e2e-playground';

export const combinations = multiCartesian<InlineTabsTestProps>([
  {
    scenario: [
      'default',
      'selected',
      'hover',
      'overflow',
      'overflowSelected',
      'menuOpen',
      'truncated',
      'counters',
    ],
  },
]);

const prepare = async (
  page: Page,
  scenario: InlineTabsTestProps['scenario'],
  hasTouch: boolean
) => {
  await page.evaluate(() => document.fonts.ready);

  if (scenario === 'hover') {
    await page.getByRole('tab', { name: 'Media' }).hover();
  }

  if (scenario === 'menuOpen') {
    /**
     * The menu opens on hover, and on touch devices `ContextMenu` switches
     * to opening on tap.
     */
    const overflowButton = page.locator('button[aria-haspopup]');

    await (hasTouch ? overflowButton.tap() : overflowButton.hover());
    await page.getByRole('menu').waitFor();
  } else {
    await page.locator('[data-inline-tabs-slider]').waitFor();
  }

  /**
   * Lets the slider finish moving to the selected tab and the layout settle
   * after the fonts are loaded.
   */
  await page.waitForTimeout(500);
};

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('InlineTabs Primary', () => {
    test(
      label,
      async ({
        mount,
        page,
        hasTouch,
        appearance,
        expectScreenshotClippedToContent,
      }) => {
        await mount(
          <InlineTabsPrimaryPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await prepare(page, props.scenario, hasTouch);
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('InlineTabs Secondary', () => {
    test(
      label,
      async ({
        mount,
        page,
        hasTouch,
        appearance,
        expectScreenshotClippedToContent,
      }) => {
        await mount(
          <InlineTabsSecondaryPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await prepare(page, props.scenario, hasTouch);
        await expectScreenshotClippedToContent();
      }
    );
  });
}

test.describe('InlineTabs focus', () => {
  test('keeps focus on a tab shifted by a tab inserted before it', async ({
    mount,
    page,
    appearance,
  }) => {
    const tabs = ['Main', 'Products', 'Media'];

    const component = await mount(
      <InlineTabsFocusPlaygroundItem appearance={appearance} props={{ tabs }} />
    );

    await page.locator('[data-inline-tabs-slider]').waitFor();
    await page.getByRole('tab', { name: 'Media' }).focus();

    await component.update(
      <InlineTabsFocusPlaygroundItem
        appearance={appearance}
        props={{ tabs: ['New', ...tabs] }}
      />
    );

    await expect(page.getByRole('tab')).toHaveCount(4);
    await expect(page.getByRole('tab', { name: 'Media' })).toBeFocused();
  });
});
