import { useLayoutEffect, useState } from 'react';

import { UseInnerInputsFocusOptions } from './useInnerInputsFocus.types';

export const useInnerInputsFocus = ({
  isEnabled,
}: UseInnerInputsFocusOptions) => {
  const [hasInnerInput, setHasInnerInput] = useState(false);
  const [isInnerInputFocused, setIsInnerInputFocused] = useState(false);
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  const handleNodeRef = (newNode: HTMLDivElement | null) => {
    setNode(newNode);

    if (newNode && isEnabled) {
      const inputs = Array.from(newNode.querySelectorAll('input'));

      setHasInnerInput(inputs.length > 0);
      setIsInnerInputFocused(inputs.some((i) => document.activeElement === i));
    }
  };

  useLayoutEffect(() => {
    if (!isEnabled || !node) {
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
  }, [node, isEnabled]);

  return { hasInnerInput, isInnerInputFocused, handleNodeRef };
};
