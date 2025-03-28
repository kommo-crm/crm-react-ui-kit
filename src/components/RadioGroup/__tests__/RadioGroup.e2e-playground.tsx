import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import { LabelTheme } from 'src/components/Label';
import {
  Text,
  TextPrimaryTheme,
  TextSecondaryLightTheme,
} from 'src/components/Text';

import {
  RadioGroup,
  RadioPrimaryTheme,
  RadioGroupTheme,
  RadioGroupItemRootTheme,
  type RadioGroupProps,
} from '..';

export const RadioGroupPlayground = (
  props: ComponentPlaygroundProps<RadioGroupProps>
) => {
  return (
    <ComponentPlayground<RadioGroupProps>
      {...props}
      propSets={[
        {
          children: [
            <React.Fragment key="fragment-description">
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
            </React.Fragment>,

            <React.Fragment key="fragment-description">
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
            </React.Fragment>,
          ],
          orientation: ['horizontal', 'vertical'],
        },
        {
          children: [
            <React.Fragment key="fragment-description">
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
            </React.Fragment>,
          ],
          isDisabled: [true],
        },
      ]}
    >
      {(itemProps: RadioGroupProps) => (
        <RadioGroup {...itemProps} theme={RadioGroupTheme} name="size" />
      )}
    </ComponentPlayground>
  );
};
