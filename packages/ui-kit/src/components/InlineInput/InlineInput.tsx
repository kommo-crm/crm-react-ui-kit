import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { Text } from 'src/components/Text';
import { BaseInput } from 'src/components/BaseInput/BaseInput';
import { isValidRenderValue } from 'src/lib/utils';

import { type InlineInputProps } from './InlineInput.props';
import {
  InputInvalidTextTheme,
  type InlineInputTheme,
} from './InlineInput.themes';

import s from './InlineInput.module.css';

type I = HTMLInputElement;

export const InlineInput = forwardRef<I, InlineInputProps>((props, ref) => {
  const {
    className = '',
    isInvalid = false,
    invalidDescription,
    isDisabled,
    after,
    theme,
    ...rest
  } = props;

  const themeClassName = useThemeClassName<InlineInputTheme>(theme);

  return (
    <div className={cx(s.wrapper, themeClassName, className)}>
      <div
        className={cx(s.input_container, {
          [s.disabled]: isDisabled,
        })}
      >
        <BaseInput
          className={cx({
            [s.has_after]: Boolean(after),
          })}
          isDisabled={isDisabled}
          ref={ref}
          {...rest}
        />
      </div>
      {isValidRenderValue(after) && (
        <div className={cx(s.after_container)}>
          <div className={cx(s.after)}>{after}</div>
        </div>
      )}
      {isInvalid && (
        <div className={cx(s.invalid_description_container)}>
          <Text
            size="m"
            theme={InputInvalidTextTheme}
            className={cx(s.invalid_description)}
          >
            {invalidDescription}
          </Text>
        </div>
      )}
    </div>
  );
});

InlineInput.displayName = 'InlineInput';
