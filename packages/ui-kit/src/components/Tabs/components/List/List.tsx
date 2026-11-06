import React, { forwardRef } from 'react';
import { List as RadixTabsList } from '@radix-ui/react-tabs';
import cx from 'classnames';

import { type ListProps } from './List.props';

import s from './List.module.css';

type El = HTMLDivElement;

export const List = forwardRef<El, ListProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <RadixTabsList ref={ref} className={cx(s.list, className)} {...rest}>
      {children}
    </RadixTabsList>
  );
});

List.displayName = 'Tabs.List';
