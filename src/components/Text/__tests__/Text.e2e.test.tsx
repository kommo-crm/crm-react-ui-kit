import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import { type TextProps } from '..';

import {
  TextPlaygroundItem,
  TextPrimaryPlaygroundItem,
  TextSecondaryLightPlaygroundItem,
  TextSecondaryDarkPlaygroundItem,
  TextErrorPlaygroundItem,
  TextInheritColorPlaygroundItem,
} from './Text.e2e-playground';

const ellipsisCombinations = multiCartesian<TextProps>([
  {
    size: ['m'],
    isEllipsis: [true, false],
    maxRows: [undefined, 2],
  },
]);

for (const props of ellipsisCombinations) {
  const label = prettyProps(props);

  test.describe('Text', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <TextPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}

const sizeCombinations = multiCartesian<TextProps>([
  { size: ['s', 'm', 'ms', 'l', 'xl'] },
]);

for (const props of sizeCombinations) {
  const label = prettyProps(props);

  test.describe('Text Primary', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <TextPrimaryPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Text Secondary Light', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <TextSecondaryLightPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Text Secondary Dark', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <TextSecondaryDarkPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Text Error', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <TextErrorPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Text Inherit Color', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <TextInheritColorPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
