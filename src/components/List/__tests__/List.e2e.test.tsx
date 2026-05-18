import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import { ListProps } from '../List.props';

import {
  BulletedListPlaygroundItem,
  NumberedListPlaygroundItem,
} from './List.e2e-playground';

export const combinations = multiCartesian<ListProps>([{}]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('List Bulleted', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <BulletedListPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('List Numbered', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <NumberedListPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
