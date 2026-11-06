import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from '@ui-kit/tests/e2e/utils';

import { type ProgressBarRootProps } from '..';

import { ProgressBarPrimaryPlaygroundItem } from './ProgressBar.e2e-playground';

export const primaryCombinations = multiCartesian<ProgressBarRootProps>([
  { value: [0, 50, 100] },
]);

for (const props of primaryCombinations) {
  const label = prettyProps(props);

  test.describe('ProgressBar Primary', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <ProgressBarPrimaryPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
