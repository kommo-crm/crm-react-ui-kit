import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import {
  CalloutInfoPlaygroundItem,
  CalloutSuccessPlaygroundItem,
  CalloutWarningPlaygroundItem,
  CalloutErrorPlaygroundItem,
  type CalloutTestProps,
} from './Callout.e2e-playground';

export const combinations = multiCartesian<CalloutTestProps>([
  {},
  { isClosable: [true] },
]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('Callout Info', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <CalloutInfoPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Callout Success', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <CalloutSuccessPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Callout Warning', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <CalloutWarningPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Callout Error', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <CalloutErrorPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
