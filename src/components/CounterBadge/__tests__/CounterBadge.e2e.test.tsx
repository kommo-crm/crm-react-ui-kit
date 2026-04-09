import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import { CounterBadgeProps } from '../CounterBadge.props';

import {
  CounterBadgePlaygroundItem,
  CounterBadgeSmallPlaygroundItem,
} from './CounterBadge.e2e-playground';

export const combinations = multiCartesian<CounterBadgeProps>([{}]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('CounterBadge', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <CounterBadgePlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('CounterBadge Small', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <CounterBadgeSmallPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
