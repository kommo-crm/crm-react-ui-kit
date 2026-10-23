import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from '@ui-kit/tests/e2e/utils';
import { Appearance } from '@ui-kit/lib/appearance';
import { Platform } from '@ui-kit/lib/platform';

import { type GridProps } from '..';

import {
  GridDisplayPlaygroundItem,
  GridFlowPlaygroundItem,
  GridPlaygroundItem,
} from './Grid.e2e-playground';

const displayCombinations = multiCartesian<GridProps>([
  { columns: ['3'], display: ['grid', 'inline-grid'] },
]);

const columnsCombinations = multiCartesian<GridProps>([
  { columns: ['1', '3', '60px 1fr'] },
]);

const rowsCombinations = multiCartesian<GridProps>([
  { columns: ['3'], rows: ['2', '24px 1fr'] },
]);

const flowCombinations = multiCartesian<GridProps>([
  {
    columns: ['3'],
    rows: ['3'],
    flow: ['row', 'column', 'dense', 'row-dense', 'column-dense'],
  },
]);

const alignCombinations = multiCartesian<GridProps>([
  {
    columns: ['3'],
    align: ['start', 'center', 'end', 'baseline', 'stretch'],
  },
]);

const justifyCombinations = multiCartesian<GridProps>([
  {
    columns: ['repeat(3, 40px)'],
    justify: ['start', 'center', 'end', 'between'],
  },
]);

const alignContentCombinations = multiCartesian<GridProps>([
  {
    columns: ['3'],
    alignContent: [
      'start',
      'center',
      'end',
      'baseline',
      'between',
      'around',
      'evenly',
      'stretch',
    ],
  },
]);

const justifyItemsCombinations = multiCartesian<GridProps>([
  {
    columns: ['3'],
    justifyItems: ['start', 'center', 'end', 'baseline', 'stretch'],
  },
]);

const gapCombinations = multiCartesian<GridProps>([
  { columns: ['3'], gap: ['2'] },
  { columns: ['3'], gapX: ['1'], gapY: ['4'] },
]);

test.skip(
  ({ appearance, platform, browserName }) =>
    appearance !== Appearance.DEFAULT ||
    platform !== Platform.WEB ||
    browserName !== 'chromium',
  'Grid is a plain CSS grid wrapper with no theme or platform-specific styles'
);

test.describe('Grid display', () => {
  for (const props of displayCombinations) {
    test(
      prettyProps(props),
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <GridDisplayPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  }
});

test.describe('Grid columns', () => {
  for (const props of columnsCombinations) {
    test(
      prettyProps(props),
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <GridPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  }
});

test.describe('Grid rows', () => {
  for (const props of rowsCombinations) {
    test(
      prettyProps(props),
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <GridPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  }
});

test.describe('Grid flow', () => {
  for (const props of flowCombinations) {
    test(
      prettyProps(props),
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <GridFlowPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  }
});

test.describe('Grid align', () => {
  for (const props of alignCombinations) {
    test(
      prettyProps(props),
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <GridPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  }
});

test.describe('Grid justify', () => {
  for (const props of justifyCombinations) {
    test(
      prettyProps(props),
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <GridPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  }
});

test.describe('Grid gap', () => {
  for (const props of gapCombinations) {
    test(
      prettyProps(props),
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <GridPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  }
});

test.describe('Grid alignContent', () => {
  for (const props of alignContentCombinations) {
    test(
      prettyProps(props),
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <GridPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  }
});

test.describe('Grid justifyItems', () => {
  for (const props of justifyItemsCombinations) {
    test(
      prettyProps(props),
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <GridPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  }
});
