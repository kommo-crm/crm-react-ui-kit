import React, { ReactElement, useMemo } from 'react';

import { FocusBlocker } from '../../components/FocusBlocker';

import { useContextMenuRootContext } from '../../ContextMenu.context';

import { UseChildrenWithBlockerOptions } from './useChildrenWithBlocker.props';

/**
 * This hook installs the blocker in all the items of the context menu
 * except the one in which the focused item is located, which is monitored from the root.
 *
 * Necessary for the case of an item with focused input.
 */
export const useChildrenWithBlocker = (
  options: UseChildrenWithBlockerOptions
) => {
  const {
    displayName,
    children,
    shouldShowBlocker,
    blockerClassName,
    onBlockerClick,
  } = options;

  const { itemWithFocusedInput, setItemWithFocusedInput } =
    useContextMenuRootContext(displayName);

  const handleBlockerClick =
    onBlockerClick ??
    (() => {
      setItemWithFocusedInput(null);
      (document.activeElement as HTMLElement)?.blur();
    });

  return useMemo(() => {
    const isBlockerVisible = shouldShowBlocker || itemWithFocusedInput !== null;

    const blocker = isBlockerVisible ? (
      <FocusBlocker
        key="focus-blocker"
        className={blockerClassName}
        onClick={handleBlockerClick}
      />
    ) : null;

    /**
     * If children is not a valid React element or a void HTML element,
     * wrap it in a Fragment with the blocker
     */
    if (
      !React.isValidElement(children) ||
      (typeof children.type === 'string' &&
        children.props.children === undefined)
    ) {
      return (
        <>
          {blocker}
          {children}
        </>
      );
    }

    /**
     * For valid React elements with children, clone and inject blocker inside
     */
    return React.cloneElement(children as ReactElement, {
      children: (
        <>
          {blocker}
          {children.props.children}
        </>
      ),
    });
  }, [
    children,
    shouldShowBlocker,
    itemWithFocusedInput,
    blockerClassName,
    handleBlockerClick,
  ]);
};
