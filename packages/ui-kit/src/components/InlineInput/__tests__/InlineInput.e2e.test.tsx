import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';
import { FOCUSABLE_ELEMENT_ID } from 'src/tests/e2e/constants';

import {
  InlineInputPlaygroundItem,
  type InlineInputTestProps,
} from './InlineInput.e2e-playground';

const baseCombinations = multiCartesian<InlineInputTestProps>([
  {
    variant: ['primary', 'primaryFocused'],
    value: ['Jhon', undefined],
    isDisabled: [true, false],
  },
  {
    variant: ['primary', 'primaryFocused'],
    value: ['Jhon', undefined],
    isDisabled: [true, false],
    placeholder: ['Placeholder'],
  },
  {
    variant: ['primary', 'primaryFocused'],
    isInvalid: [true],
    invalidDescription: ['Required field'],
    value: ['Jhon', undefined],
  },
]);

for (const props of baseCombinations) {
  const label = prettyProps(props);

  test.describe('Inline Input', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <InlineInputPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}

const focusedCombinations = multiCartesian<InlineInputTestProps>([
  {
    variant: ['primary', 'primaryFocused'],
    value: ['Jhon'],
    id: [FOCUSABLE_ELEMENT_ID],
  },
]);

for (const props of focusedCombinations) {
  const label = prettyProps(props);

  test.describe('Inline Input Focused', () => {
    test(
      label,
      async ({
        mount,
        appearance,
        expectScreenshotClippedToContent,
        setFocusOnElement,
      }) => {
        await mount(
          <InlineInputPlaygroundItem appearance={appearance} props={props} />
        );
        await setFocusOnElement();
        await expectScreenshotClippedToContent();
      }
    );
  });
}

const invalidFocusedCombinations = multiCartesian<InlineInputTestProps>([
  {
    variant: ['primary', 'primaryFocused'],
    value: ['Jhon'],
    isInvalid: [true],
    invalidDescription: ['Required field'],
    id: [FOCUSABLE_ELEMENT_ID],
  },
]);

for (const props of invalidFocusedCombinations) {
  const label = prettyProps(props);

  test.describe('Inline Input Invalid Focused', () => {
    test(
      label,
      async ({
        mount,
        appearance,
        expectScreenshotClippedToContent,
        setFocusOnElement,
      }) => {
        await mount(
          <InlineInputPlaygroundItem appearance={appearance} props={props} />
        );
        await setFocusOnElement();
        await expectScreenshotClippedToContent();
      }
    );
  });
}
