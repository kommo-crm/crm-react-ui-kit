import { test as testBase, expect } from '@playwright/experimental-ct-react';

import { Appearance } from 'src/lib/appearance';

import { Platform } from 'src/lib/platform';

import { type TestOptions } from './types';

import { FOCUSABLE_ELEMENT_ID } from './constants';

import { screenshotWithClipToContent } from './screenshotWithClipToContent';

export const test = testBase.extend<TestOptions>({
  appearance: [Appearance.DEFAULT, { option: true }],
  platform: [Platform.ANDROID, { option: true }],

  toMatchSnapshot: [{ threshold: 0.02 }, { option: true }],

  expectScreenshotClippedToContent: async (
    { page, browserName, toMatchSnapshot, getSnapshotFileName },
    use
  ) => {
    const response = async () => {
      const snapshotName = getSnapshotFileName();

      expect(
        await screenshotWithClipToContent(page, browserName)
      ).toMatchSnapshot(snapshotName, toMatchSnapshot);
    };

    await use(response);
  },

  setFocusOnElement: async ({ page }, use) => {
    const focus = async () => {
      const element = page.locator(`#${FOCUSABLE_ELEMENT_ID}`);

      await element.focus();
    };

    await use(focus);
  },

  getSnapshotFileName: async (
    { browserName, platform, appearance },
    use,
    testInfo
  ) => {
    const getFileName = () => {
      return [testInfo.title, platform, browserName, appearance, 'snap.png']
        .join('-')
        .toLowerCase();
    };

    await use(getFileName);
  },
});
