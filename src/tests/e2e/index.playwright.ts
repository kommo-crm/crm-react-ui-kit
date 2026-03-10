import hash from 'hash-sum';

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
      const [testName, props] = testInfo.titlePath
        .filter((path) => !/.+\.ts(x)?$/.test(path))
        .map((path) => path.toLowerCase().replace(/\s+/g, '-'));

      /*
        Only Button component supports snapshot splitting by props
        See: https://github.com/kommo-crm/crm-react-ui-kit/issues/20
      */
      if (!/button/gi.test(testName)) {
        return [testInfo.title, platform, browserName, appearance, 'snap.png']
          .join('-')
          .toLowerCase();
      }

      const hashedProps = hash(props);

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
