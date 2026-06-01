import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import {
  FilterTabsPlaygroundItem,
  type FilterTabsTestProps,
} from './FilterTabs.e2e-playground';

export const combinations = multiCartesian<FilterTabsTestProps>([
  {
    variant: ['default'],
    orientation: ['horizontal', 'vertical'],
  },
  {
    variant: ['default'],
    isDisabled: [true],
  },
  {
    variant: ['withDefaultActive'],
    isMultiSelect: [true],
  },
]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('FilterTabs', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <FilterTabsPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
