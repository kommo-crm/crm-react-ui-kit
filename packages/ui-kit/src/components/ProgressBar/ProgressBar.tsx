import React, { forwardRef } from 'react';
import { Root as RadixProgressRoot } from '@radix-ui/react-progress';
import cx from 'classnames';

import { useThemeClassName } from '@ui-kit/hooks/useThemeClassName';
import { type CrmUiKitCSSProperties } from '@ui-kit/lib/theme';

import { Indicator } from './components/Indicator';

import { type ProgressBarRootProps } from './ProgressBar.props';
import { type ProgressBarTheme } from './ProgressBar.themes';

import s from './ProgressBar.module.css';

type El = HTMLDivElement;

const DISPLAY_NAME = 'ProgressBar.Root';

const MIN_VALUE = 0;
const DEFAULT_MAX = 100;

const isValidMax = (max: number): boolean => !Number.isNaN(max) && max > 0;

/**
 * Radix turns an out-of-range value into the indeterminate state
 * and logs an error, while consumers pass raw ratios like `used / 0`.
 */
const clampValue = (value: number, max: number): number => {
  if (Number.isNaN(value)) {
    return MIN_VALUE;
  }

  return Math.min(Math.max(value, MIN_VALUE), max);
};

const Root = forwardRef<El, ProgressBarRootProps>((props, ref) => {
  const {
    className = '',
    theme,
    value,
    max = DEFAULT_MAX,
    style,
    children,
    ...rest
  } = props;

  const themeClassName = useThemeClassName<ProgressBarTheme>(theme);

  /**
   * Throw instead of falling back like Radix: its fallback only logs
   * to the console, which is easy to miss, and depends on the Radix default.
   */
  if (!isValidMax(max)) {
    throw new Error(
      `\`${DISPLAY_NAME}\` expects \`max\` to be a positive number, got \`${max}\``
    );
  }

  const clampedValue = clampValue(value, max);

  const valueStyle: CrmUiKitCSSProperties = {
    '--crm-ui-kit-progress-bar-indicator-width': `${
      (clampedValue / max) * 100
    }%`,
  };

  return (
    <RadixProgressRoot
      ref={ref}
      value={clampedValue}
      max={max}
      className={cx(s.progress_bar, themeClassName, className)}
      style={{ ...valueStyle, ...style }}
      {...rest}
    >
      {children}
    </RadixProgressRoot>
  );
});

Root.displayName = DISPLAY_NAME;

export const ProgressBar = {
  Root,
  Indicator,
};
