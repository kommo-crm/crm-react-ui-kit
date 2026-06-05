import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from '@ui-kit/tests/e2e/utils';

import { type RibbonProps } from '../Ribbon.props';

import {
  RibbonStandalonePlaygroundItem,
  RibbonWithChildrenPlaygroundItem,
} from './Ribbon.e2e-playground';

export const combinations = multiCartesian<RibbonProps>([{}]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('Ribbon standalone', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <RibbonStandalonePlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Ribbon with children', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <RibbonWithChildrenPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
