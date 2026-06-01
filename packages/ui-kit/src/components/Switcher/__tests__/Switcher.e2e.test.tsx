import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import { SwitcherProps } from '../Switcher.props';

import { SwitcherPlaygroundItem } from './Switcher.e2e-playground';

export const combinations = multiCartesian<SwitcherProps>([
  {
    isDisabled: [true, false],
    isDefaultChecked: [true, false],
  },
]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('Switcher', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <SwitcherPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
