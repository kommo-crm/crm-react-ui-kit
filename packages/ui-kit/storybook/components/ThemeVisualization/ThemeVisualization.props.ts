import type { StoryObj } from '@storybook/react';

import { CrmUiKitCSSProperties } from 'src/lib/theme';

export type ThemeVisualizationProps = {
  /**
   * An object with CSS theme properties.
   */
  theme: CrmUiKitCSSProperties;
  /**
   * Component story
   */
  of: StoryObj;
};
