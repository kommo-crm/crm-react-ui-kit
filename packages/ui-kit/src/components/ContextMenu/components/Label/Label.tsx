import React, { forwardRef } from 'react';
import { Label as RadixDropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useSubMenu } from '../../hooks';

import type { LabelProps } from './Label.props';

import s from './Label.module.css';

const DISPLAY_NAME = 'ContextMenu.Label';

export const Label = forwardRef<HTMLDivElement, LabelProps>((props, ref) => {
  const { className, children, onKeyDown, ...rest } = props;

  const { itemRef, handleSubMenuOpenByKeyDown, withProvider } = useSubMenu({
    children,
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    handleSubMenuOpenByKeyDown(e);

    onKeyDown?.(e);
  };

  return withProvider(
    <RadixDropdownMenuLabel
      ref={mergeRefs(ref, itemRef)}
      className={cx(s.label, className)}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </RadixDropdownMenuLabel>
  );
});

Label.displayName = DISPLAY_NAME;
