import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import { type LabelProps } from '..';

import {
  LabelPlaygroundItem,
  labelText,
  labelTextSmall,
  labelDescription,
} from './Label.e2e-playground';

export const combinations = multiCartesian<LabelProps>([
  {
    text: [labelText],
    description: [undefined, labelDescription],
    textPlacement: ['left', 'right', 'top'],
  },
  {
    isCentered: [true],
    textPlacement: ['left', 'right'],
    text: [labelTextSmall],
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
