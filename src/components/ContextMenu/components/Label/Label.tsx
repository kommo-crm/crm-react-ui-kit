import React, { forwardRef } from 'react';
import { Label as RadixDropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useLevelContext } from '../../providers/LevelProvider';

import { hasItemIcon } from '../../utils';

import { useSubMenu } from '../../hooks';

import type { LabelProps } from './Label.props';

import s from './Label.module.css';

const DISPLAY_NAME = 'ContextMenu.Label';

export const Label = forwardRef<HTMLDivElement, LabelProps>(
  ({ className, children, onKeyDown, ...rest }, ref) => {
    const { hasItemWithIcon } = useLevelContext(DISPLAY_NAME);

    const { itemRef, handleKeyDown, withProvider } = useSubMenu({ onKeyDown });

    return withProvider(
      <RadixDropdownMenuLabel
        ref={mergeRefs(ref, itemRef)}
        className={cx(s.label, className)}
        data-no-icon-align={
          hasItemIcon(children) || !hasItemWithIcon ? '' : undefined
        }
        onKeyDown={handleKeyDown}
        data-label
        {...rest}
      >
        {children}
      </RadixDropdownMenuLabel>
    );
  }
);

Label.displayName = DISPLAY_NAME;
