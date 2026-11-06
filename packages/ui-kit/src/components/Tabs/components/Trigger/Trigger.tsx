import React, { forwardRef } from 'react';
import { Trigger as RadixTabsTrigger } from '@radix-ui/react-tabs';
import cx from 'classnames';

import { type TriggerProps } from './Trigger.props';

import s from './Trigger.module.css';

type El = HTMLButtonElement;

export const Trigger = forwardRef<El, TriggerProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <RadixTabsTrigger
      ref={ref}
      className={cx(s.trigger, className)}
      {...rest}
      disabled={false}
    >
      {children}
    </RadixTabsTrigger>
  );
});

Trigger.displayName = 'Tabs.Trigger';
