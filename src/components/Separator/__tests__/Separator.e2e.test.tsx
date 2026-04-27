import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import { type SeparatorProps } from '..';

import {
  SeparatorRoundedPlaygroundItem,
  SeparatorSquarePlaygroundItem,
} from './Separator.e2e-playground';

export const combinations = multiCartesian<SeparatorProps>([
  {
    orientation: ['horizontal', 'vertical'],
  },
]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('Separator Rounded', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <SeparatorRoundedPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Separator Square', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <SeparatorSquarePlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
