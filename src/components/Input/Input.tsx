import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';
import { isValidRenderValue } from 'src/lib/utils';

import { Text } from 'src/components/Text';
import { BaseInput } from 'src/components/BaseInput/BaseInput';

import { type InputProps } from './Input.props';
import { InputInvalidTextTheme, type InputTheme } from './Input.themes';

import s from './Input.module.css';

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className = '',
    isInvalid = false,
    isDisabled,
    invalidDescription,
    invalidDescriptionPlacement = 'bottom',
    before,
    after,
    theme,
    ...rest
  } = props;

  const themeClassName = useThemeClassName<InputTheme>(theme);

  return (
    <div className={cx(s.wrapper, themeClassName, className)}>
      <div
        className={cx(s.input_wrapper, {
          [s.invalid_description_right]:
            invalidDescriptionPlacement === 'right',
        })}
      >
        <div
          className={cx(s.input_container, {
            [s.invalid]: isInvalid,
            [s.disabled]: isDisabled,
          })}
        >
          {isValidRenderValue(before) && (
            <div className={cx(s.before)}>{before}</div>
          )}
          <BaseInput
            className={cx({
              [s.has_after]: Boolean(after),
              [s.has_before]: Boolean(before),
            })}
            isDisabled={isDisabled}
            ref={ref}
            {...rest}
          />
          {isValidRenderValue(after) && (
            <div className={cx(s.after)}>{after}</div>
          )}
        </div>
        {isInvalid && Boolean(invalidDescription) && (
          <Text
            size="m"
            theme={InputInvalidTextTheme}
            className={cx(s.invalid_description)}
          >
            {invalidDescription}
          </Text>
        )}
      </div>
    </div>
  );
});

Input.displayName = 'Input';
