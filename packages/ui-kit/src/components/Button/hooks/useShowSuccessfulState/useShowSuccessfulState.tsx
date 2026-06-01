import { useEffect, useState } from 'react';

import { noop } from 'src/utils';

type Ref = React.MutableRefObject<(onAnimationEnd?: () => void) => void | null>;

export const useShowSuccessfulState = (
  showSuccessfulStateRef?: Ref
): boolean => {
  const [shouldShowSuccessfulState, setShouldShowSuccessfulState] =
    useState(false);

  useEffect(() => {
    const showSuccessfulState = (onAnimationEnd = noop) => {
      setShouldShowSuccessfulState(true);

      setTimeout(() => {
        setShouldShowSuccessfulState(false);

        onAnimationEnd();
      }, 1500);
    };

    if (showSuccessfulStateRef) {
      showSuccessfulStateRef.current = showSuccessfulState;
    }
  }, [showSuccessfulStateRef]);

  return shouldShowSuccessfulState;
};
