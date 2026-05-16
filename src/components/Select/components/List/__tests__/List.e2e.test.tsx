import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import { type ListProps } from '..';

import {
  ListErrorPlaygroundItem,
  ListPlaygroundItem,
  ListPrimaryPlaygroundItem,
  ListSecondaryDarkPlaygroundItem,
  ListSecondaryLightPlaygroundItem,
} from './List.e2e-playground';

const nestingCombinations = multiCartesian<ListProps>([
  {
    type: ['bulleted', 'numbered'],
  },
]);

for (const props of nestingCombinations) {
  const label = prettyProps(props);

  test.describe('List', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <ListPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}

const sizeCombinations = multiCartesian<ListProps>([
  {
    type: ['bulleted', 'numbered'],
    size: ['s', 'm', 'ms', 'l', 'xl'],
  },
]);

for (const props of sizeCombinations) {
  const label = prettyProps(props);

  test.describe('List Primary', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <ListPrimaryPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('List Secondary Light', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <ListSecondaryLightPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('List Secondary Dark', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <ListSecondaryDarkPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('List Error', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <ListErrorPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
