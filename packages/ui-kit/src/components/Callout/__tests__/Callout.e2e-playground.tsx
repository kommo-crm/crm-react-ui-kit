import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';
import { Text, TextPrimaryTheme } from 'src/components/Text';

import { noop } from 'src/utils';

import { Callout, type CalloutProps } from '..';

import {
  CalloutInfoTheme,
  CalloutSuccessTheme,
  CalloutWarningTheme,
  CalloutErrorTheme,
} from '../Callout.themes';

export type CalloutTestProps = Omit<CalloutProps, 'children' | 'onClose'> & {
  /**
   * Synthetic flag used by e2e tests to toggle the close button.
   * When `true`, an `onClose` handler is wired to the component
   * so the close button is rendered.
   */
  isClosable?: boolean;
};

const Content = (
  <Text theme={TextPrimaryTheme} size="l">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam
    ducimus inventore minima optio error unde incidunt atque. Minima, maxime?
  </Text>
);

export const CalloutInfoPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<CalloutTestProps>) => (
  <ComponentPlayground<CalloutTestProps> appearance={appearance} props={props}>
    {({ isClosable, ...p }) => {
      const handleClose = isClosable ? noop : undefined;

      return (
        <Callout {...p} theme={CalloutInfoTheme} onClose={handleClose}>
          {Content}
        </Callout>
      );
    }}
  </ComponentPlayground>
);

export const CalloutSuccessPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<CalloutTestProps>) => (
  <ComponentPlayground<CalloutTestProps> appearance={appearance} props={props}>
    {({ isClosable, ...p }) => {
      const handleClose = isClosable ? noop : undefined;

      return (
        <Callout {...p} theme={CalloutSuccessTheme} onClose={handleClose}>
          {Content}
        </Callout>
      );
    }}
  </ComponentPlayground>
);

export const CalloutWarningPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<CalloutTestProps>) => (
  <ComponentPlayground<CalloutTestProps> appearance={appearance} props={props}>
    {({ isClosable, ...p }) => {
      const handleClose = isClosable ? noop : undefined;

      return (
        <Callout {...p} theme={CalloutWarningTheme} onClose={handleClose}>
          {Content}
        </Callout>
      );
    }}
  </ComponentPlayground>
);

export const CalloutErrorPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<CalloutTestProps>) => (
  <ComponentPlayground<CalloutTestProps> appearance={appearance} props={props}>
    {({ isClosable, ...p }) => {
      const handleClose = isClosable ? noop : undefined;

      return (
        <Callout {...p} theme={CalloutErrorTheme} onClose={handleClose}>
          {Content}
        </Callout>
      );
    }}
  </ComponentPlayground>
);
