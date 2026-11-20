import React from 'react';

import { CounterBadge, CounterBadgePrimaryTheme } from '../../../CounterBadge';

import { formatCounter } from '../../utils';

import { type CounterProps } from './Counter.props';

import s from './Counter.module.css';

/**
 * Counter badge of a tab and of the overflow button.
 */
export const Counter = (props: CounterProps) => {
  const { count } = props;

  const text = formatCounter(count);

  if (text === null) {
    return null;
  }

  return (
    <CounterBadge theme={CounterBadgePrimaryTheme} className={s.counter}>
      {text}
    </CounterBadge>
  );
};

Counter.displayName = 'InlineTabs.Counter';
