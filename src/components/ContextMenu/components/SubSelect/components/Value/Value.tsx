import React, { forwardRef } from 'react';
import cx from 'classnames';

import { Text } from 'src/components/Text';

import { TextContextMenuTheme } from 'src/components/ContextMenu/themes';

import { useContextMenuSubSelectContext } from '../../SubSelect.context';

import type { SubSelectValueProps } from './Value.props';

import s from './Value.module.css';

const DISPLAY_NAME = 'ContextMenu.SubSelect.Value';

export const Value = forwardRef<HTMLDivElement, SubSelectValueProps>(
  (
    { className, children, label, placeholder = '', separator = ':', ...rest },
    ref
  ) => {
    const { value } = useContextMenuSubSelectContext(DISPLAY_NAME);

    return (
      <div ref={ref} className={cx(s.value, className)} {...rest}>
        <Text theme={TextContextMenuTheme} size="l">
          <span className={cx(s.label)}>
            {label}
            {separator}
          </span>
          {value ? (
            value.option
          ) : (
            <div className={cx(s.placeholder)}>{placeholder}</div>
          )}
        </Text>
        {children}
      </div>
    );
  }
);

Value.displayName = DISPLAY_NAME;
