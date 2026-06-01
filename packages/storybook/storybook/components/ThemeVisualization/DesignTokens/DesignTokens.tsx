import React, { type FC } from 'react';
import { ColorPalette, ColorItem } from '@storybook/blocks';

import { i18n } from '@i18n';

import { type Props } from './DesignTokens.props';

export const DesignTokens: FC<Props> = ({ colorValues }) => {
  return (
    <>
      <h2>{i18n.t('Design tokens')}</h2>

      <ColorPalette>
        {colorValues.map(({ key, value }) => (
          <ColorItem
            key={key}
            title={key}
            subtitle={value.variableName || ''}
            colors={
              value.alternativeColor
                ? [value.defaultColor, value.alternativeColor]
                : [value.defaultColor]
            }
          />
        ))}
      </ColorPalette>
    </>
  );
};
