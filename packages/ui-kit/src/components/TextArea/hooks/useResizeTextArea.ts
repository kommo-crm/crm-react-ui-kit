import React, { useCallback, useLayoutEffect, useRef } from 'react';

export const useAutosizeTextarea = (
  onAutosize: ((el: HTMLTextAreaElement) => void) | undefined,
  isAutosized: boolean,
  autosizeDependencies: React.DependencyList
): React.RefObject<HTMLTextAreaElement> => {
  const elementRef = useRef<HTMLTextAreaElement>(null);
  const currentScrollHeight = useRef<number>();

  const resizeElement = useCallback(
    (el: HTMLTextAreaElement) => {
      if (isAutosized && el.offsetParent) {
        el.style.height = '';
        el.style.height = `${el.scrollHeight}px`;

        if (el.scrollHeight !== currentScrollHeight.current && onAutosize) {
          onAutosize(el);
          currentScrollHeight.current = el.scrollHeight;
        }
      }
    },
    [isAutosized, onAutosize]
  );

  const handleAutosize = useCallback(() => {
    const el = elementRef.current;

    if (!el) {
      return;
    }

    resizeElement(el);
  }, [elementRef, resizeElement]);

  useLayoutEffect(handleAutosize, [...autosizeDependencies, handleAutosize]);

  return elementRef;
};
