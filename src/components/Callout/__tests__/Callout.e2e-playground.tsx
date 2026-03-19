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

export const CalloutErrorPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<CalloutProps>) => (
  <ComponentPlayground<CalloutProps> appearance={appearance} props={props}>
    {(p) => (
      <Callout {...p} theme={CalloutErrorTheme}>
        <Text theme={TextPrimaryTheme} size="l">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          ipsam ducimus inventore minima optio error unde incidunt atque.
          Minima, maxime?
        </Text>
      </Callout>
    )}
  </ComponentPlayground>
);

export const CalloutInfoPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<CalloutProps>) => (
  <ComponentPlayground<CalloutProps> appearance={appearance} props={props}>
    {(p) => (
      <Callout {...p} theme={CalloutInfoTheme}>
        <Text theme={TextPrimaryTheme} size="l">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          ipsam ducimus inventore minima optio error unde incidunt atque.
          Minima, maxime?
        </Text>
      </Callout>
    )}
  </ComponentPlayground>
);

export const CalloutSuccessPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<CalloutProps>) => (
  <ComponentPlayground<CalloutProps> appearance={appearance} props={props}>
    {(p) => (
      <Callout {...p} theme={CalloutSuccessTheme}>
        <Text theme={TextPrimaryTheme} size="l">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          ipsam ducimus inventore minima optio error unde incidunt atque.
          Minima, maxime?
        </Text>
      </Callout>
    )}
  </ComponentPlayground>
);

export const CalloutWarningPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<CalloutProps>) => (
  <ComponentPlayground<CalloutProps> appearance={appearance} props={props}>
    {(p) => (
      <Callout {...p} theme={CalloutWarningTheme}>
        <Text theme={TextPrimaryTheme} size="l">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          ipsam ducimus inventore minima optio error unde incidunt atque.
          Minima, maxime?
        </Text>
      </Callout>
    )}
  </ComponentPlayground>
);
