import React, { forwardRef } from 'react';

import cx from 'classnames';

import { Text } from '@ui-kit/components/Text';

import { OptionTextTheme } from '../Option/Option.theme';

import { LabelProps } from './Label.props';

import s from './Label.module.css';

const DISPLAY_NAME = 'Select.Label';

type S = HTMLSpanElement;

export const Label = forwardRef<S, LabelProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <span {...rest} className={cx(s.label, className)} ref={ref}>
      <Text theme={OptionTextTheme} size="l">
        {children}
      </Text>
    </span>
  );
});

Label.displayName = DISPLAY_NAME;
