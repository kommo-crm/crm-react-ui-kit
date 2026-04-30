import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import { type ContentBlockProps } from '../ContentBlock.props';

import {
  ContentBlockPrimaryPlaygroundItem,
  ContentBlockSecondaryPlaygroundItem,
} from './ContentBlock.e2e-playground';

export const combinations = multiCartesian<ContentBlockProps>([{}]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('ContentBlock', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <ContentBlockPrimaryPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('ContentBlock Secondary', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <ContentBlockSecondaryPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
