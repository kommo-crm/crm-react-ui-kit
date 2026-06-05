import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from '@ui-kit/tests/e2e/utils';

import { type SeparatorProps } from '..';

import {
  SeparatorRoundedLightPlaygroundItem,
  SeparatorSquaredLightPlaygroundItem,
  SeparatorRoundedDarkPlaygroundItem,
  SeparatorSquaredDarkPlaygroundItem,
} from './Separator.e2e-playground';

export const combinations = multiCartesian<SeparatorProps>([
  {
    orientation: ['horizontal', 'vertical'],
  },
]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('Separator Rounded Light', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <SeparatorRoundedLightPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Separator Square Light', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <SeparatorSquaredLightPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Separator Rounded Dark', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <SeparatorRoundedDarkPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Separator Square Dark', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <SeparatorSquaredDarkPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
