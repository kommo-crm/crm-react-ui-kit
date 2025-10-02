import React, { ReactElement, useMemo } from 'react';

import { FocusBlocker } from '../../components/FocusBlocker';

import { useContextMenuRootContext } from '../../ContextMenu.context';

import { UseChildrenWithBlockerOptions } from './useChildrenWithBlocker.props';

export function useChildrenWithBlocker({
  displayName,
  children,
  shouldShowBlocker,
  blockerClassName,
  onBlockerClick,
}: UseChildrenWithBlockerOptions) {
  const { itemWithFocusedInput, setItemWithFocusedInput } =
    useContextMenuRootContext(displayName);

  onBlockerClick =
    onBlockerClick ??
    (() => {
      setItemWithFocusedInput(null);
      (document.activeElement as HTMLElement)?.blur();
    });
  shouldShowBlocker = shouldShowBlocker ?? itemWithFocusedInput !== null;

  return useMemo(() => {
    if (!React.isValidElement(children)) {
      return (
        <>
          {shouldShowBlocker && (
            <FocusBlocker
              key="focus-blocker"
              className={blockerClassName}
              onClick={onBlockerClick}
            />
          )}
          {children}
        </>
      );
    }

    const blocker = shouldShowBlocker ? (
      <FocusBlocker
        key="focus-blocker"
        className={blockerClassName}
        onClick={onBlockerClick}
      />
    ) : null;

    return React.cloneElement(children as ReactElement, {
      children: (
        <>
          {blocker}
          {children.props.children}
        </>
      ),
    });
  }, [children, shouldShowBlocker, blockerClassName, onBlockerClick]);
}
