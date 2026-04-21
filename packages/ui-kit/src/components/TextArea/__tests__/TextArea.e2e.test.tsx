import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import { type TextAreaProps } from '../TextArea.props';

import {
  TextAreaLightPlaygroundItem,
  TextAreaDarkPlaygroundItem,
} from './TextArea.e2e-playground';

export const combinations = multiCartesian<TextAreaProps>([
  {
    isDisabled: [true, false],
    placeholder: ['Name', undefined],
    value: ['Jhon', undefined],
  },
  {
    isInvalid: [true],
    invalidDescription: ['Required field'],
    value: ['Jhon', undefined],
    isDisabled: [true, false],
  },
]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('TextArea Light', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <TextAreaLightPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('TextArea Dark', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <TextAreaDarkPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
