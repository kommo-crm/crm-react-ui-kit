import React, { type ComponentPropsWithoutRef } from 'react';
import { Root as RadixProgressRoot } from '@radix-ui/react-progress';

import { type ProgressBarTheme } from './ProgressBar.themes';

type RadixProgressRootProps = ComponentPropsWithoutRef<
  typeof RadixProgressRoot
>;

export interface ProgressBarRootProps
  extends Omit<RadixProgressRootProps, 'value'> {
  /**
   * Object with CSS theme properties.
   */
  theme: ProgressBarTheme;
  /**
   * Current progress, a number from 0 to `max` inclusive.
   * Other values don't throw and are clamped:
   * - below 0, `-Infinity` and `NaN` - 0;
   * - above `max` and `Infinity` - `max`.
   */
  value: number;
  /**
   * Value of the full progress. Must be a positive number, otherwise
   * an error is thrown.
   *
   * @default 100
   */
  max?: RadixProgressRootProps['max'];
  /**
   * Returns the text read by assistive technologies (`aria-valuetext`).
   * By default it's the rounded percentage, e.g. `"42%"`.
   */
  getValueLabel?: RadixProgressRootProps['getValueLabel'];
  /**
   * `ProgressBar.Indicator` that renders the filled part of the track.
   */
  children?: React.ReactNode;
}
