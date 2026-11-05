import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from '@ui-kit/tests/e2e/utils';
import { Appearance } from '@ui-kit/lib/appearance';
import { Platform } from '@ui-kit/lib/platform';

import { type FlexProps } from '..';

import {
  FlexDisplayPlaygroundItem,
  FlexPlaygroundItem,
  FlexWrapPlaygroundItem,
} from './Flex.e2e-playground';

const displayCombinations = multiCartesian<FlexProps>([
  { display: ['flex', 'inline-flex'] },
]);

const directionCombinations = multiCartesian<FlexProps>([
  { direction: ['row', 'column', 'row-reverse', 'column-reverse'] },
]);

const alignCombinations = multiCartesian<FlexProps>([
  { align: ['start', 'center', 'end', 'baseline', 'stretch'] },
]);

const justifyCombinations = multiCartesian<FlexProps>([
  { justify: ['start', 'center', 'end', 'between'] },
]);

const gapCombinations = multiCartesian<FlexProps>([{ gap: ['2'] }]);

const wrapCombinations = multiCartesian<FlexProps>([
  { wrap: ['nowrap', 'wrap', 'wrap-reverse'], gapX: ['1'], gapY: ['4'] },
]);

test.skip(
  ({ appearance, platform, browserName }) =>
    appearance !== Appearance.DEFAULT ||
    platform !== Platform.WEB ||
    browserName !== 'chromium',
  'Flex is a plain CSS flex wrapper with no theme or platform-specific styles'
);

test.describe('Flex display', () => {
  for (const props of displayCombinations) {
    test(
      prettyProps(props),
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <FlexDisplayPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  }
});

test.describe('Flex direction', () => {
  for (const props of directionCombinations) {
    test(
      prettyProps(props),
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <FlexPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  }
});

test.describe('Flex align', () => {
  for (const props of alignCombinations) {
    test(
      prettyProps(props),
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <FlexPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  }
});

test.describe('Flex justify', () => {
  for (const props of justifyCombinations) {
    test(
      prettyProps(props),
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <FlexPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  }
});

test.describe('Flex gap', () => {
  for (const props of gapCombinations) {
    test(
      prettyProps(props),
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <FlexPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  }
});

test.describe('Flex wrap', () => {
  for (const props of wrapCombinations) {
    test(
      prettyProps(props),
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <FlexWrapPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  }
});
