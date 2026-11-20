import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from '@ui-kit/tests/e2e/utils';

import {
  SelectPlaygroundItem,
  SelectPlaygroundItemWithJsxOptions,
  type SelectTestProps,
} from './Select.e2e-playground';

export const combinations = multiCartesian<SelectTestProps>([
  {
    isDisabled: [true, false],
  },
  {
    isInvalid: [true, false],
  },
  {
    isDefaultOpen: [false],
  },
  {
    isDefaultOpen: [true],
    useHeightWrapper: [true],
  },
  {
    isDefaultOpen: [true],
    useHeightWrapper: [true],
    defaultValue: [{ value: 'option1', option: 'Option 1' }],
  },
  {
    isOpenedToTop: [true],
  },
  {
    isOpenedToTop: [true],
    defaultValue: [{ value: 'option1', option: 'Option 1' }],
  },
]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('Select', () => {
    test(
      label,
      async ({ mount, page, appearance, expectScreenshotClippedToContent }) => {
        if (props.isOpenedToTop) {
          const viewportSize = page.viewportSize();

          if (viewportSize) {
            await page.setViewportSize({
              width: viewportSize.width,
              height: 150,
            });
          }
        }

        await mount(
          <SelectPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Select with JSX options', () => {
    test(
      label,
      async ({ mount, page, appearance, expectScreenshotClippedToContent }) => {
        if (props.isOpenedToTop) {
          const viewportSize = page.viewportSize();

          if (viewportSize) {
            await page.setViewportSize({
              width: viewportSize.width,
              height: 150,
            });
          }
        }

        await mount(
          <SelectPlaygroundItemWithJsxOptions
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
