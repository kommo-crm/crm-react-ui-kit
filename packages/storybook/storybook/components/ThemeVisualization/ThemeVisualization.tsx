import React, { type FC, useMemo, useState } from 'react';
import { type Rule } from 'css';
import { styled } from '@storybook/theming';
import { Canvas } from '@storybook/blocks';

import { i18n } from '@i18n';

import { DesignTokens } from './DesignTokens/DesignTokens';
import { NumericValues } from './NumericValues/NumericValues';

import { ThemeVisualizationProps } from './ThemeVisualization.props';
import { getParsedCss } from './helper/getParsedCss';
import { getThemeValues } from './helper/getThemeValues';

const ToggleButton = styled.button(({ theme }) => ({
  'all': 'unset',
  'display': 'inline-flex',
  'alignItems': 'center',
  'gap': 8,
  'cursor': 'pointer',
  'fontSize': 16,
  'fontWeight': 700,
  'color': theme.color.mediumdark,
  'transition': 'color 0.15s',
  'marginBottom': 40,

  '&:hover': {
    color: theme.color.defaultText,
  },
}));

const Chevron = styled.span<{ isOpen: boolean }>(({ isOpen }) => ({
  display: 'inline-block',
  fontSize: 10,
  transition: 'transform 0.2s',
  transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
}));

export const ThemeVisualization: FC<ThemeVisualizationProps> = ({
  theme,
  of: story,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { colorValues, numericValues } = useMemo(() => {
    const parsedCss = getParsedCss();

    if (!parsedCss.stylesheet) {
      throw new Error('Failed to parse stylesheet');
    }

    return getThemeValues(parsedCss.stylesheet.rules as Rule[], theme);
  }, [theme]);

  const hasTokens = colorValues.length > 0 || numericValues.length > 0;

  const handleToggleClick = () => {
    setIsOpen((v) => !v);
  };

  return (
    <div>
      {story && <Canvas of={story} />}

      {hasTokens && (
        <>
          <ToggleButton onClick={handleToggleClick}>
            <Chevron isOpen={isOpen}>▶</Chevron>

            {i18n.t('Theme details')}
          </ToggleButton>

          {isOpen && (
            <div style={{ marginBottom: 60 }}>
              {colorValues.length > 0 && (
                <DesignTokens colorValues={colorValues} />
              )}

              {numericValues.length > 0 && (
                <NumericValues numericValues={numericValues} />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
