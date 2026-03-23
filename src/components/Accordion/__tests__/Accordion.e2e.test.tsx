import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import { AccordionPlaygroundItem } from './Accordion.e2e-playground';

interface AccordionTestProps {
  type: 'single' | 'multiple';
  defaultValue?: string | string[];
  isCollapsible?: boolean;
}

export const combinations = multiCartesian<AccordionTestProps>([
  {
    type: ['single'],
    defaultValue: ['1'],
  },
  {
    type: ['multiple'],
    defaultValue: [['1', '2']],
  },
  {
    type: ['multiple'],
    defaultValue: [[]],
    isCollapsible: [true],
  },
]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('Accordion', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <AccordionPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
