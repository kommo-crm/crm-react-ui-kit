import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from '@ui-kit/tests/e2e/utils';
import { Appearance } from '@ui-kit/lib/appearance';
import { Platform } from '@ui-kit/lib/platform';

import { type AspectRatioProps } from '..';

import { AspectRatioPlaygroundItem } from './AspectRatio.e2e-playground';

const ratioCombinations = multiCartesian<AspectRatioProps>([
  { ratio: [1, 16 / 9, 9 / 16] },
]);

test.describe('AspectRatio ratio', () => {
  test.skip(
    ({ appearance, platform }) =>
      appearance !== Appearance.DEFAULT || platform !== Platform.WEB,
    'The component has no theme and does not depend on the viewport'
  );

  for (const props of ratioCombinations) {
    test(
      prettyProps(props),
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        const component = await mount(
          <AspectRatioPlaygroundItem appearance={appearance} props={props} />
        );

        /**
         * The screenshot helper waits only for fonts, so without this the image
         * may still be loading when the screenshot is taken. `decode()` also
         * rejects on a missing file, failing the test instead of capturing
         * an empty block.
         */
        await component
          .locator('img')
          .evaluate((img: HTMLImageElement) => img.decode());
        await expectScreenshotClippedToContent();
      }
    );
  }
});
