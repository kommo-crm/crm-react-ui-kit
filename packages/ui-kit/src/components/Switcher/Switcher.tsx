import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';
import { VisuallyHiddenInput } from 'src/components/VisuallyHiddenInput';
import { Label } from 'src/components/Label';

import { SwitcherType, type SwitcherProps } from './Switcher.props';
import { type SwitcherTheme } from './Switcher.themes';

import s from './Switcher.module.css';

type El = HTMLInputElement;

export const Switcher = forwardRef<El, SwitcherProps>((props, ref) => {
  const {
    className = '',
    value = 'Y',

    theme,

    ...rest
  } = props;

  const themeClassName = useThemeClassName<SwitcherTheme>(theme);

  return (
    <div className={cx(s.wrapper, themeClassName, className)}>
      <VisuallyHiddenInput
        className={cx(s.input)}
        ref={ref}
        value={value}
        type="checkbox"
        {...rest}
      />
      <span className={cx(s.switcher)} />
    </div>
  );
}) as SwitcherType;

Switcher.Label = Label;

Switcher.displayName = 'Switcher';
