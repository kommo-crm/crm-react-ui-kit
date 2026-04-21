import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import {
  SelectPlaygroundItem,
  type SelectTestProps,
} from './Select.e2e-playground';

export const combinations = multiCartesian<SelectTestProps>([
  {
    isDisabled: [true, false],
  },
  {
    isInvalid: [true, false],
  },
  {
    isDefaultOpen: [false],
  },
  {
    isDefaultOpen: [true],
    useHeightWrapper: [true],
  },
  {
    isDefaultOpen: [true],
    useHeightWrapper: [true],
    defaultValue: [{ value: 'option1', option: 'Option 1' }],
  },
]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('Select', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <SelectPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
