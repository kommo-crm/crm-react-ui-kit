import React, { forwardRef } from 'react';
import { createPortal } from 'react-dom';

import { type PortalProps } from './Portal.props';

type D = HTMLDivElement;

export const Portal = forwardRef<D, PortalProps>((props, ref) => {
  const { container = document.body, ...portalProps } = props;

  return container
    ? createPortal(<div {...portalProps} ref={ref} />, container)
    : null;
});

Portal.displayName = 'Portal';
