import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from '@ui-kit/tests/e2e/utils';

import {
  TextAreaLightPlaygroundItem,
  TextAreaDarkPlaygroundItem,
  type TextAreaTestProps,
} from './TextArea.e2e-playground';

/**
 * Headless Chromium hides native scrollbars by default
 */
test.use({ launchOptions: { ignoreDefaultArgs: ['--hide-scrollbars'] } });

export const combinations = multiCartesian<TextAreaTestProps>([
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
  {
    rows: [1, 2, 4],
    placeholder: ['Name'],
  },
  {
    rows: [2],
    value: ['Line 1\nLine 2\nLine 3\nLine 4'],
  },
]);

const scrollCombinations = multiCartesian<TextAreaTestProps>([
  {
    value: [Array.from({ length: 10 }, (_, i) => `Line ${i + 1}`).join('\n')],
    rows: [3],
    isDisabled: [true, false],
    scrollPosition: ['start', 'middle', 'end'],
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

for (const props of scrollCombinations) {
  const label = prettyProps(props);

  test.describe('TextArea Scroll Light', () => {
    /**
     * Headless Firefox doesn't render native scrollbars at all
     */
    test.skip(({ browserName }) => browserName === 'firefox');

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

  test.describe('TextArea Scroll Dark', () => {
    /**
     * Headless Firefox doesn't render native scrollbars at all
     */
    test.skip(({ browserName }) => browserName === 'firefox');

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
