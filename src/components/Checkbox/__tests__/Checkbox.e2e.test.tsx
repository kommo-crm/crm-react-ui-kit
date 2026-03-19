import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import { type CheckboxProps } from '..';

import {
  CheckboxLightPlaygroundItem,
  CheckboxSmallLightPlaygroundItem,
  CheckboxDarkPlaygroundItem,
  CheckboxSmallDarkPlaygroundItem,
} from './Checkbox.e2e-playground';

export const combinations = multiCartesian<CheckboxProps>([
  {
    isDisabled: [false, true],
    checkedStyle: ['mark', 'indeterminate'],
    isDefaultChecked: [true, false],
  },
  {
    isInvalid: [true],
    isDisabled: [false, true],
    isDefaultChecked: [true, false],
  },
]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('Checkbox Light', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <CheckboxLightPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Checkbox Small Light', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <CheckboxSmallLightPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Checkbox Dark', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <CheckboxDarkPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Checkbox Small Dark', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <CheckboxSmallDarkPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
