import React, { FC } from 'react';

import { noop } from 'src/utils';

import { BaseTriggerProps } from './BaseTrigger.props';

export const BaseTrigger: FC<BaseTriggerProps> = (props) => {
  const {
    children,
    className = '',
    onClick = noop,
    onMouseEnter = noop,
    onMouseLeave = noop,
  } = props;

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    onMouseLeave(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick(e);
  };

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
