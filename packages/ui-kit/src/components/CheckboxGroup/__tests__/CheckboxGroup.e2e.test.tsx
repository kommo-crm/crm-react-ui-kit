import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import {
  CheckboxGroupPlaygroundItem,
  type CheckboxGroupTestProps,
} from './CheckboxGroup.e2e-playground';

export const combinations = multiCartesian<CheckboxGroupTestProps>([
  {
    variant: ['withSelectAll'],
    orientation: ['horizontal', 'vertical'],
  },
  {
    variant: ['withoutSelectAll'],
    isDisabled: [true],
  },
  {
    variant: ['partialChecked', 'allChecked'],
  },
]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('CheckboxGroup', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <CheckboxGroupPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
