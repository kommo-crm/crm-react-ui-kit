import React from 'react';
import { useGlobals } from 'storybook/internal/preview-api';

import { Appearance } from 'src/lib/appearance';

export function useStoryLabel(
  text: string,
  options?: { style?: React.CSSProperties; className?: 'string' }
) {
  const [{ appearance }] = useGlobals();
  const labelColor = appearance === Appearance.ALTERNATIVE ? 'white' : 'black';

  return (
    <span
      style={{ ...options?.style, color: labelColor }}
      className={options?.className}
    >
      {text}
    </span>
  );
}
