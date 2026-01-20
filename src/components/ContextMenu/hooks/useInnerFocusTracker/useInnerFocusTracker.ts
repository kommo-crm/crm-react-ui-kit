import { useLayoutEffect, useState } from 'react';

import { UseInnerFocusTrackerResult } from './useInnerFocusTracker.types';

/**
 * Hook that monitors a DOM node for inner input elements and tracks their
 * focus state.
 *
 * It detects whether the node contains any input elements and whether any of
 * them is currently focused. Uses MutationObserver to handle dynamically
 * added/removed inputs and focusin/focusout events to track focus changes.
 *
 * Also supports contentEditable elements as focusable inputs.
 */
export const useInnerFocusTracker = (): UseInnerFocusTrackerResult => {
  const [hasInnerInput, setHasInnerInput] = useState(false);
  const [isInnerInputFocused, setIsInnerInputFocused] = useState(false);
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  const handleNodeRef = (newNode: HTMLDivElement | null) => {
    setNode(newNode);

    if (newNode) {
      const inputs = Array.from(newNode.querySelectorAll('input'));

      setHasInnerInput(inputs.length > 0);
      setIsInnerInputFocused(inputs.some((i) => document.activeElement === i));
    }
  };

  useLayoutEffect(() => {
    if (!node) {
      return;
    }

    const getInputs = () => Array.from(node.querySelectorAll('input'));

    const updateState = () => {
      const inputs = getInputs();

      setHasInnerInput(inputs.length > 0);
      setIsInnerInputFocused(inputs.some((i) => document.activeElement === i));
    };

    updateState();

    const handleFocusIn = (e: FocusEvent) => {
      if (
        e.target instanceof HTMLElement &&
        (e.target.tagName === 'INPUT' || e.target.isContentEditable) &&
        node.contains(e.target)
      ) {
        setIsInnerInputFocused(true);
      }
    };

    const handleFocusOut = () => setTimeout(updateState, 0);

    node.addEventListener('focusin', handleFocusIn);
    node.addEventListener('focusout', handleFocusOut);

    const mo = new MutationObserver(updateState);

    mo.observe(node, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      node.removeEventListener('focusin', handleFocusIn);
      node.removeEventListener('focusout', handleFocusOut);
    };
  }, [node]);

  return { hasInnerInput, isInnerInputFocused, handleNodeRef };
};
