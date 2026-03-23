import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import { type ContentBlockProps } from '../ContentBlock.props';

import { ContentBlockPlaygroundItem } from './ContentBlock.e2e-playground';

export const combinations = multiCartesian<ContentBlockProps>([{}]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('ContentBlock', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <ContentBlockPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
