import React, { isValidElement } from 'react';

const ALLOWED_DISPLAY_NAMES = ['ItemIcon', 'ItemIndicator'];

export const hasItemIcon = (children: React.ReactNode): boolean => {
  const firstChild = React.Children.toArray(children)[0];

  if (!isValidElement(firstChild)) {
    return false;
  }

  return ALLOWED_DISPLAY_NAMES.includes((firstChild.type as any)?.displayName);
};
