import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import { SpinnerProps } from '../Spinner.props';

import { SpinnerPlaygroundItem } from './Spinner.e2e-playground';

export const combinations = multiCartesian<SpinnerProps>([
  {
    isCentered: [true, false],
  },
]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('Spinner', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <SpinnerPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
