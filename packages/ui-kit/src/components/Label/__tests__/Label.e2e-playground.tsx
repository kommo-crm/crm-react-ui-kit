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

export const LabelPlayground = (
  props: ComponentPlaygroundProps<LabelProps>
) => {
  return (
    <ComponentPlayground<LabelProps>
      {...props}
      propSets={[
        {
          text: [
            <Text size="l" key="text" theme={TextPrimaryTheme}>
              Label
            </Text>,
          ],
          description: [
            undefined,
            <Text size="m" key="description" theme={TextSecondaryLightTheme}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Obcaecati, autem.
            </Text>,
          ],
          textPlacement: ['left', 'right', 'top'],
        },
        {
          isCentered: [true],
          textPlacement: ['left', 'right'],
          text: [
            <Text size="s" key="text-s" theme={TextPrimaryTheme}>
              Label
            </Text>,
          ],
        },
      ]}
    >
      {(itemProps: LabelProps) => (
        <Label {...itemProps} theme={LabelTheme}>
          <Text size="l" key={'label'} theme={TextPrimaryTheme}>
            Label Children
          </Text>
        </Label>
      )}
    </ComponentPlayground>
  );
};
