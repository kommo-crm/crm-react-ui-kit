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

export const LabelPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<LabelProps>) => (
  <ComponentPlayground<LabelProps> appearance={appearance} props={props}>
    {(p) => (
      <Label {...p} theme={LabelTheme}>
        <Text size="l" theme={TextPrimaryTheme}>
          Label Children
        </Text>
      </Label>
    )}
  </ComponentPlayground>
);

export const labelText = (
  <Text size="l" key="text" theme={TextPrimaryTheme}>
    Label
  </Text>
);

export const labelTextSmall = (
  <Text size="s" key="text-s" theme={TextPrimaryTheme}>
    Label
  </Text>
);

export const labelDescription = (
  <Text size="m" key="description" theme={TextSecondaryLightTheme}>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati, autem.
  </Text>
);
