import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import {
  RadioGroupPlaygroundItem,
  type RadioGroupTestProps,
} from './RadioGroup.e2e-playground';

export const combinations = multiCartesian<RadioGroupTestProps>([
  {
    variant: ['withDescription', 'withoutDescription'],
    orientation: ['horizontal', 'vertical'],
  },
  {
    variant: ['withDescription'],
    isDisabled: [true],
  },
]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('RadioGroup', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <RadioGroupPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
