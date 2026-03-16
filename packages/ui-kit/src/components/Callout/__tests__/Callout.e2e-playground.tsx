import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';
import { Text, TextPrimaryTheme } from 'src/components/Text';

import { Callout, type CalloutProps } from '..';

import { CalloutErrorTheme } from '../themes/CalloutError.theme';
import { CalloutInfoTheme } from '../themes/CalloutInfo.theme';
import { CalloutSuccessTheme } from '../themes/CalloutSuccess.theme';
import { CalloutWarningTheme } from '../themes/CalloutWarning.theme';

export const CalloutPlaygroundError = (
  props: ComponentPlaygroundProps<CalloutProps>
) => {
  return (
    <ComponentPlayground<CalloutProps>
      {...props}
      propSets={[
        {
          children: [
            <Text key="children" theme={TextPrimaryTheme} size="l">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              ipsam ducimus inventore minima optio error unde incidunt atque.
              Minima, maxime?
            </Text>,
          ],
        },
      ]}
    >
      {(itemProps: CalloutProps) => (
        <Callout {...itemProps} theme={CalloutErrorTheme} />
      )}
    </ComponentPlayground>
  );
};

export const CalloutPlaygroundInfo = (
  props: ComponentPlaygroundProps<CalloutProps>
) => {
  return (
    <ComponentPlayground<CalloutProps>
      {...props}
      propSets={[
        {
          children: [
            <Text key="children" theme={TextPrimaryTheme} size="l">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              ipsam ducimus inventore minima optio error unde incidunt atque.
              Minima, maxime?
            </Text>,
          ],
        },
      ]}
    >
      {(itemProps: CalloutProps) => (
        <Callout {...itemProps} theme={CalloutInfoTheme} />
      )}
    </ComponentPlayground>
  );
};

export const CalloutPlaygroundSuccess = (
  props: ComponentPlaygroundProps<CalloutProps>
) => {
  return (
    <ComponentPlayground<CalloutProps>
      {...props}
      propSets={[
        {
          children: [
            <Text key="children" theme={TextPrimaryTheme} size="l">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              ipsam ducimus inventore minima optio error unde incidunt atque.
              Minima, maxime?
            </Text>,
          ],
        },
      ]}
    >
      {(itemProps: CalloutProps) => (
        <Callout {...itemProps} theme={CalloutSuccessTheme} />
      )}
    </ComponentPlayground>
  );
};

export const CalloutPlaygroundWarning = (
  props: ComponentPlaygroundProps<CalloutProps>
) => {
  return (
    <ComponentPlayground<CalloutProps>
      {...props}
      propSets={[
        {
          children: [
            <Text key="children" theme={TextPrimaryTheme} size="l">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              ipsam ducimus inventore minima optio error unde incidunt atque.
              Minima, maxime?
            </Text>,
          ],
        },
      ]}
    >
      {(itemProps: CalloutProps) => (
        <Callout {...itemProps} theme={CalloutWarningTheme} />
      )}
    </ComponentPlayground>
  );
};
