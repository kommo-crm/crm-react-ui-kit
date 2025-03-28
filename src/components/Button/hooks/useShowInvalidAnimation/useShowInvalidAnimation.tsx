import { useEffect, useState } from 'react';

import { noop } from 'src/utils';

type Ref = React.MutableRefObject<(onAnimationEnd?: () => void) => void | null>;

export const useShowInvalidAnimation = (
  showInvalidAnimationRef?: Ref
): boolean => {
  const [shouldShowInvalidAnimation, setShouldShowInvalidAnimation] =
    useState(false);

  useEffect(() => {
    const showInvalidAnimation = (onAnimationEnd = noop) => {
      setShouldShowInvalidAnimation(true);

      setTimeout(() => {
        setShouldShowInvalidAnimation(false);

        onAnimationEnd();
      }, 400);
    };

    if (showInvalidAnimationRef) {
      showInvalidAnimationRef.current = showInvalidAnimation;
    }
  }, [showInvalidAnimationRef]);

  return shouldShowInvalidAnimation;
};
