import React, { forwardRef } from 'react';

import cx from 'classnames';

import { Text } from 'src/components/Text';

import { OptionProps } from './Option.props';

import { OptionTextTheme } from './Option.theme';

import s from './Option.module.css';

const DISPLAY_NAME = 'Select.Value';

type S = HTMLSpanElement;

const Option = forwardRef<S, OptionProps>((props, ref) => {
  const { children, className, title, ...rest } = props;

  return (
    <span {...rest} className={cx(s.text, className)} ref={ref} title={title}>
      <Text theme={OptionTextTheme} size="l" isEllipsis>
        {children}
      </Text>
    </span>
  );
});

Option.displayName = DISPLAY_NAME;

export default Option;
