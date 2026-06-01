import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import {
  LabelPlaygroundItem,
  type LabelTestProps,
} from './Label.e2e-playground';

export const combinations = multiCartesian<LabelTestProps>([
  {
    textVariant: ['default'],
    hasDescription: [true, false],
    textPlacement: ['left', 'right', 'top'],
  },
  {
    textVariant: ['small'],
    isCentered: [true],
    textPlacement: ['left', 'right'],
  },
]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('Label', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <LabelPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
