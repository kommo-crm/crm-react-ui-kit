import { useEffect, useRef } from 'react';

import type { UseResizeObserverOptions } from './useResizeObserver.types';

const RESIZE_THROTTLE_MS = 50;

/**
 * Fallback for browsers without ResizeObserver: only the window size and
 * the web font swap are tracked, sizes changed by the content are missed.
 */
const subscribeToWindowResize = (onResize: () => void) => {
  let isActive = true;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const handleResize = () => {
    if (timeoutId !== null) {
      return;
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;
      onResize();
    }, RESIZE_THROTTLE_MS);
  };

  window.addEventListener('resize', handleResize);

  document.fonts?.ready.then(() => {
    if (isActive) {
      onResize();
    }
  });

  return () => {
    isActive = false;
    window.removeEventListener('resize', handleResize);

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
  };
};

/**
 * Calls `onResize` when any of the targets changes its size.
 */
export const useResizeObserver = (options: UseResizeObserverOptions) => {
  const { targets, onResize } = options;

  const observerRef = useRef<ResizeObserver | null>(null);
  /**
   * Elements the observer is subscribed to, compared with the targets after
   * every render.
   */
  const observedRef = useRef<Element[]>([]);

  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') {
      return subscribeToWindowResize(onResize);
    }

    const observer = new ResizeObserver(() => onResize());

    observerRef.current = observer;

    return () => {
      observer.disconnect();
      observerRef.current = null;
      observedRef.current = [];
    };
  }, [onResize]);

  /**
   * Runs after every render: a target may mount or unmount without any
   * change of the hook inputs, e.g. a button shown only on overflow.
   */
  useEffect(() => {
    const observer = observerRef.current;

    if (!observer) {
      return;
    }

    const elements = targets
      .map((target) => target.current)
      .filter((element): element is Element => element !== null);
    const observed = observedRef.current;

    observed
      .filter((element) => !elements.includes(element))
      .forEach((element) => observer.unobserve(element));

    elements
      .filter((element) => !observed.includes(element))
      .forEach((element) => observer.observe(element));

    observedRef.current = elements;
  });
};
