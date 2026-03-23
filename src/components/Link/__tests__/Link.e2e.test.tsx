import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import { type LinkProps } from '..';

import { LinkPlaygroundItem } from './Link.e2e-playground';

export const combinations = multiCartesian<LinkProps>([{}]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('Link', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <LinkPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
