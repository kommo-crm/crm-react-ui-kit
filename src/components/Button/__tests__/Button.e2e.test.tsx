import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import { IconsMap } from '@storybook-utils/constants';

import { ButtonProps } from '../Button.props';

import {
  ButtonNeutralPlaygroundItem,
  ButtonPrimaryPlaygroundItem,
  ButtonSecondaryPlaygroundItem,
  ButtonDangerPrimaryPlaygroundItem,
  ButtonDangerTertiaryPlaygroundItem,
  ButtonIconPlaygroundItem,
} from './Button.e2e-playground';

export const combinations = multiCartesian<ButtonProps>([
  { isLoading: [true, false], isDisabled: [true, false] },
  {
    before: [IconsMap.CalendarIcon, undefined],
    after: [IconsMap.CopyIcon, undefined],
  },
]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('Button Neutral', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <ButtonNeutralPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Button Primary', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <ButtonPrimaryPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Button Secondary', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <ButtonSecondaryPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Button Danger Primary', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <ButtonDangerPrimaryPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('Button Danger Tertiary', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <ButtonDangerTertiaryPlaygroundItem
            appearance={appearance}
            props={props}
          />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}

const iconCombinations = multiCartesian<ButtonProps>([
  { isLoading: [true, false], isDisabled: [true, false] },
]);

for (const props of iconCombinations) {
  const label = prettyProps(props);

  test.describe('Button Icon', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <ButtonIconPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
