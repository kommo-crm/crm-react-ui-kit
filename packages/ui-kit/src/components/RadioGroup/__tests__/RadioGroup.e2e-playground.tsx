import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@/tests/e2e/ComponentPlayground';

import { LabelTheme } from '@/components/Label';
import {
  Text,
  TextPrimaryTheme,
  TextSecondaryLightTheme,
} from '@/components/Text';

import {
  RadioGroup,
  RadioPrimaryTheme,
  RadioGroupTheme,
  RadioGroupItemRootTheme,
} from '..';

const handleChange = Function.prototype as unknown as (value: string) => void;

export type RadioGroupVariant = 'withDescription' | 'withoutDescription';

export interface RadioGroupTestProps {
  variant: RadioGroupVariant;
  orientation?: 'horizontal' | 'vertical';
  isDisabled?: boolean;
}

const variantChildrenMap: Record<RadioGroupVariant, React.ReactNode> = {
  withDescription: (
    <React.Fragment key="with-description">
      <RadioGroup.ItemRoot theme={RadioGroupItemRootTheme} value="s">
        <RadioGroup.Label
          textPlacement="right"
          theme={LabelTheme}
          description={
            <Text size="m" theme={TextSecondaryLightTheme}>
              Description of S Radio
            </Text>
          }
          text={
            <Text size="l" theme={TextPrimaryTheme}>
              S Value
            </Text>
          }
        >
          <RadioGroup.Radio theme={RadioPrimaryTheme} />
        </RadioGroup.Label>
      </RadioGroup.ItemRoot>
      <RadioGroup.ItemRoot theme={RadioGroupItemRootTheme} value="m">
        <RadioGroup.Label
          textPlacement="right"
          theme={LabelTheme}
          description={
            <Text size="m" theme={TextSecondaryLightTheme}>
              Description of M Radio
            </Text>
          }
          text={
            <Text size="l" theme={TextPrimaryTheme}>
              M Value
            </Text>
          }
        >
          <RadioGroup.Radio theme={RadioPrimaryTheme} />
        </RadioGroup.Label>
      </RadioGroup.ItemRoot>
    </React.Fragment>
  ),
  withoutDescription: (
    <React.Fragment key="without-description">
      <RadioGroup.ItemRoot theme={RadioGroupItemRootTheme} value="s">
        <RadioGroup.Label
          textPlacement="right"
          theme={LabelTheme}
          text={
            <Text size="l" theme={TextPrimaryTheme}>
              S Value
            </Text>
          }
        >
          <RadioGroup.Radio theme={RadioPrimaryTheme} />
        </RadioGroup.Label>
      </RadioGroup.ItemRoot>
      <RadioGroup.ItemRoot theme={RadioGroupItemRootTheme} value="m">
        <RadioGroup.Label
          textPlacement="right"
          theme={LabelTheme}
          text={
            <Text size="l" theme={TextPrimaryTheme}>
              M Value
            </Text>
          }
        >
          <RadioGroup.Radio theme={RadioPrimaryTheme} />
        </RadioGroup.Label>
      </RadioGroup.ItemRoot>
    </React.Fragment>
  ),
};

export const RadioGroupPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<RadioGroupTestProps>) => (
  <ComponentPlayground<RadioGroupTestProps>
    appearance={appearance}
    props={props}
  >
    {({ variant, ...restProps }) => (
      <RadioGroup
        {...restProps}
        theme={RadioGroupTheme}
        name="size"
        onChange={handleChange}
      >
        {variantChildrenMap[variant]}
      </RadioGroup>
    )}
  </ComponentPlayground>
);
