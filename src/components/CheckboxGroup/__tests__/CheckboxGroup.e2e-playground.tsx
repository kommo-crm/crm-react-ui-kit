import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import { LabelTheme } from 'src/components/Label';
import { Text, TextPrimaryTheme } from 'src/components/Text';
import { CheckboxLightTheme } from 'src/components/Checkbox';

import {
  CheckboxGroup,
  CheckboxGroupItemRootTheme,
  CheckboxGroupTheme,
  type CheckboxGroupProps,
} from '..';

export const CheckboxGroupPlayground = (
  props: ComponentPlaygroundProps<CheckboxGroupProps>
) => {
  return (
    <ComponentPlayground<CheckboxGroupProps>
      {...props}
      propSets={[
        {
          children: [
            <React.Fragment key="fragment-description">
              <CheckboxGroup.ItemRootSelectAll
                theme={CheckboxGroupItemRootTheme}
              >
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
            </React.Fragment>,

            <React.Fragment key="fragment-description">
              <CheckboxGroup.ItemRootSelectAll
                theme={CheckboxGroupItemRootTheme}
              >
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
            </React.Fragment>,
          ],
          orientation: ['horizontal', 'vertical'],
        },
        {
          children: [
            <React.Fragment key="fragment-description">
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
            </React.Fragment>,
          ],
          isDisabled: [true],
        },
        {
          children: [
            <React.Fragment key="fragment-description">
              <CheckboxGroup.ItemRootSelectAll
                theme={CheckboxGroupItemRootTheme}
              >
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
            </React.Fragment>,

            <React.Fragment key="fragment-description">
              <CheckboxGroup.ItemRootSelectAll
                theme={CheckboxGroupItemRootTheme}
              >
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
            </React.Fragment>,
          ],
        },
      ]}
    >
      {(itemProps: CheckboxGroupProps) => (
        <CheckboxGroup {...itemProps} theme={CheckboxGroupTheme} />
      )}
    </ComponentPlayground>
  );
};
