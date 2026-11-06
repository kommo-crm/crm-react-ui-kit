import React, { forwardRef } from 'react';
import { Indicator as RadixProgressIndicator } from '@radix-ui/react-progress';
import cx from 'classnames';

import type { IndicatorProps } from './Indicator.props';

import s from './Indicator.module.css';

type El = HTMLDivElement;

export const Indicator = forwardRef<El, IndicatorProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <RadixProgressIndicator
      ref={ref}
      className={cx(s.indicator, className)}
      {...rest}
    />
  );
});

Indicator.displayName = 'ProgressBar.Indicator';
