import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@ui-kit/tests/e2e/ComponentPlayground';
import { Text, TextPrimaryTheme } from '@ui-kit/components/Text';

import { noop } from '@ui-kit/utils';

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
  /**
   * Synthetic flag used by e2e tests to toggle between single-line and
   * multi-line content. When `true`, a short single-line text is rendered.
   * Covers the case where text height (20px) is less than close button (24px).
   */
  shortContent?: boolean;
};

const MultiLineContent = (
  <Text theme={TextPrimaryTheme} size="l">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam
    ducimus inventore minima optio error unde incidunt atque. Minima, maxime?
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam
    ducimus inventore minima optio error unde incidunt atque. Minima, maxime?
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam
    ducimus inventore minima optio error unde incidunt atque. Minima, maxime?
  </Text>
);

const SingleLineContent = (
  <Text theme={TextPrimaryTheme} size="l">
    Short text
  </Text>
);

export const CalloutInfoPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<CalloutTestProps>) => (
  <ComponentPlayground<CalloutTestProps> appearance={appearance} props={props}>
    {({ isClosable, shortContent, ...p }) => {
      const handleClose = isClosable ? noop : undefined;

      return (
        <Callout {...p} theme={CalloutInfoTheme} onClose={handleClose}>
          {shortContent ? SingleLineContent : MultiLineContent}
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
    {({ isClosable, shortContent, ...p }) => {
      const handleClose = isClosable ? noop : undefined;

      return (
        <Callout {...p} theme={CalloutSuccessTheme} onClose={handleClose}>
          {shortContent ? SingleLineContent : MultiLineContent}
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
    {({ isClosable, shortContent, ...p }) => {
      const handleClose = isClosable ? noop : undefined;

      return (
        <Callout {...p} theme={CalloutWarningTheme} onClose={handleClose}>
          {shortContent ? SingleLineContent : MultiLineContent}
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
    {({ isClosable, shortContent, ...p }) => {
      const handleClose = isClosable ? noop : undefined;

      return (
        <Callout {...p} theme={CalloutErrorTheme} onClose={handleClose}>
          {shortContent ? SingleLineContent : MultiLineContent}
        </Callout>
      );
    }}
  </ComponentPlayground>
);
