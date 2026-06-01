import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import {
  Text,
  TextPrimaryTheme,
  TextSecondaryLightTheme,
} from 'src/components/Text';

import { Label, type LabelProps, LabelTheme } from '..';

export type TextVariant = 'default' | 'small';

export interface LabelTestProps {
  textVariant: TextVariant;
  hasDescription?: boolean;
  textPlacement?: LabelProps['textPlacement'];
  isCentered?: boolean;
}

const textMap: Record<TextVariant, React.ReactNode> = {
  default: (
    <Text size="l" theme={TextPrimaryTheme}>
      Label
    </Text>
  ),
  small: (
    <Text size="s" theme={TextPrimaryTheme}>
      Label
    </Text>
  ),
};

const description = (
  <Text size="m" theme={TextSecondaryLightTheme}>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati, autem.
  </Text>
);

export const LabelPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<LabelTestProps>) => (
  <ComponentPlayground<LabelTestProps> appearance={appearance} props={props}>
    {({ textVariant, hasDescription, ...restProps }) => (
      <Label
        {...restProps}
        theme={LabelTheme}
        text={textMap[textVariant]}
        description={hasDescription ? description : undefined}
      >
        <Text size="l" theme={TextPrimaryTheme}>
          Label Children
        </Text>
      </Label>
    )}
  </ComponentPlayground>
);
