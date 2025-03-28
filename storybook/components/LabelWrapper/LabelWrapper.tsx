import React from 'react';
import { FC } from 'react';

import { Label, LabelTheme } from 'src/components/Label';
import { Text, TextPrimaryTheme } from 'src/components/Text';

import { i18n } from '@i18n';

import { type LabelWrapperProps } from './LabelWrapper.props';

export const LabelWrapper: FC<LabelWrapperProps> = ({
  Component = Label,
  children,
  theme = LabelTheme,
  textPlacement = 'top',
  text,
  isCentered = false,
}) => {
  return (
    <Component
      theme={theme}
      textPlacement={textPlacement}
      isCentered={isCentered}
      text={
        text || (
          <Text theme={TextPrimaryTheme} size="l">
            {i18n.t('Click me')}
          </Text>
        )
      }
    >
      {children}
    </Component>
  );
};
