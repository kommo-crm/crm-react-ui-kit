import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import {
  InputLightPlaygroundItem,
  InputDarkPlaygroundItem,
  type InputTestProps,
} from './Input.e2e-playground';

export const combinations = multiCartesian<InputTestProps>([
  {
    value: ['Jhon', undefined],
    isDisabled: [true, false],
  },
  {
    value: ['Jhon', undefined],
    isDisabled: [true, false],
    placeholder: ['Placeholder'],
  },
  {
    isInvalid: [true],
    invalidDescription: ['Required field'],
    invalidDescriptionPlacement: ['bottom', 'right'],
    value: ['Jhon', undefined],
  },
  {
    value: ['Jhon'],
    before: ['NeutralButton', 'SpinnerIcon'],
    after: ['SettingsIcon', 'PrimaryButton'],
  },
]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('Input Light', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <InputLightPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Input Dark', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <InputDarkPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
