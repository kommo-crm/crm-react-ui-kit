import React from 'react';

import { Sub as ContextMenuSub } from '../Sub/Sub';

import { SubSelectProvider } from './SubSelect.context';
import { SubSelectProps } from './SubSelect.props';

import { Trigger } from './components/Trigger/Trigger';
import { Content } from './components/Content/Content';
import { Item } from './components/Item/Item';
import { Value } from './components/Value/Value';

const Root: React.FC<SubSelectProps> = ({
  value,
  sortDirection,
  onChange,
  children,
  ...props
}) => (
  <SubSelectProvider
    value={value}
    sortDirection={sortDirection}
    onChange={onChange}
  >
    <ContextMenuSub {...props}>{children}</ContextMenuSub>
  </SubSelectProvider>
);

export const SubSelect = {
  Root,
  Trigger,
  Content,
  Item,
  Value,
};
