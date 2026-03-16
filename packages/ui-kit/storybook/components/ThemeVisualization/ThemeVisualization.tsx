import React, { type FC, useMemo } from 'react';
import { type Rule } from 'css';
import { Canvas } from '@storybook/blocks';

import { DesignTokens } from './DesignTokens/DesignTokens';
import { NumericValues } from './NumericValues/NumericValues';

import { ThemeVisualizationProps } from './ThemeVisualization.props';
import { getParsedCss } from './helper/getParsedCss';
import { getThemeValues } from './helper/getThemeValues';

export const ThemeVisualization: FC<ThemeVisualizationProps> = ({
  theme,
  of: story,
}) => {
  const { colorValues, numericValues } = useMemo(() => {
    const parsedCss = getParsedCss();

    if (!parsedCss.stylesheet) {
      throw new Error('Failed to parse stylesheet');
    }

    return getThemeValues(parsedCss.stylesheet.rules as Rule[], theme);
  }, [theme]);

  return (
    <div>
      {story && <Canvas of={story} />}
      {colorValues.length > 0 && <DesignTokens colorValues={colorValues} />}
      {numericValues.length > 0 && (
        <NumericValues numericValues={numericValues} />
      )}
    </div>
  );
};
