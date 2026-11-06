import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from '@ui-kit/tests/e2e/utils';
import { Platform } from '@ui-kit/lib/platform';

import { type SkeletonProps } from '..';

import {
  SkeletonCirclePlaygroundItem,
  SkeletonElementPlaygroundItem,
  SkeletonEmptyPlaygroundItem,
} from './Skeleton.e2e-playground';

const combinations = multiCartesian<SkeletonProps>([{}]);

const elementCombinations = multiCartesian<SkeletonProps>([
  { isLoading: [true, false] },
]);

test.skip(
  ({ platform }) => platform !== Platform.WEB,
  'Skeleton has no platform-specific styles'
);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('Skeleton Empty', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <SkeletonEmptyPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Skeleton Circle', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <SkeletonCirclePlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}

for (const props of elementCombinations) {
  const label = prettyProps(props);

  test.describe('Skeleton Element', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <SkeletonElementPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
