import React, { isValidElement } from 'react';

export function hasAnyItemWithIcon(children: React.ReactNode): boolean {
  return React.Children.toArray(children).some((child) => {
    if (!isValidElement(child)) {
      return false;
    }

    return Boolean(child.props?.icon);
  });
}
