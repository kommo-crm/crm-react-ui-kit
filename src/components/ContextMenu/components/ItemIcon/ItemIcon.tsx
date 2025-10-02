import React, { forwardRef, useEffect, useRef } from 'react';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useLevelContext } from '../../providers';

import { ItemIconProps } from './ItemIcon.props';

import s from './ItemIcon.module.css';

const DISPLAY_NAME = 'ContextMenu.ItemIcon';

export const ItemIcon = forwardRef<HTMLSpanElement, ItemIconProps>(
  ({ children, className }, ref) => {
    const { setHasItemWithIcon } = useLevelContext(DISPLAY_NAME);
    const localRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
      const el = localRef.current;

      if (!el) {
        return;
      }

      const parent = el.parentElement;

      if (!parent) {
        return;
      }

      const firstRealChild = Array.from(parent.children).find(
        (child) => !child.hasAttribute('data-blocker')
      );

      if (firstRealChild === el) {
        setHasItemWithIcon(true);
      } else {
        throw new Error(
          `[${DISPLAY_NAME}] must be the first child in <ContextMenu.Item>`
        );
      }
    }, [setHasItemWithIcon]);

    return (
      <span ref={mergeRefs(ref, localRef)} className={cx(s.icon, className)}>
        {children}
      </span>
    );
  }
);

ItemIcon.displayName = DISPLAY_NAME;
