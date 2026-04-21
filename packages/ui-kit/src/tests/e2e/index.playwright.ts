import hash from 'hash-sum';

import { test as testBase, expect } from '@playwright/experimental-ct-react';

import { Appearance } from '@/lib/appearance';

import { Platform } from '@/lib/platform';

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
      const [testName, props] = testInfo.titlePath
        .filter((path) => !/.+\.ts(x)?$/.test(path))
        .map((path) => path.toLowerCase().replace(/\s+/g, '-'));

      const hashedProps = hash(props);

      /**
       *  This is necessary for the correct formation
       *  of the folder structure
       *  w/o array we get a long-named snapshot
       */
      return [
        platform,
        browserName,
        appearance,
        `${testName}-${hashedProps}.png`,
      ];
    };

    await use(getFileName);
  },
});
