import React, { FC } from 'react';

import { Popover } from 'react-tiny-popover';

import { BaseContentProps } from './BaseContent.props';

export const BaseContent: FC<BaseContentProps> = (props) => {
  const { children, ...rest } = props;

  return <Popover {...rest}>{children}</Popover>;
};
