import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import {
  ContextMenuPlaygroundItem,
  type ContextMenuComponentProps,
} from './ContextMenu.e2e-playground';

export const combinations = multiCartesian<ContextMenuComponentProps>([
  {
    isDefaultOpenSubMenu: [true],
    isDefaultOpenSub: [false],
    direction: ['down-right'],
  },
  {
    isDefaultOpenSubMenu: [false],
    isDefaultOpenSub: [true],
    direction: ['down-right'],
    isCheckboxChecked: [true],
  },
  {
    isDefaultOpenSubMenu: [false],
    isDefaultOpenSub: [true],
    direction: ['down-right'],
    isCheckboxChecked: [false],
  },
  {
    isDefaultOpenSubMenu: [false],
    isDefaultOpenSub: [false],
    direction: [
      'down-right',
      'down-left',
      'up-right',
      'up-left',
      'right-up',
      'right-down',
      'left-up',
      'left-down',
    ],
  },
]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('ContextMenu', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <ContextMenuPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
