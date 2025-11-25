import React, { FC } from 'react';
import { ArrowContainer } from 'react-tiny-popover';

import { BaseArrowProps } from './BaseArrow.props';

export const BaseArrow: FC<BaseArrowProps> = (props) => {
  const {
    children,
    arrowClassname = '',
    className = '',
    arrowColor = '',
    arrowSize = 11,
    ...rest
  } = props;

  return (
    <ArrowContainer
      arrowClassName={arrowClassname}
      className={className}
      arrowSize={arrowSize}
      arrowColor={arrowColor}
      {...rest}
    >
      {children}
    </ArrowContainer>
  );
};
