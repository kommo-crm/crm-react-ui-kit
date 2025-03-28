import React, { forwardRef, useMemo } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { noop } from 'src/utils';

import { Spinner, type SpinnerTheme } from 'src/components/Spinner';

import { useShowInvalidAnimation, useShowSuccessfulState } from './hooks';

import { type ButtonProps } from './Button.props';
import { type ButtonThemeType } from './Button.themes';

import s from './Button.module.css';

type B = HTMLButtonElement;

const spinnerThemesMapper = (buttonTheme: ButtonThemeType) => {
  const defaultTheme: SpinnerTheme = {
    '--crm-ui-kit-spinner-border-color':
      buttonTheme['--crm-ui-kit-button-spinner-border-color'],
    '--crm-ui-kit-spinner-border-width':
      buttonTheme['--crm-ui-kit-button-spinner-border-width'],
    '--crm-ui-kit-spinner-circle-size':
      buttonTheme['--crm-ui-kit-button-spinner-circle-size'],
    '--crm-ui-kit-spinner-border-style':
      buttonTheme['--crm-ui-kit-button-spinner-border-style'],
  };

  const disabledTheme: SpinnerTheme = {
    ...defaultTheme,
    '--crm-ui-kit-spinner-border-color':
      buttonTheme['--crm-ui-kit-button-spinner-disabled-border-color'],
  };

  return { defaultTheme, disabledTheme };
};

export const Button = forwardRef<B, ButtonProps>((props, ref) => {
  const {
    className = '',
    type = 'button',
    onClick = noop,
    theme,
    isLoading,
    isDisabled,
    before,
    after,
    children,
    showInvalidAnimationRef,
    showSuccessfulStateRef,
    successfulStateText,
    isClickableWhileDisabled = false,
    ...rest
  } = props;

  const themeClassName = useThemeClassName<ButtonThemeType>(theme);
  const spinnerThemes = useMemo(() => spinnerThemesMapper(theme), [theme]);

  const shouldShowInvalidAnimation = useShowInvalidAnimation(
    showInvalidAnimationRef
  );
  const shouldShowSuccessfulState = useShowSuccessfulState(
    showSuccessfulStateRef
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isLoading) {
      return;
    }

    onClick(e);
  };

  let content: React.ReactNode = null;

  switch (true) {
    case shouldShowSuccessfulState:
      content = <span>{successfulStateText || content}</span>;
      break;
    case isLoading:
      content = (
        <span className={cx(s.spinner_container)}>
          <Spinner
            theme={
              isDisabled
                ? spinnerThemes.disabledTheme
                : spinnerThemes.defaultTheme
            }
            isCentered
          />
        </span>
      );
      break;

    default:
      content = (
        <React.Fragment>
          {before && <span className={cx(s.before)}>{before}</span>}
          <span>{children}</span>
          {after && <span className={cx(s.after)}>{after}</span>}
        </React.Fragment>
      );
      break;
  }

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      onClick={handleClick}
      className={cx(s.button, themeClassName, className, {
        [s.invalid]: shouldShowInvalidAnimation,
        [s.success]: shouldShowSuccessfulState,
        [s.disabled]: isDisabled,
      })}
      disabled={isDisabled && !isClickableWhileDisabled}
    >
      <span className={cx(s.content)}>{content}</span>
    </button>
  );
});

Button.displayName = 'Button';
