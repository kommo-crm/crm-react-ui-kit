import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@/tests/e2e/ComponentPlayground';

import { LabelTheme } from '@/components/Label';
import { Text, TextPrimaryTheme } from '@/components/Text';
import { CheckboxLightTheme } from '@/components/Checkbox';

import {
  CheckboxGroup,
  CheckboxGroupItemRootTheme,
  CheckboxGroupTheme,
} from '..';

export type CheckboxGroupVariant =
  | 'withSelectAll'
  | 'withoutSelectAll'
  | 'partialChecked'
  | 'allChecked';

export interface CheckboxGroupTestProps {
  variant: CheckboxGroupVariant;
  orientation?: 'horizontal' | 'vertical';
  isDisabled?: boolean;
}

const variantChildrenMap: Record<CheckboxGroupVariant, React.ReactNode> = {
  withSelectAll: (
    <React.Fragment key="with-select-all">
      <CheckboxGroup.ItemRootSelectAll theme={CheckboxGroupItemRootTheme}>
        <CheckboxGroup.Label
          textPlacement="right"
          theme={LabelTheme}
          text={
            <Text size="l" theme={TextPrimaryTheme}>
              Select All
            </Text>
          }
        >
          <CheckboxGroup.CheckboxSelectAll theme={CheckboxLightTheme} />
        </CheckboxGroup.Label>
      </CheckboxGroup.ItemRootSelectAll>
      <CheckboxGroup.ItemRoot
        theme={CheckboxGroupItemRootTheme}
        name="s"
        value="s"
      >
        <CheckboxGroup.Label
          textPlacement="right"
          theme={LabelTheme}
          text={
            <Text size="l" theme={TextPrimaryTheme}>
              S Name
            </Text>
          }
        >
          <CheckboxGroup.Checkbox theme={CheckboxLightTheme} />
        </CheckboxGroup.Label>
      </CheckboxGroup.ItemRoot>
      <CheckboxGroup.ItemRoot
        theme={CheckboxGroupItemRootTheme}
        name="m"
        value="m"
      >
        <CheckboxGroup.Label
          textPlacement="right"
          theme={LabelTheme}
          text={
            <Text size="l" theme={TextPrimaryTheme}>
              M Name
            </Text>
          }
        >
          <CheckboxGroup.Checkbox theme={CheckboxLightTheme} />
        </CheckboxGroup.Label>
      </CheckboxGroup.ItemRoot>
    </React.Fragment>
  ),
  withoutSelectAll: (
    <React.Fragment key="without-select-all">
      <CheckboxGroup.ItemRoot
        theme={CheckboxGroupItemRootTheme}
        name="s"
        value="s"
      >
        <CheckboxGroup.Label
          textPlacement="right"
          theme={LabelTheme}
          text={
            <Text size="l" theme={TextPrimaryTheme}>
              S Name
            </Text>
          }
        >
          <CheckboxGroup.Checkbox theme={CheckboxLightTheme} />
        </CheckboxGroup.Label>
      </CheckboxGroup.ItemRoot>
      <CheckboxGroup.ItemRoot
        theme={CheckboxGroupItemRootTheme}
        name="m"
        value="m"
      >
        <CheckboxGroup.Label
          textPlacement="right"
          theme={LabelTheme}
          text={
            <Text size="l" theme={TextPrimaryTheme}>
              M Name
            </Text>
          }
        >
          <CheckboxGroup.Checkbox theme={CheckboxLightTheme} />
        </CheckboxGroup.Label>
      </CheckboxGroup.ItemRoot>
    </React.Fragment>
  ),
  partialChecked: (
    <React.Fragment key="partial-checked">
      <CheckboxGroup.ItemRootSelectAll theme={CheckboxGroupItemRootTheme}>
        <CheckboxGroup.Label
          textPlacement="right"
          theme={LabelTheme}
          text={
            <Text size="l" theme={TextPrimaryTheme}>
              Select All
            </Text>
          }
        >
          <CheckboxGroup.CheckboxSelectAll theme={CheckboxLightTheme} />
        </CheckboxGroup.Label>
      </CheckboxGroup.ItemRootSelectAll>
      <CheckboxGroup.ItemRoot
        theme={CheckboxGroupItemRootTheme}
        isDefaultChecked={true}
        name="s"
        value="s"
      >
        <CheckboxGroup.Label
          textPlacement="right"
          theme={LabelTheme}
          text={
            <Text size="l" theme={TextPrimaryTheme}>
              S Name
            </Text>
          }
        >
          <CheckboxGroup.Checkbox theme={CheckboxLightTheme} />
        </CheckboxGroup.Label>
      </CheckboxGroup.ItemRoot>
      <CheckboxGroup.ItemRoot
        theme={CheckboxGroupItemRootTheme}
        name="m"
        value="m"
      >
        <CheckboxGroup.Label
          textPlacement="right"
          theme={LabelTheme}
          text={
            <Text size="l" theme={TextPrimaryTheme}>
              M Name
            </Text>
          }
        >
          <CheckboxGroup.Checkbox theme={CheckboxLightTheme} />
        </CheckboxGroup.Label>
      </CheckboxGroup.ItemRoot>
    </React.Fragment>
  ),
  allChecked: (
    <React.Fragment key="all-checked">
      <CheckboxGroup.ItemRootSelectAll theme={CheckboxGroupItemRootTheme}>
        <CheckboxGroup.Label
          textPlacement="right"
          theme={LabelTheme}
          text={
            <Text size="l" theme={TextPrimaryTheme}>
              Select All
            </Text>
          }
        >
          <CheckboxGroup.CheckboxSelectAll theme={CheckboxLightTheme} />
        </CheckboxGroup.Label>
      </CheckboxGroup.ItemRootSelectAll>
      <CheckboxGroup.ItemRoot
        theme={CheckboxGroupItemRootTheme}
        isDefaultChecked={true}
        name="s"
        value="s"
      >
        <CheckboxGroup.Label
          textPlacement="right"
          theme={LabelTheme}
          text={
            <Text size="l" theme={TextPrimaryTheme}>
              S Name
            </Text>
          }
        >
          <CheckboxGroup.Checkbox theme={CheckboxLightTheme} />
        </CheckboxGroup.Label>
      </CheckboxGroup.ItemRoot>
      <CheckboxGroup.ItemRoot
        theme={CheckboxGroupItemRootTheme}
        isDefaultChecked={true}
        name="m"
        value="m"
      >
        <CheckboxGroup.Label
          textPlacement="right"
          theme={LabelTheme}
          text={
            <Text size="l" theme={TextPrimaryTheme}>
              M Name
            </Text>
          }
        >
          <CheckboxGroup.Checkbox theme={CheckboxLightTheme} />
        </CheckboxGroup.Label>
      </CheckboxGroup.ItemRoot>
    </React.Fragment>
  ),
};

export const CheckboxGroupPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<CheckboxGroupTestProps>) => (
  <ComponentPlayground<CheckboxGroupTestProps>
    appearance={appearance}
    props={props}
  >
    {({ variant, ...restProps }) => (
      <CheckboxGroup {...restProps} theme={CheckboxGroupTheme}>
        {variantChildrenMap[variant]}
      </CheckboxGroup>
    )}
  </ComponentPlayground>
);
